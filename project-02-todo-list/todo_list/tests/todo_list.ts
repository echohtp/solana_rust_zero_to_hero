import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TodoList } from "../target/types/todo_list";
import { assert } from "chai";

describe("todo_list", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.todoList as Program<TodoList>;
  const provider = anchor.getProvider() as anchor.AnchorProvider;

  // Derive the PDA for the user's todo list
  let todoListPDA: anchor.web3.PublicKey;
  let bump: number;

  beforeEach(() => {
    [todoListPDA, bump] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("todo-list"), provider.wallet.publicKey.toBuffer()],
      program.programId
    );
  });

  it("Create a todo list!", async () => {
    await program.methods
      .createList()
      .accounts({
        todoList: todoListPDA,
        owner: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const todoListAccount = await program.account.todoList.fetch(todoListPDA);
    assert.equal(todoListAccount.items.length, 0);
    assert.equal(todoListAccount.nextId, 0);
  });


  it("Add a todo item!", async () => {
    const description = "Buy groceries";

    await program.methods
      .addItem(description)
      .accounts({
        todoList: todoListPDA,
        owner: provider.wallet.publicKey,
      })
      .rpc();

    const todoListAccount = await program.account.todoList.fetch(todoListPDA);
    assert.equal(todoListAccount.items.length, 1);
    assert.equal(todoListAccount.items[0].id, 0);
    assert.equal(todoListAccount.items[0].description, description);
    assert.equal(todoListAccount.items[0].completed, false);
    assert.equal(todoListAccount.nextId, 1);
  });


  it("Toggle a todo item!", async () => {
    const itemId = 0;

    await program.methods
      .toggleCompletedItem(itemId)
      .accounts({
        todoList: todoListPDA,
        owner: provider.wallet.publicKey,
      })
      .rpc();

    const todoListAccount = await program.account.todoList.fetch(todoListPDA);
    assert.equal(todoListAccount.items.length, 1);
    assert.equal(todoListAccount.items[0].id, itemId);
    assert.equal(todoListAccount.items[0].completed, true);
  });


  it("Remove a todo item!", async () => {
    const itemId = 0;

    await program.methods
      .deleteItem(itemId)
      .accounts({
        todoList: todoListPDA,
        owner: provider.wallet.publicKey,
      })
      .rpc();

    const todoListAccount = await program.account.todoList.fetch(todoListPDA);
    assert.equal(todoListAccount.items.length, 0);
  });


  it("Reclaim rent exemption!", async () => {
    await program.methods
      .closeList()
      .accounts({
        todoList: todoListPDA,
        owner: provider.wallet.publicKey,
      })
      .rpc();

    const todoListAccountInfo = await provider.connection.getAccountInfo(
      todoListPDA
    );
    assert.equal(todoListAccountInfo, null);
  });

});
