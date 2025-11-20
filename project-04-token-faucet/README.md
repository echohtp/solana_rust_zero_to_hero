# Project 04: Token Faucet (Anchor/Rust)

This project introduces Cross-Program Invocation (CPI), specifically interacting with the widely used SPL Token Program to manage and distribute custom tokens.

## 🦀 Core Concepts Introduced

- **Cross-Program Invocation (CPI) to SPL Token**: Calling instructions from the SPL Token Program (e.g., `mint_to`) from within the Anchor program.

- **PDA as Token Authority**: Using a Program Derived Address (PDA) as the mint authority for an SPL token, allowing the program to authorize minting.

- **Token Account Constraints**: Using Anchor's built-in constraints to validate the mint and token accounts passed to the instruction (`token::mint`, `token::token_account`).

- **Token Program Setup**: Initializing an SPL Mint and a corresponding Token Account owned by the program's PDA using the client-side test environment.

## 🛠 Project Structure

- `programs/project_04_token_faucet/src/lib.rs`: Program logic for the faucet instruction, which performs the CPI to the SPL Token Program's `mint_to` instruction.

- `tests/project-04-token-faucet.ts`: Complex tests that set up the token environment (mint, PDA token account) before testing the faucet logic.

## ✅ Acceptance Criteria

The program is considered complete when the following tests pass:

1. The test suite successfully initializes a new SPL Mint and assigns the program's PDA as the mint authority.

2. The program can execute the faucet instruction.

3. The faucet instruction successfully mints a fixed amount of the token and transfers it to the user's token account via CPI.

4. The post-transaction state verifies that the user's token balance has increased and the total supply of the mint has increased.

## 📝 Rust Notes & Learnings

(Placeholder: Use this section to write down your key learnings about Rust for this project, such as: "How to use the `CpiContext` and `system_program::transfer` for CPI," or "The necessary signer configuration when a PDA is the authority for an SPL instruction.")