# Project 09: Simple AMM Pool (Anchor/Rust)

This project simulates a core DeFi mechanism—an Automated Market Maker (AMM)—requiring complex state management across multiple token types and the implementation of mathematical logic.

## 🦀 Core Concepts Introduced

- **Managing Multiple Token Accounts**: Creating and controlling two separate SPL Token accounts (e.g., Token A and Token B) within the main Pool PDA for liquidity.

- **Invariant Calculation**: Implementing the core AMM swap logic, typically $X \cdot Y = K$ (constant product formula), to determine the output amount for a given input.

- **Liquidity Token Logic**: Creating a liquidity token (LP token) that is minted to the user upon deposit and burned upon withdrawal.

- **Fee Collection**: Implementing a small, protocol-defined fee (e.g., 0.3%) that is added to the pool's reserves on every swap.

## 🛠 Project Structure

- `programs/project_09_simple_amm/src/lib.rs`: Instructions for `deposit_liquidity`, `swap`, and `withdraw_liquidity`.

- `tests/project-09-simple-amm.ts`: Comprehensive tests verifying the token balance changes, the swap ratio calculation, and that the calculated output amount matches the actual amount received.

## ✅ Acceptance Criteria

The program is considered complete when the following tests pass:

1. A Pool PDA can be initialized, creating two corresponding, PDA-controlled token accounts (Token A and Token B).

2. A user can successfully `deposit_liquidity` by transferring both Token A and Token B into the pool and receiving LP tokens in return.

3. A user can successfully `swap` Token A for Token B, and the amount received is correctly calculated based on the $X \cdot Y = K$ formula.

4. The pool's reserves (Token A and B balances) are updated correctly after the swap.

5. A fee is verifiably collected by the pool for the protocol on every swap.

## 📝 Rust Notes & Learnings

(Placeholder: Use this section to write down your key learnings about Rust for this project, such as: "Safely handling floating-point arithmetic or using fixed-point math for on-chain calculations," or "Managing the state of the two token reserves atomically.")