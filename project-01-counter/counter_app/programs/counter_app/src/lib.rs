use anchor_lang::prelude::*;

declare_id!("FAJ6a6PSwkR7uJCtJm6nYGx8P7nRESkL8o1Sr7CWBTqm");

#[program]
pub mod counter_app {
    // Import necessary items from the outer scope
    use super::*;

    // Program initialization function
    // Sets the initial count to zero
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        
        // Log the program ID for reference
        msg!("Greetings from: {:?}", ctx.program_id);
        
        // Get the counter account and set its count to zero
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        msg!("Counter initialized to zero.");

        // Return success
        Ok(())
    }

    // Define public increment function, accepts a context parameter expecting an Update struct
    pub fn increment(ctx: Context<Update>) -> Result<()> {
        
        // Get the counter from the context 
        let counter = &mut ctx.accounts.counter;

        // If counter is at max value, return error
        if counter.count == u64::MAX {
            // Log an error message
            msg!("Counter has reached its maximum value and cannot be incremented further.");
            // Return an error if trying to increment beyond max value
            return Err(ErrorCode::CounterOverflow.into());
        }
        
        // Increment the count
        counter.count += 1;

        // Log the new count
        msg!("Counter incremented to: {}", counter.count);
        
        // Return success
        Ok(())
    }

    // Define public decrement function, accepts a context parameter expecting an Update struct
    pub fn decrement(ctx: Context<Update>) -> Result<()> {

        // Get the counter from the context
        let counter = &mut ctx.accounts.counter;
        
        // Check if the count is not zero before decrementing
        if counter.count == 0 {
            // Log an error message
            msg!("Counter cannot be decremented below zero.");
            // Return an error if trying to decrement below zero
            return Err(ErrorCode::CounterUnderflow.into());
        }

        // Decrement the count
        counter.count -= 1;

        // Log the new count
        msg!("Counter decremented to: {}", counter.count);
        
        // Return success
        Ok(())
    }

    pub fn get_count(ctx: Context<Update>) -> Result<u64> {
        
        // Get the counter from the context
        let counter = &ctx.accounts.counter;

        // Log the current count
        msg!("Current counter value: {}", counter.count);

        // Return the current count
        Ok(counter.count)
    }

    pub fn reset(ctx: Context<Update>) -> Result<()> {
        
        // Get the counter from the context
        let counter = &mut ctx.accounts.counter;

        // Reset the count to zero
        counter.count = 0;

        // Log the reset action
        msg!("Counter has been reset to zero.");

        // Return success
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // Initalize the Counter account with space for a u64
    #[account(init, payer = user, space = 8 + 8)]
    // Link the Counter account to the Counter struct defined below
    pub counter: Account<'info, Counter>,

    // The user who will pay for the account initialization
    #[account(mut)]
    pub user: Signer<'info>,

    // System program to create the account
    pub system_program: Program<'info, System>,
}

// Define the Counter account structure
#[account]
pub struct Counter {
    pub count: u64,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Counter cannot be decremented below zero.")]
    CounterUnderflow,
    #[msg("Counter has reached its maximum value and cannot be incremented further.")]
    CounterOverflow,
}