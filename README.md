# 🚀 Solana Anchor Zero-to-Hero

A comprehensive 10-project learning path designed to take developers from zero Rust experience to proficient Anchor program development on Solana.

## 📖 About This Repository

This repository contains a progressive series of Solana Anchor projects that build upon each other, introducing core Rust concepts, Solana security best practices, and advanced Anchor features. Each project is self-contained with its own workspace, tests, and documentation.

**Target Audience**: Developers with TypeScript/JavaScript experience but new to Rust and Solana development.

**Goal**: Master Rust ownership/borrowing patterns and the Anchor framework by building a portfolio of functional Solana programs.

## 🛠 Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor Framework](https://www.anchor-lang.com/docs/installation)
- [Node.js](https://nodejs.org/) (for tests)

## 📚 Learning Path

### 🏗️ Foundation Projects (1-2)
| Project | Focus | Key Concepts |
|---------|--------|--------------|
| [**01 - Counter**](./project-01-counter/) | Basic Anchor Setup | `#[program]`, PDAs, account initialization |
| [**02 - Todo List**](./project-02-todo-list/) | Dynamic Data & CRUD | `Vec<T>`, account constraints, rent reclamation |

### 🔐 Intermediate Security (3-4) 
| Project | Focus | Key Concepts |
|---------|--------|--------------|
| [**03 - Multi-Sig**](./project-03-multi-sig/) | Multi-Signer Logic | Advanced PDAs, signature validation |
| [**04 - Token Faucet**](./project-04-token-faucet/) | SPL Integration | CPI, token minting, program authorities |

### ⚡ Advanced DeFi Patterns (5-7)
| Project | Focus | Key Concepts |
|---------|--------|--------------|
| [**05 - NFT Staking**](./project-05-nft-staking/) | Asset Custody | NFT transfers, stake/unstake mechanics |
| [**06 - Price Feed**](./project-06-price-feed/) | Oracle Integration | Clock sysvar, external data feeds |
| [**07 - Escrow**](./project-07-escrow/) | SOL Transfers | System program CPI, custom errors |

### 🏆 Expert Level (8-10)
| Project | Focus | Key Concepts |
|---------|--------|--------------|
| [**08 - Vesting**](./project-08-vesting/) | Time-Based Logic | Automatic PDA signing, time validation |
| [**09 - Simple AMM**](./project-09-simple-amm/) | DeFi Mathematics | Multi-token pools, swap calculations |
| [**10 - Upgradable**](./project-10-upgradable/) | Program Lifecycle | BPF upgradeable loader, migration |

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/solana-anchor-zero-to-hero.git
   cd solana-anchor-zero-to-hero
   ```

2. **Set up Solana for local development**
   ```bash
   solana config set --url localhost
   solana-keygen new --outfile ~/.config/solana/id.json
   ```

3. **Start with Project 01**
   ```bash
   cd project-01-counter/counter_app
   anchor build
   anchor test
   ```

## 📁 Project Structure

Each project follows a consistent structure:

```
project-XX-name/
├── README.md              # Project-specific goals and acceptance criteria
├── program_workspace/     # Anchor workspace
│   ├── programs/         # Rust program code
│   ├── tests/           # TypeScript test files
│   ├── Anchor.toml      # Anchor configuration
│   └── package.json     # Node.js dependencies
```

## 🎯 Learning Approach

### For Each Project:

1. **📖 Read the README** - Understand goals and acceptance criteria
2. **🏗️ Implement the Program** - Write Rust code following patterns
3. **✅ Write Tests** - Verify functionality with TypeScript tests
4. **🧪 Run `anchor test`** - Ensure all tests pass
5. **📝 Document Learnings** - Add notes to the project README

### Progressive Difficulty:

- **Projects 1-2**: Master basic Anchor patterns and account management
- **Projects 3-4**: Learn advanced PDAs and cross-program invocation
- **Projects 5-7**: Build complex DeFi applications with external integrations  
- **Projects 8-10**: Handle time-based logic, complex state, and program upgrades

## 🔑 Core Concepts Mastered

By completing this learning path, you'll understand:

- **Anchor Framework**: Program structure, account validation, constraints
- **Program Derived Addresses (PDAs)**: Deterministic account generation
- **Account Management**: Initialization, mutation, closure, rent handling
- **Cross-Program Invocation (CPI)**: Interacting with other programs
- **Security Patterns**: Signer validation, ownership checks, attack prevention
- **Token Operations**: SPL token integration, minting, transfers
- **DeFi Primitives**: Staking, escrow, vesting, automated market makers
- **Testing**: Comprehensive TypeScript test suites for Solana programs

## 🛡️ Security Focus

Each project emphasizes Solana security best practices:

- ✅ Proper account validation and constraints
- ✅ Signer verification and authorization
- ✅ PDA derivation and ownership
- ✅ Cross-program invocation safety
- ✅ Integer overflow/underflow protection
- ✅ Account closure and rent reclamation

## 📋 Development Commands

Standard commands for each project:

```bash
# Navigate to project directory
cd project-XX-name/workspace_name

# Build the program
anchor build

# Run tests (includes build + deploy + test)
anchor test

# Deploy to configured cluster
anchor deploy

# Start local validator (if needed)
anchor localnet
```

## 🤝 Contributing

Found a bug or want to improve a project? Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add or update tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Anchor Framework](https://anchor-lang.com/) for the excellent Solana development framework
- [Solana Labs](https://solanalabs.com/) for the robust blockchain platform
- The Solana developer community for inspiration and best practices

---

**Ready to become a Solana developer?** Start with [Project 01: Counter](./project-01-counter/) and begin your journey! 🚀