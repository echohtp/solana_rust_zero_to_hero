use anchor_lang::prelude::*;

declare_id!("3d74iW95mWtMedyVCTZHGxWudAFJbrxtx1d7XoTrzJVw");

#[program]
pub mod todo_list {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn create_list(ctx: Context<CreateList>) -> Result<()> {
        let todo_list = &mut ctx.accounts.todo_list;
        todo_list.items = Vec::new();
        todo_list.owner = *ctx.accounts.user.key;
        todo_list.next_id = 0;
        todo_list.bump = ctx.bumps.todo_list;
        Ok(())
    }
    

    pub fn add_item(ctx: Context<AddItem>, description: String) -> Result<()>{
        // Get the todo_list from the context
        let todo_list = &mut ctx.accounts.todo_list;
        
        // create a new todoitem
        let item = TodoItem {
            // use the nex_id as the id 
            id: todo_list.next_id,
            // descripion from parameter
            description,
            completed: false, 
        };
        todo_list.items.push(item);
        todo_list.next_id += 1;
        Ok(())
    }


    pub fn toggle_completed_item(ctx: Context<CompleteItem> , item_id: u32) -> Result<()> {
        // get the todo_list from the context
        let todo_list = &mut ctx.accounts.todo_list;

        // find the item by id and mark it as completed
        for item in &mut todo_list.items {

            // if item found, toggle its completed state
            if item.id == item_id {
                item.completed = !item.completed;
                return Ok(());
            }
        }

        // if item not found, return error
        Err(ErrorCode::ItemNotFound.into())
    }

    pub fn delete_item(ctx: Context<DeleteItem>, item_id: u32) -> Result<()> {
        let todo_list = &mut ctx.accounts.todo_list;
        for i in 0..todo_list.items.len(){
            if todo_list.items[i].id == item_id {
                todo_list.items.remove(i);
                return Ok(());
            }
        }    
        Err(ErrorCode::ItemNotFound.into())
    }

    
    // close list - remove it from chain 
    pub fn close_list(ctx: Context<CloseList>) -> Result<()> {
        let todo_list = &mut ctx.accounts.todo_list;
        if todo_list.items.is_empty() {
            msg!("Closing the todo list");
            Ok(())
        } else {
            Err(ErrorCode::ListNotEmpty.into())
        }
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateList<'info> {
    #[account(
        init, 
        payer = user, 
        space = 8 + 1000,
        seeds = [b"todo-list", user.key().as_ref()],
        bump
    )]
    pub todo_list: Account<'info, TodoList>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TodoList {
    pub items: Vec<TodoItem>,
    pub owner: Pubkey,
    pub next_id: u32,
    pub bump: u8
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct TodoItem {
    pub id: u32,
    pub description: String,
    pub completed: bool,
}

#[derive(Accounts)]
pub struct AddItem<'info> {
    #[account(mut, has_one = owner, seeds = [b"todo-list", owner.key().as_ref()], bump = todo_list.bump)]
    pub todo_list: Account<'info, TodoList>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct CompleteItem<'info> {
    #[account(mut, has_one = owner, seeds = [b"todo-list", owner.key().as_ref()], bump = todo_list.bump)]
    pub todo_list: Account<'info, TodoList>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteItem<'info> {
    #[account(mut, has_one = owner, seeds = [b"todo-list", owner.key().as_ref()], bump = todo_list.bump)]
    pub todo_list: Account<'info, TodoList>,
    pub owner: Signer<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Item not found")]
    ItemNotFound,
    #[msg("Cannot close a list that is not empty")]
    ListNotEmpty,
}

#[derive(Accounts)]
pub struct CloseList<'info> {
    #[account(mut, has_one = owner, seeds = [b"todo-list", owner.key().as_ref()], bump = todo_list.bump, close = owner)]
    pub todo_list: Account<'info, TodoList>,
    #[account(mut)]
    pub owner: Signer<'info>,
}