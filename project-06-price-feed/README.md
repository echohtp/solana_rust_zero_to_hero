# Project 06: Simple Price Feed DApp (Anchor/Rust)

This project focuses on reading dynamic on-chain data and managing time. It requires fetching the current slot and/or timestamp, and interacting with a mock or real Oracle program via CPI.

## 🦀 Core Concepts Introduced

- **Reading Sysvars (Clock)**: Accessing and utilizing the Clock Sysvar to retrieve the current block time and slot in the instruction logic.

- **Fetching External Program Data (Advanced CPI)**: Writing CPI logic to read data from a specific external program's account (simulating a Chainlink or similar Oracle).

- **Account Validity Checks**: Implementing rigorous constraints to ensure the external Oracle PDA passed into the instruction is indeed the correct and valid account.

- **Data Struct Updates**: Storing the fetched price and the corresponding timestamp on the program's internal PriceFeed PDA.

## 🛠 Project Structure

- `programs/project_06_price_feed/src/lib.rs`: Program logic for the `update_price` instruction, which fetches the current time and the oracle value, then updates the internal state.

- `tests/project-06-price-feed.ts`: Tests that simulate the presence of a mock Oracle account and verifies that the price data and timestamp are accurately recorded.

## ✅ Acceptance Criteria

The program is considered complete when the following tests pass:

1. A PriceFeed PDA can be successfully initialized by the program.

2. The `update_price` instruction is called successfully, consuming the current Clock sysvar.

3. The program successfully reads the data (price) from the mock Oracle account via CPI.

4. The PriceFeed PDA is updated, and the stored price value matches the oracle's output.

5. The stored timestamp on the PriceFeed PDA is within a reasonable range (e.g., 5 seconds) of the test execution time.

## 📝 Rust Notes & Learnings

(Placeholder: Use this section to write down your key learnings about Rust for this project, such as: "How to correctly deserialize data from a non-Anchor program account via CPI," or "Parsing the Solana Clock struct data.")