use anchor_lang::prelude::*;

declare_id!("77AHZUsXPhf1FAbibDzPxsFJbyRgxTFJjSPLDUp9GVfN");

#[program]
pub mod multi_sig {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn create_multi_sig(ctx: Context<CreateMultiSig>, name: String, nonce: u8, owners: Vec<Pubkey>, threshold: u8) -> Result<()> {
        let multi_sig = &mut ctx.accounts.multi_sig;

        // validate inputs
        require!(owners.len() as u8 >= threshold, MultiSigError::InvalidThreshold);
        require!(threshold > 0, MultiSigError::InvalidThresholdGtZero);

        multi_sig.name = name;
        multi_sig.owners = owners;
        multi_sig.threshold = threshold;
        Ok(())
    }

    pub fn add_owner(ctx: Context<>, new_owner: Pubkey) -> Result<()> {
        Ok(())
    }


    // add owners
    // remove owners
    // update threshold
    
    // create transaction proposal
    // approve transaction
    // execute transaction




}

#[derive(Accounts)]
pub struct Initialize {}

#[account]
pub struct MultiSig {
    pub name: String,
    pub owners: Vec<Pubkey>,
    pub threshold: u8,
}

#[derive(Accounts)]
pub struct CreateMultiSig<'info> {    
    #[account(
        init, 
        payer = user, 
        space = 8 + 32 + 4 + (32 * 10) + 1, 
        seeds = [b"multi-sig", user.key().as_ref(), name.as_bytes(), &[nonce] ], 
        bump
    )]
    pub multi_sig: Account<'info, MultiSig>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddOwner<'info>{
    #[account(mut)]
    pub multi_sig: Account<'info, MultiSig>,
    pub user: Signer<'info>,
}

#[error_code]
pub enum MultiSigError {
    #[msg("The threshold cannot be greater than the number of owners.")]
    InvalidThreshold,
    #[msg("The threshold must be greater than zero.")]
    InvalidThresholdGtZero,
}