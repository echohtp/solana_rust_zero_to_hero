# Project 08: Vesting Schedule (Anchor/Rust)

This project introduces time-based access control and automatic PDA signing using Anchor's framework, which is crucial for decentralized financial contracts.

## 🦀 Core Concepts Introduced

- **Automatic PDA Signing with seeds and bump**: Using `[account(seeds, bump)]` in the account struct to allow Anchor to automatically derive the PDA and sign transactions on its behalf.

- **Storing Bumps**: Persisting the PDA's bump seed value within the account data for future validation and signing.

- **Time-Based Release Logic**: Using the Clock sysvar to check if a specific unlock time (stored on the Vesting PDA) has been reached before executing a transfer.

- **Partial Claims**: Implementing logic to allow a recipient to claim tokens in tranches over time, updating the remaining vested balance.

## 🛠 Project Structure

- `programs/project_08_vesting/src/lib.rs`: Instructions for `initialize_vesting` (sets the schedule) and `claim` (handles the time-gated withdrawal).

- `tests/project-08-vesting.ts`: Tests that set a future vesting time and attempt to claim immediately (should fail), then simulate time passing to verify a successful claim.

## ✅ Acceptance Criteria

The program is considered complete when the following tests pass:

1. A vesting schedule PDA can be initialized, storing a recipient's address, the total amount to be vested, and a future unlock timestamp.

2. The `claim` instruction is called before the unlock time and fails with a "VestingNotMatured" error.

3. The test simulates time passing (by using the local validator's time functions or mocking) and then calls `claim` successfully.

4. The successful `claim` instruction transfers the vested tokens to the recipient via CPI.

5. If implementing tranches, the recipient can only claim the portion that has matured, and the PDA's remaining balance is updated correctly.

## 📝 Rust Notes & Learnings

(Placeholder: Use this section to write down your key learnings about Rust for this project, such as: "How to use `&[u8]` seeds for deterministic PDA generation," or "Best practices for handling large integer time values (`i64`) without overflow.")