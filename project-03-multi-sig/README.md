# Project 03: Basic Multi-Sig Wallet (Anchor/Rust)

This project moves into complex security and multi-user logic, focusing on advanced PDA derivation and validating multiple required signers for sensitive instructions.

## 🦀 Core Concepts Introduced

- **Advanced PDA Derivation**: Creating PDAs using multiple seeds (e.g., a wallet name and the program ID) for increased security and uniqueness.

- **Signer Checks (Manual & Anchor's Signer)**: Implementing logic to check if required keys in an account array have signed the transaction, going beyond simple single-signer verification.

- **Storing Array of Public Keys**: Managing a list of authorized owners (`Vec<Pubkey>`) on the Multi-Sig PDA state.

- **Custom Validation Logic**: Implementing a custom instruction logic that iterates through the provided signers and compares them against the stored owners, requiring a minimum threshold of signatures.

## 🛠 Project Structure

- `programs/project_03_multi_sig/src/lib.rs`: Program logic for wallet initialization and the multi-signature instruction.

- `tests/project-03-multi-sig.ts`: Tests that involve setting up multiple keypairs and ensuring the instruction fails if the required signature threshold is not met, and succeeds when it is.

## ✅ Acceptance Criteria

The program is considered complete when the following tests pass:

1. A Multi-Sig PDA can be initialized with an array of 3 public keys (owner_A, owner_B, owner_C) and a required signature threshold (e.g., 2).

2. A sensitive instruction (e.g., `execute_transaction`) is called with only one signer (e.g., owner_A) and fails with a custom error.

3. The sensitive instruction is called with two signers (e.g., owner_A and owner_B) and succeeds.

4. The program correctly handles the instruction signature check logic using the PDA's stored owners.

## 📝 Rust Notes & Learnings

(Placeholder: Use this section to write down your key learnings about Rust for this project, such as: "How to efficiently check for the presence of a signer in a large `Vec<Pubkey>`," or "The best way to handle instruction arguments that define the threshold.")