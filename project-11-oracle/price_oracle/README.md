# Project 11: Advanced Multi-Asset Oracle System

A sophisticated price oracle system built on Solana using the Anchor framework. This project demonstrates advanced Solana concepts including multi-asset price feeds, staleness protection, authority management, and comprehensive data validation.

## 🚀 Overview

This oracle system manages real-time price data for multiple cryptocurrency assets (BTC, ETH, SOL) with enterprise-grade features including data freshness validation, feed lifecycle management, and robust access controls.

## 🏗️ Architecture

### Oracle Master
- **Single Authority**: Controls the entire oracle system
- **Feed Registry**: Maintains count and metadata of all price feeds
- **PDA Structure**: Uses `["oracle"]` seed for deterministic addressing

### Price Feeds
- **Independent Feeds**: Each asset has its own dedicated feed
- **Unique IDs**: Sequential feed IDs starting from 0
- **PDA Structure**: Uses `["feed", oracle_key, feed_count]` seeds
- **Staleness Protection**: 48-hour freshness validation

## ✨ Key Features

- **🔄 Multi-Asset Support**: BTC, ETH, and SOL price feeds
- **⏰ Staleness Protection**: Automatic 48-hour data freshness validation
- **🔒 Access Control**: Oracle and per-feed authority management
- **📊 Comprehensive Tracking**: Update counts, timestamps, and metadata
- **🎛️ Feed Management**: Activate/deactivate feeds, update metadata
- **📈 Price Volatility**: Handle realistic cryptocurrency price movements
- **🔍 Data Queries**: Get feed info, oracle info, and current values

## 🛠 Installation

### Prerequisites
- Rust 1.70+
- Solana CLI 1.18+
- Anchor Framework 0.31+
- Node.js 18+ & Yarn

### Setup
```bash
# Install dependencies
yarn install

# Build the program
anchor build

# Run tests
anchor test
```

## 🧪 Testing

The project includes 11 comprehensive test cases covering all functionality:

### Test Suite Overview
1. **Oracle Initialization** - Sets up the master oracle
2. **BTC Feed Creation** - Creates Bitcoin price feed (ID: 0)
3. **ETH Feed Creation** - Creates Ethereum price feed (ID: 1)
4. **SOL Feed Creation** - Creates Solana price feed (ID: 2)
5. **Price Updates** - Updates all feeds with realistic prices
6. **Staleness Protection** - Tests 48-hour freshness validation
7. **Feed Info Queries** - Retrieves detailed feed information
8. **Oracle Info Queries** - Gets oracle master information
9. **Feed Status Toggle** - Tests activate/deactivate functionality
10. **Metadata Updates** - Updates feed descriptions
11. **Price Volatility** - Simulates realistic market movements
12. **Final Verification** - Validates complete system state

### Sample Test Output
```
✅ Oracle initialized successfully
✅ BTC feed created successfully (ID: 0)
✅ ETH feed created successfully (ID: 1) 
✅ SOL feed created successfully (ID: 2)
✅ All price feeds updated successfully
   BTC: $95000, ETH: $3500, SOL: $240
✅ Final oracle state verification passed
   Total Feeds: 3
   - BTC_USD (ID: 0): $97500 (Updates: 4)
   - ETH_USD (ID: 1): $3580 (Updates: 4)
   - SOL_USD (ID: 2): $248 (Updates: 4)
```

## 📋 Program Instructions

### Core Operations

#### `initialize_oracle()`
Creates the master oracle account that manages all price feeds.

#### `create_feed(name: String, description: String)`
Creates a new price feed with a unique ID and metadata.

#### `update_feed(new_value: u64)`
Updates a price feed with new price data and timestamps.

#### `get_feed_value()`
Retrieves current price with automatic staleness validation.

### Management Functions

#### `toggle_feed_status()`
Activates or deactivates a price feed.

#### `update_feed_metadata(description: String)`
Updates feed description and metadata.

#### `transfer_oracle_authority(new_authority: Pubkey)`
Transfers oracle master authority to a new account.

#### `transfer_feed_authority(new_authority: Pubkey)`
Transfers individual feed authority.

### Query Functions

#### `get_oracle_info()`
Returns oracle master information including authority and feed count.

#### `get_feed_info()`
Returns comprehensive feed information including all metadata.

## 📊 Data Structures

### Oracle Account
```rust
pub struct Oracle {
    pub authority: Pubkey,      // Master authority
    pub feed_count: u32,        // Number of feeds created
}
```

### PriceFeed Account
```rust
pub struct PriceFeed {
    pub oracle: Pubkey,         // Reference to oracle master
    pub authority: Pubkey,      // Feed authority
    pub feed_id: u32,           // Unique feed ID (0, 1, 2...)
    pub name: String,           // Feed name (BTC_USD, ETH_USD, SOL_USD)
    pub description: String,    // Feed description
    pub value: u64,             // Current price value
    pub last_updated: i64,      // Last update timestamp
    pub update_count: u64,      // Total number of updates
    pub is_active: bool,        // Whether feed is active
}
```

## 🔒 Security Features

### Access Control
- **Oracle Authority**: Required for creating new feeds
- **Feed Authority**: Required for updating individual feeds
- **PDA Validation**: Ensures only valid accounts can be accessed

### Data Validation
- **Name Limits**: Feed names limited to 32 characters
- **Description Limits**: Descriptions limited to 100 characters
- **Active Status**: Only active feeds can be updated or queried
- **Staleness Check**: 48-hour maximum age for price data

### Error Handling
```rust
pub enum OracleError {
    StaleData,              // Data older than 48 hours
    Unauthorized,           // Invalid authority
    FeedInactive,          // Feed is deactivated
    NameTooLong,           // Feed name > 32 characters
    DescriptionTooLong,    // Description > 100 characters
}
```

## 💼 Use Cases

### DeFi Applications
- **Price Oracles**: Real-time price data for lending protocols
- **Automated Trading**: Trigger trades based on price movements
- **Risk Management**: Monitor asset prices for liquidations

### Market Analysis
- **Price Tracking**: Historical price data analysis
- **Volatility Monitoring**: Track price changes over time
- **Market Indicators**: Compare prices across different assets

### Portfolio Management
- **Asset Valuation**: Calculate portfolio values in real-time
- **Rebalancing**: Automatic portfolio rebalancing based on prices
- **Performance Tracking**: Monitor investment performance

## 📈 Price Data

### Current Test Prices
- **BTC_USD**: $97,500 (High volatility: $92,000 - $98,000)
- **ETH_USD**: $3,580 (Medium volatility: $3,420 - $3,650)  
- **SOL_USD**: $248 (Medium volatility: $235 - $255)

### Update Frequency
- **Real-time Updates**: No built-in delay, updates as needed
- **Staleness Protection**: Data considered stale after 48 hours
- **Update Tracking**: Each feed tracks total update count

## 🔧 Configuration

### Network Settings
```toml
[programs.localnet]
btc_oracle = "3GfdRMo1yozdU7EhD21Bz68wiFq4E13XuZ8TpBpvxBvF"

[provider]
cluster = "localnet"
wallet = "~/.config/solana/id.json"
```

### Account Space Calculation
- **Oracle Account**: 44 bytes (8 + 32 + 4)
- **PriceFeed Account**: 243 bytes (discriminator + all fields + padding)

## 🚦 Getting Started

### 1. Build and Test
```bash
# Build the program
anchor build

# Run all tests
anchor test

# Check test output for feed creation and updates
```

### 2. Deploy to Devnet
```bash
# Configure for devnet
solana config set --url devnet

# Deploy program
anchor deploy --provider.cluster devnet
```

### 3. Interact with Oracle
```typescript
// Initialize oracle
await program.methods.initializeOracle()
  .accounts({ oracle: oraclePda, authority: authority.publicKey })
  .rpc();

// Create BTC feed
await program.methods.createFeed("BTC_USD", "Bitcoin price in USD")
  .accounts({ oracle: oraclePda, priceFeed: btcFeedPda })
  .rpc();

// Update price
await program.methods.updateFeed(new anchor.BN(95000))
  .accounts({ priceFeed: btcFeedPda, authority: authority.publicKey })
  .rpc();
```

## 📚 Learning Objectives

This project demonstrates:

### Advanced Anchor Concepts
- **Multi-account Programs**: Managing related but independent accounts
- **PDA Strategies**: Using seeds for deterministic addressing
- **Account Constraints**: Implementing proper validation and security

### Solana Development
- **Clock Sysvar**: Using on-chain time for staleness protection
- **Account Space**: Efficient memory usage and rent optimization
- **Error Handling**: Custom error types and proper validation

### Production Patterns
- **Data Freshness**: Implementing staleness protection
- **Authority Management**: Flexible permission systems
- **State Management**: Tracking updates and metadata

## 🔮 Future Enhancements

- **Price Aggregation**: Combine multiple data sources
- **Historical Data**: Store price history on-chain
- **Push Notifications**: Event-based price updates
- **Cross-Chain**: Bridge prices to other blockchains
- **Governance**: Decentralized oracle management
- **Fee Structure**: Implement usage-based fees

## 📄 License

MIT License - Open source oracle system for educational and development purposes.

---

**Built with 💪 on Solana using Anchor Framework**

*Real-time cryptocurrency price oracle with enterprise-grade features*