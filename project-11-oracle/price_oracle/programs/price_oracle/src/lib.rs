use anchor_lang::prelude::*;

declare_id!("3GfdRMo1yozdU7EhD21Bz68wiFq4E13XuZ8TpBpvxBvF");

#[program]
pub mod price_oracle {
    use super::*;

    // Initialize the oracle master account
    pub fn initialize_oracle(ctx: Context<InitializeOracle>) -> Result<()> {
        let oracle = &mut ctx.accounts.oracle;
        
        oracle.authority = ctx.accounts.authority.key();
        oracle.feed_count = 0;
        
        msg!("Oracle initialized by: {:?}", ctx.accounts.authority.key());
        Ok(())
    }

    // Create a new price feed
    pub fn create_feed(ctx: Context<CreateFeed>, feed_name: String, description: String) -> Result<()> {
        require!(feed_name.len() <= 32, OracleError::NameTooLong);
        require!(description.len() <= 100, OracleError::DescriptionTooLong);
        
        let price_feed = &mut ctx.accounts.price_feed;
        let oracle = &mut ctx.accounts.oracle;
        let clock = Clock::get()?;
        
        // Initialize the price feed
        price_feed.oracle = oracle.key();
        price_feed.authority = ctx.accounts.authority.key();
        price_feed.feed_id = oracle.feed_count;
        price_feed.name = feed_name.clone();
        price_feed.description = description;
        price_feed.value = 0;
        price_feed.last_updated = clock.unix_timestamp;
        price_feed.update_count = 0;
        price_feed.is_active = true;
        
        // Update oracle feed count
        oracle.feed_count += 1;
        
        msg!("Created feed '{}' with ID: {}", feed_name, price_feed.feed_id);
        Ok(())
    }

    // Update a specific price feed
    pub fn update_feed(ctx: Context<UpdateFeed>, new_value: u64) -> Result<()> {
        let price_feed = &mut ctx.accounts.price_feed;
        let clock = Clock::get()?;
        
        require!(price_feed.is_active, OracleError::FeedInactive);
        
        price_feed.value = new_value;
        price_feed.last_updated = clock.unix_timestamp;
        price_feed.update_count += 1;

        msg!("Updated feed '{}' to value: {}", price_feed.name, new_value);
        Ok(())
    }

    // Get value from a specific price feed with staleness check
    pub fn get_feed_value(ctx: Context<GetFeedValue>) -> Result<u64> {
        let price_feed = &ctx.accounts.price_feed;
        
        require!(price_feed.is_active, OracleError::FeedInactive);
        
        // Check staleness (48 hours)
        let current_time = Clock::get()?.unix_timestamp;
        let age = current_time - price_feed.last_updated;
        require!(age < 172_800, OracleError::StaleData);
        
        Ok(price_feed.value)
    }

    // Toggle feed active status
    pub fn toggle_feed_status(ctx: Context<UpdateFeed>) -> Result<()> {
        let price_feed = &mut ctx.accounts.price_feed;
        
        price_feed.is_active = !price_feed.is_active;
        
        msg!("Feed '{}' status changed to: {}", 
             price_feed.name, 
             if price_feed.is_active { "active" } else { "inactive" }
        );
        Ok(())
    }

    /// Update feed metadata
    pub fn update_feed_metadata(
        ctx: Context<UpdateFeed>, 
        new_description: Option<String>
    ) -> Result<()> {
        let price_feed = &mut ctx.accounts.price_feed;
        
        if let Some(description) = new_description {
            require!(description.len() <= 100, OracleError::DescriptionTooLong);
            price_feed.description = description;
        }
        
        msg!("Updated metadata for feed '{}'", price_feed.name);
        Ok(())
    }

    /// Transfer oracle authority
    pub fn transfer_oracle_authority(ctx: Context<TransferOracleAuthority>, new_authority: Pubkey) -> Result<()> {
        let oracle = &mut ctx.accounts.oracle;
        
        oracle.authority = new_authority;
        msg!("Oracle authority transferred to {}", new_authority);
        Ok(())
    }

    // Transfer feed authority
    pub fn transfer_feed_authority(ctx: Context<UpdateFeed>, new_authority: Pubkey) -> Result<()> {
        let price_feed = &mut ctx.accounts.price_feed;
        
        price_feed.authority = new_authority;
        msg!("Feed '{}' authority transferred to {}", price_feed.name, new_authority);
        Ok(())
    }

    // Get oracle info
    pub fn get_oracle_info(ctx: Context<GetOracleInfo>) -> Result<OracleInfo> {
        let oracle = &ctx.accounts.oracle;
        
        Ok(OracleInfo {
            authority: oracle.authority,
            feed_count: oracle.feed_count,
        })
    }

    // Get all feed info for listing
    pub fn get_feed_info(ctx: Context<GetFeedValue>) -> Result<FeedInfo> {
        let price_feed = &ctx.accounts.price_feed;
        
        Ok(FeedInfo {
            feed_id: price_feed.feed_id,
            name: price_feed.name.clone(),
            description: price_feed.description.clone(),
            value: price_feed.value,
            last_updated: price_feed.last_updated,
            update_count: price_feed.update_count,
            is_active: price_feed.is_active,
        })
    }
}

/// Oracle master account
#[account]
pub struct Oracle {
    pub authority: Pubkey,      // Master authority
    pub feed_count: u32,        // Number of feeds created
}

/// Individual price feed
#[account]
pub struct PriceFeed {
    pub oracle: Pubkey,         // Reference to oracle master
    pub authority: Pubkey,      // Feed authority (can be different from oracle)
    pub feed_id: u32,           // Unique feed ID
    pub name: String,           // Feed name (e.g., "BTC_USD", "ETH_USD", "SOL_USD")
    pub description: String,    // Feed description
    pub value: u64,             // Current value (scaled appropriately)
    pub last_updated: i64,      // Last update timestamp
    pub update_count: u64,      // Total number of updates
    pub is_active: bool,        // Whether feed is active
}

/// Return data structures
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct OracleInfo {
    pub authority: Pubkey,
    pub feed_count: u32,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct FeedInfo {
    pub feed_id: u32,
    pub name: String,
    pub description: String,
    pub value: u64,
    pub last_updated: i64,
    pub update_count: u64,
    pub is_active: bool,
}

// Initialize oracle master account
#[derive(Accounts)]
pub struct InitializeOracle<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 4, // discriminator + authority + feed_count
        seeds = [b"oracle"],
        bump
    )]
    pub oracle: Account<'info, Oracle>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Create a new price feed
#[derive(Accounts)]
#[instruction(feed_name: String)]
pub struct CreateFeed<'info> {
    #[account(
        mut,
        has_one = authority,
        seeds = [b"oracle"],
        bump
    )]
    pub oracle: Account<'info, Oracle>,
    
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 32 + 4 + 32 + 100 + 8 + 8 + 8 + 1 + 10, // discriminator + oracle + authority + feed_id + name + description + value + timestamps + counter + bool + padding
        seeds = [b"feed", oracle.key().as_ref(), oracle.feed_count.to_le_bytes().as_ref()],
        bump
    )]
    pub price_feed: Account<'info, PriceFeed>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

/// Update a price feed
#[derive(Accounts)]
pub struct UpdateFeed<'info> {
    #[account(
        mut,
        has_one = authority
    )]
    pub price_feed: Account<'info, PriceFeed>,
    pub authority: Signer<'info>,
}

/// Get feed value (read-only)
#[derive(Accounts)]
pub struct GetFeedValue<'info> {
    pub price_feed: Account<'info, PriceFeed>,
}

/// Transfer oracle authority
#[derive(Accounts)]
pub struct TransferOracleAuthority<'info> {
    #[account(
        mut,
        has_one = authority,
        seeds = [b"oracle"],
        bump
    )]
    pub oracle: Account<'info, Oracle>,
    pub authority: Signer<'info>,
}

/// Get oracle info (read-only)
#[derive(Accounts)]
pub struct GetOracleInfo<'info> {
    #[account(
        seeds = [b"oracle"],
        bump
    )]
    pub oracle: Account<'info, Oracle>,
}

/// Batch update multiple feeds
#[derive(Accounts)]
pub struct BatchUpdate<'info> {
    pub authority: Signer<'info>,
    // Feed accounts passed via remaining_accounts
}

#[error_code]
pub enum OracleError {
    #[msg("The data is stale.")]
    StaleData,
    #[msg("Unauthorized action.")]
    Unauthorized,
    #[msg("Feed is not active.")]
    FeedInactive,
    #[msg("Feed name is too long (max 32 characters).")]
    NameTooLong,
    #[msg("Feed description is too long (max 100 characters).")]
    DescriptionTooLong,
}