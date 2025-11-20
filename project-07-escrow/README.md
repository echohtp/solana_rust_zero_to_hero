# Project 07: Decentralized Escrow (Anchor/Rust)

This project is a deep dive into secure SOL management, focusing on transferring native tokens using CPI to the System Program and implementing robust custom error handling.

## 🦀 Core Concepts Introduced

- **Transferring SOL via CPI**: Using CPI to the System Program to move native Solana tokens (SOL) from a user's account to a program-controlled PDA.

- **Custom Error Codes (#[error])**: Defining and utilizing a comprehensive set of custom error codes to provide clear, descriptive feedback on instruction failure (e.g., "AmountMismatch," "InvalidSigner").

- **Account Ownership/Constraint Checks**: Rigorously checking the owners and constraints of all accounts involved in the escrow to prevent unauthorized actions.

- **Escrow State Management**: Implementing a state machine for the escrow (e.g., Initialized, ReadyToRelease, Closed).

## 🛠 Project Structure

- `programs/project_07_escrow/src/lib.rs`: Instructions for `deposit_sol`, `release_sol`, and `cancel_escrow`, all utilizing CPI and custom error handling.

- `tests/project-07-escrow.ts`: Tests that specifically trigger the custom error conditions (e.g., calling `release_sol` with the wrong signer) and verify the correct error code is returned.

## ✅ Acceptance Criteria

The program is considered complete when the following tests pass:

1. Two parties (A and B) can successfully create an escrow and deposit equal amounts of SOL into a temporary Escrow PDA.

2. The Escrow PDA's SOL balance is verifiable after both deposits.

3. An unauthorized party attempting to call `release_sol` fails with a custom error code.

4. A designated third-party "Judge" can successfully call `release_sol`, transferring the combined SOL amount from the Escrow PDA to one of the original parties (A or B).

5. The `cancel_escrow` instruction successfully returns the deposited SOL to the original depositors (A and B).

## 📝 Rust Notes & Learnings

(Placeholder: Use this section to write down your key learnings about Rust for this project, such as: "The syntax for defining and using custom enum errors in Anchor," or "The necessary account context for successful System Program SOL transfers.")