# Project 05: NFT Staking Program (Anchor/Rust)

This project deals with asset custody, requiring the program to securely take ownership of a Non-Fungible Token (NFT) and hold it in a PDA-controlled account.

## 🦀 Core Concepts Introduced

- **Advanced CPI: Token Transfers into PDA**: Using CPI to transfer a user's NFT (which is just an SPL token with supply 1) into a Token Account owned by the program's PDA.

- **Managing Staked Assets**: Implementing state logic to store the address of the staked NFT and the address of the original owner on a new "StakeInfo" PDA.

- **Rent Exemption**: Ensuring the accounts created for staking (if applicable) are rent-exempt or calculating the appropriate rent for the program.

- **Withdrawal Logic**: Implementing the reverse CPI to transfer the NFT back from the PDA-controlled account to the original owner.

## 🛠 Project Structure

- `programs/project_05_nft_staking/src/lib.rs`: Instructions for `stake_nft` (deposit) and `unstake_nft` (withdrawal), both involving CPI to the SPL Token Program.

- `tests/project-05-nft-staking.ts`: Tests that simulate the user holding an NFT and verifies that the NFT is correctly transferred into and out of the program's custody.

## ✅ Acceptance Criteria

The program is considered complete when the following tests pass:

1. A user can successfully call the `stake_nft` instruction, transferring their NFT into a program-owned/controlled Token Account.

2. A new StakeInfo PDA is created and linked to the NFT, storing the owner's public key.

3. The NFT is verifiably absent from the user's wallet after staking.

4. The user can successfully call the `unstake_nft` instruction, transferring the NFT back to their wallet.

5. The StakeInfo PDA is successfully closed and rent is reclaimed upon unstaking.

## 📝 Rust Notes & Learnings

(Placeholder: Use this section to write down your key learnings about Rust for this project, such as: "How to handle the transfer of an SPL account from one owner to another via CPI," or "Verifying the correct mint address and token account owner before staking/unstaking.")