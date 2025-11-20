# Project 02: Todo List Program (Anchor/Rust)

This project expands on the basic PDA concepts from Project 01 by introducing custom data structures and handling multiple items within a list, while also focusing on account management and rent reclamation.

## 🦀 Core Concepts Introduced

- **Custom Anchor Structs**: Defining complex data structures (like a TodoItem) within the program.

- **Vector Storage (Vec<T>)**: Using Rust Vectors to store a dynamic list of todo items on a PDA.

- **close Instruction (Rent Reclamation)**: Implementing a mechanism to close an account (e.g., the main Todo List account) and return the stored SOL rent to the account's designated recipient.

- **signer Constraint**: Explicitly requiring the instruction caller to sign the transaction.

- **Account Constraints (has_one)**: Enforcing that a secondary account (e.g., a Todo Item account, if structured differently) is owned or controlled by the main list account.

## 🛠 Project Structure

- `programs/project_02_todo_list/src/lib.rs`: Program logic for list creation, item addition, completion, deletion, and list closure.

- `tests/project-02-todo-list.ts`: TypeScript tests to verify all CRUD (Create, Read, Update, Delete) operations and rent reclamation.

## ✅ Acceptance Criteria

The program is considered complete when the following tests pass:

1. A user can successfully initialize a new, unique Todo List PDA.

2. The user can add multiple todo items to the list.

3. The user can mark a specific todo item as complete.

4. The user can delete a specific todo item.

5. The user can call a `close_list` instruction, which verifies that the list is empty and successfully closes the account, reclaiming rent for the list creator.

## 📝 Rust Notes & Learnings

(Placeholder: Use this section to write down your key learnings about Rust for this project, such as: "Handling vector modifications (push, remove) in Rust requires careful mutable borrowing," or "The difference between close and mut constraints.")