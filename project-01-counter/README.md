# Project 01: Simple Counter DApp (Anchor/Rust)

This is the first project in the "Solana Anchor Zero-to-Hero" roadmap, focusing on the absolute fundamentals of the Anchor framework, Rust data types, and Program Derived Addresses (PDAs).

## 🦀 Core Concepts Introduced

- **Anchor Initialization**: Using `anchor init` to set up the project structure.

- **Program Definition**: Understanding the `#[program]` module and instruction functions.

- **Account Structs**: Defining accounts using `#[derive(Accounts)]` and basic constraints (`init`, `mut`).

- **Program Derived Address (PDA)**: Creating and using a single deterministic account to store the program's state (the counter value).

- **Rust Data Types**: Using `u64` (unsigned 64-bit integer) for the counter.

## 🛠 Project Structure

The key files modified for this project are:

- `programs/project_01_counter/src/lib.rs`: Contains the Rust program logic (the initialize and increment instructions).

- `tests/project-01-counter.ts`: Contains the TypeScript client code to interact with the program, which will be familiar to me.

## ✅ Acceptance Criteria

The program is considered complete when the following tests pass:

1. **Deployment**: The program successfully builds (`anchor build`) and deploys to a local validator (`anchor deploy`).

2. **Initialization**: The initialize instruction is called successfully, and a PDA is created to store the initial counter value (0).

3. **Increment Logic**: The increment instruction can be called multiple times.

4. **State Verification**: The client can fetch the PDA account data after initialization and after multiple increments to confirm the stored counter value is correct.

## 📝 Rust Notes & Learnings

(Placeholder: Use this section to write down your key learnings about Rust for this project, such as: "The `&mut` keyword is crucial for mutable accounts," or "The `Result<()>` return type handles Anchor errors.")