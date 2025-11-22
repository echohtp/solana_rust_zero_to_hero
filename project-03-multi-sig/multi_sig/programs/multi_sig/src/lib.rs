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
        multi_sig.next_proposal_id = 0;
        Ok(())
    }

    pub fn add_owner(ctx: Context<AddOwner>, new_owner: Pubkey) -> Result<()> {
        // get the mutlisig account, make sure its mutable
        let multi_sig = &mut ctx.accounts.multi_sig;
        // add the new owner to the owners vector
        multi_sig.owners.push(new_owner);
        Ok(())
    }

    pub fn remove_owner(ctx: Context<RemoveOwner>, owner: Pubkey) -> Result<()> {
        // get the multisig account, make sure its mutable
        let multi_sig = &mut ctx.accounts.multi_sig;
        // remove the owner from the owners vector
        multi_sig.owners.retain(|&x| x != owner);
        Ok(())
    }
    
    pub fn update_threshold(ctx: Context<UpdateThreshold>, new_threshold: u8) -> Result<()> {
        let multi_sig = &mut ctx.accounts.multi_sig;
        // validate new threshold
        require!(multi_sig.owners.len() as u8 >= new_threshold, MultiSigError::InvalidThreshold);
        require!(new_threshold > 0, MultiSigError::InvalidThresholdGtZero);
        // update threshold
        multi_sig.threshold = new_threshold;
        Ok(())
    }
    
    pub fn create_transaction_proposal(ctx: Context<CreateProposal>, instructions: Vec<u8>) -> Result<()> {
        let multi_sig = &mut ctx.accounts.multi_sig;
        let proposer = &ctx.accounts.proposer;
        let proposal_id = multi_sig.next_proposal_id;
        multi_sig.next_proposal_id += 1;
        TransactionProposal {
            multi_sig: multi_sig.key(),
            proposer: proposer.key(),
            instructions,
            approvers: vec![],
            executed: false,
            created_at: Clock::get()?.unix_timestamp,
            proposal_id,
        };

        Ok(())
    }

    pub fn approve_transaction(ctx: Context<ApproveTransaction>, proposal_id: u64) -> Result<()> {
        let multi_sig = &mut ctx.accounts.multi_sig;
        let approver = &ctx.accounts.approver;
        // find the proposal by id and add the approver
        

        Ok(())
    }
    // Additional functions to be implemented:
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
    pub next_proposal_id: u64,
}

#[account]
pub struct TransactionProposal {
    pub multi_sig: Pubkey, // The multisig account this proposal belongs to
    pub proposer: Pubkey, // The owner who created the proposal
    pub instructions: Vec<u8>, // The instructions to be executed
    pub approvers: Vec<Pubkey>, // Owners who have approved the proposal
    pub executed: bool, // Whether the proposal has been executed
    pub created_at: i64, // Timestamp of creation
    pub proposal_id: u64, // Unique identifier for the proposal
}

#[derive(Accounts)]
pub struct CreateProposal<'info> {
    #[account(
        init, 
        payer = proposer, 
        space = 8 + 32 + 32 + 4 + (instructions.len()),
        seeds = [b"proposal", multi_sig.key().as_ref(), &[proposal_id as u8] ],
        bump
    )]
    pub multi_sig: Account<'info, MultiSig>,
    pub proposer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(proposal_id: u64)]
pub struct ApproveTransaction<'info> {
    #[account(mut, seeds = [b"proposal", multi_sig.key().as_ref(), &[proposal_id as u8] ], proposal.bump)]
    pub proposal: Account<'info, TransactionProposal>,
    pub approver: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(name: String, nonce: u8, owners: Vec<Pubkey>, threshold: u8)]
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

#[derive(Accounts)]
pub struct RemoveOwner<'info>{
    #[account(mut)]
    pub multi_sig: Account<'info, MultiSig>,
    pub user: Signer<'info>,
}
#[derive(Accounts)]
pub struct UpdateThreshold<'info>{
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