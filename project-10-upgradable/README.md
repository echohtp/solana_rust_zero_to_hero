# Project 10: Upgradable Program (Anchor/Rust)

The final project focuses on the logistics of program maintenance and evolution by implementing the necessary authority and process for program migration.

## 🦀 Core Concepts Introduced

- **BPF Upgradeable Loader**: Understanding the role of the BPF Upgradeable Loader program in managing the program's code and data buffers.

- **Upgrade Authority**: Configuring the deployed program to assign the upgrade authority to a specific key or, more securely, a Multi-Sig PDA.

- **upgrade Instruction Implementation**: Implementing a custom instruction that calls the upgrade instruction of the BPF loader via CPI.

- **Program Migration Verification**: Confirming that a newly deployed program version successfully replaces the old one and that new instructions are executable.

## 🛠 Project Structure

- `programs/project_10_upgradable/src/lib.rs`: The initial program will have a simple instruction (e.g., `set_value(u64)`). The upgrade will add a new instruction (e.g., `set_new_value(u64)`).

- `tests/project-10-upgradable.ts`: The tests will handle the entire upgrade lifecycle: initial deployment, calling the upgrade instruction with the new program code, and testing the functionality of the new instruction.

## ✅ Acceptance Criteria

The program is considered complete when the following tests pass:

1. The initial program version is deployed and its instruction (`set_value`) is successfully called.

2. A second, slightly modified program build is created (e.g., by adding a new instruction).

3. The test successfully executes the upgrade instruction (which requires the correct authority signature and the new program buffer).

4. After the upgrade, the old instruction (`set_value`) still works.

5. The new instruction (`set_new_value`) is successfully called, confirming the program code has been migrated on-chain.

## 📝 Rust Notes & Learnings

(Placeholder: Use this section to write down your key learnings about Rust for this project, such as: "The specific account keys required for the BPF Loader's Upgrade instruction," or "How Anchor's deployment process handles the buffer account for upgrades.")