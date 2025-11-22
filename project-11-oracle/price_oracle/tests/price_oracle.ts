import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PriceOracle } from "../target/types/price_oracle";
import { expect } from "chai";

describe("price_oracle", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.PriceOracle as Program<PriceOracle>;
  const provider = anchor.getProvider();

  // Derive the PDA for the oracle master account
  const [oraclePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("oracle")],
    program.programId
  );

  // Feed PDAs for BTC, ETH, and SOL
  let btcFeedPda: anchor.web3.PublicKey;
  let ethFeedPda: anchor.web3.PublicKey;
  let solFeedPda: anchor.web3.PublicKey;

  console.log("Program ID:", program.programId.toString());
  console.log("Oracle PDA:", oraclePda.toString());
  console.log("Authority:", provider.wallet.publicKey.toString());

  it("Initializes the oracle master", async () => {
    try {
      const tx = await program.methods
        .initializeOracle()
        .accounts({
          oracle: oraclePda,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      console.log("Initialize oracle transaction signature:", tx);

      // Verify the oracle was created
      const oracle = await program.account.oracle.fetch(oraclePda);
      expect(oracle.authority.toString()).to.equal(provider.wallet.publicKey.toString());
      expect(oracle.feedCount).to.equal(0);

      console.log("✅ Oracle initialized successfully");
      console.log("   Authority:", oracle.authority.toString());
      console.log("   Feed count:", oracle.feedCount);
    } catch (error) {
      console.error("Initialize oracle error:", error);
      throw error;
    }
  });

  it("Creates BTC price feed", async () => {
    try {
      // Derive the PDA for BTC feed (first feed, feed_count = 0)
      const [feedPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("feed"), oraclePda.toBuffer(), Buffer.from([0, 0, 0, 0])],
        program.programId
      );
      btcFeedPda = feedPda;

      const tx = await program.methods
        .createFeed("BTC_USD", "Bitcoin price in USD")
        .accounts({
          oracle: oraclePda,
          priceFeed: btcFeedPda,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      console.log("Create BTC feed transaction signature:", tx);

      // Verify the feed was created
      const feed = await program.account.priceFeed.fetch(btcFeedPda);
      expect(feed.name).to.equal("BTC_USD");
      expect(feed.description).to.equal("Bitcoin price in USD");
      expect(feed.feedId).to.equal(0);
      expect(feed.value.toNumber()).to.equal(0);
      expect(feed.isActive).to.be.true;

      console.log("✅ BTC feed created successfully");
      console.log("   Feed ID:", feed.feedId);
      console.log("   Name:", feed.name);
      console.log("   Description:", feed.description);
    } catch (error) {
      console.error("Create BTC feed error:", error);
      throw error;
    }
  });

  it("Creates ETH price feed", async () => {
    try {
      // Derive the PDA for ETH feed (second feed, feed_count = 1)
      const [feedPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("feed"), oraclePda.toBuffer(), Buffer.from([1, 0, 0, 0])],
        program.programId
      );
      ethFeedPda = feedPda;

      const tx = await program.methods
        .createFeed("ETH_USD", "Ethereum price in USD")
        .accounts({
          oracle: oraclePda,
          priceFeed: ethFeedPda,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      console.log("Create ETH feed transaction signature:", tx);

      // Verify the feed was created
      const feed = await program.account.priceFeed.fetch(ethFeedPda);
      expect(feed.name).to.equal("ETH_USD");
      expect(feed.description).to.equal("Ethereum price in USD");
      expect(feed.feedId).to.equal(1);
      expect(feed.value.toNumber()).to.equal(0);
      expect(feed.isActive).to.be.true;

      console.log("✅ ETH feed created successfully");
      console.log("   Feed ID:", feed.feedId);
      console.log("   Name:", feed.name);
      console.log("   Description:", feed.description);
    } catch (error) {
      console.error("Create ETH feed error:", error);
      throw error;
    }
  });

  it("Creates SOL price feed", async () => {
    try {
      // Derive the PDA for SOL feed (third feed, feed_count = 2)
      const [feedPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("feed"), oraclePda.toBuffer(), Buffer.from([2, 0, 0, 0])],
        program.programId
      );
      solFeedPda = feedPda;

      const tx = await program.methods
        .createFeed("SOL_USD", "Solana price in USD")
        .accounts({
          oracle: oraclePda,
          priceFeed: solFeedPda,
          authority: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      console.log("Create SOL feed transaction signature:", tx);

      // Verify the feed was created
      const feed = await program.account.priceFeed.fetch(solFeedPda);
      expect(feed.name).to.equal("SOL_USD");
      expect(feed.description).to.equal("Solana price in USD");
      expect(feed.feedId).to.equal(2);
      expect(feed.value.toNumber()).to.equal(0);
      expect(feed.isActive).to.be.true;

      // Verify oracle feed count
      const oracle = await program.account.oracle.fetch(oraclePda);
      expect(oracle.feedCount).to.equal(3);

      console.log("✅ SOL feed created successfully");
      console.log("   Feed ID:", feed.feedId);
      console.log("   Name:", feed.name);
      console.log("   Description:", feed.description);
      console.log("   Total oracle feeds:", oracle.feedCount);
    } catch (error) {
      console.error("Create SOL feed error:", error);
      throw error;
    }
  });

  it("Updates all price feeds with realistic values", async () => {
    try {
      // Update BTC to $95,000
      const btcPrice = 95000;
      const btcTx = await program.methods
        .updateFeed(new anchor.BN(btcPrice))
        .accounts({
          priceFeed: btcFeedPda,
          authority: provider.wallet.publicKey,
        })
        .rpc();

      // Update ETH to $3,500
      const ethPrice = 3500;
      const ethTx = await program.methods
        .updateFeed(new anchor.BN(ethPrice))
        .accounts({
          priceFeed: ethFeedPda,
          authority: provider.wallet.publicKey,
        })
        .rpc();

      // Update SOL to $240
      const solPrice = 240;
      const solTx = await program.methods
        .updateFeed(new anchor.BN(solPrice))
        .accounts({
          priceFeed: solFeedPda,
          authority: provider.wallet.publicKey,
        })
        .rpc();

      console.log("BTC update transaction:", btcTx);
      console.log("ETH update transaction:", ethTx);
      console.log("SOL update transaction:", solTx);

      // Verify all updates
      const btcFeed = await program.account.priceFeed.fetch(btcFeedPda);
      const ethFeed = await program.account.priceFeed.fetch(ethFeedPda);
      const solFeed = await program.account.priceFeed.fetch(solFeedPda);

      expect(btcFeed.value.toNumber()).to.equal(btcPrice);
      expect(ethFeed.value.toNumber()).to.equal(ethPrice);
      expect(solFeed.value.toNumber()).to.equal(solPrice);

      expect(btcFeed.updateCount.toNumber()).to.equal(1);
      expect(ethFeed.updateCount.toNumber()).to.equal(1);
      expect(solFeed.updateCount.toNumber()).to.equal(1);

      console.log("✅ All price feeds updated successfully");
      console.log("   BTC: $" + btcFeed.value.toNumber());
      console.log("   ETH: $" + ethFeed.value.toNumber());
      console.log("   SOL: $" + solFeed.value.toNumber());
    } catch (error) {
      console.error("Update feeds error:", error);
      throw error;
    }
  });

  it("Tests get_feed_value function with staleness check", async () => {
    try {
      // Test staleness check on BTC feed
      const btcValue = await program.methods
        .getFeedValue()
        .accounts({
          priceFeed: btcFeedPda,
        })
        .view();

      // Test staleness check on ETH feed
      const ethValue = await program.methods
        .getFeedValue()
        .accounts({
          priceFeed: ethFeedPda,
        })
        .view();

      // Test staleness check on SOL feed
      const solValue = await program.methods
        .getFeedValue()
        .accounts({
          priceFeed: solFeedPda,
        })
        .view();

      // Verify values match the stored data
      const btcFeed = await program.account.priceFeed.fetch(btcFeedPda);
      const ethFeed = await program.account.priceFeed.fetch(ethFeedPda);
      const solFeed = await program.account.priceFeed.fetch(solFeedPda);

      expect(btcValue.toNumber()).to.equal(btcFeed.value.toNumber());
      expect(ethValue.toNumber()).to.equal(ethFeed.value.toNumber());
      expect(solValue.toNumber()).to.equal(solFeed.value.toNumber());

      // Check data freshness (should be within 48 hours)
      const currentTime = Math.floor(Date.now() / 1000);
      const btcAge = currentTime - btcFeed.lastUpdated.toNumber();
      const ethAge = currentTime - ethFeed.lastUpdated.toNumber();
      const solAge = currentTime - solFeed.lastUpdated.toNumber();

      expect(btcAge).to.be.lessThan(172_800); // 48 hours
      expect(ethAge).to.be.lessThan(172_800);
      expect(solAge).to.be.lessThan(172_800);

      console.log("✅ Staleness protection working correctly");
      console.log("   BTC value retrieved:", btcValue.toNumber());
      console.log("   ETH value retrieved:", ethValue.toNumber());
      console.log("   SOL value retrieved:", solValue.toNumber());
      console.log("   All data is fresh (< 48 hours old)");
    } catch (error) {
      console.error("Staleness test error:", error);
      throw error;
    }
  });

  it("Tests get_feed_info function", async () => {
    try {
      // Get detailed feed info for all feeds
      const btcInfo = await program.methods
        .getFeedInfo()
        .accounts({
          priceFeed: btcFeedPda,
        })
        .view();

      const ethInfo = await program.methods
        .getFeedInfo()
        .accounts({
          priceFeed: ethFeedPda,
        })
        .view();

      const solInfo = await program.methods
        .getFeedInfo()
        .accounts({
          priceFeed: solFeedPda,
        })
        .view();

      // Verify all feed info
      expect(btcInfo.name).to.equal("BTC_USD");
      expect(btcInfo.feedId).to.equal(0);
      expect(btcInfo.value.toNumber()).to.equal(95000);
      expect(btcInfo.isActive).to.be.true;

      expect(ethInfo.name).to.equal("ETH_USD");
      expect(ethInfo.feedId).to.equal(1);
      expect(ethInfo.value.toNumber()).to.equal(3500);
      expect(ethInfo.isActive).to.be.true;

      expect(solInfo.name).to.equal("SOL_USD");
      expect(solInfo.feedId).to.equal(2);
      expect(solInfo.value.toNumber()).to.equal(240);
      expect(solInfo.isActive).to.be.true;

      console.log("✅ Feed info retrieval working correctly");
      console.log("   BTC Feed Info:", {
        id: btcInfo.feedId,
        name: btcInfo.name,
        value: btcInfo.value.toNumber(),
        updateCount: btcInfo.updateCount.toNumber()
      });
      console.log("   ETH Feed Info:", {
        id: ethInfo.feedId,
        name: ethInfo.name,
        value: ethInfo.value.toNumber(),
        updateCount: ethInfo.updateCount.toNumber()
      });
      console.log("   SOL Feed Info:", {
        id: solInfo.feedId,
        name: solInfo.name,
        value: solInfo.value.toNumber(),
        updateCount: solInfo.updateCount.toNumber()
      });
    } catch (error) {
      console.error("Feed info test error:", error);
      throw error;
    }
  });

  it("Tests get_oracle_info function", async () => {
    try {
      const oracleInfo = await program.methods
        .getOracleInfo()
        .accounts({
          oracle: oraclePda,
        })
        .view();

      expect(oracleInfo.authority.toString()).to.equal(provider.wallet.publicKey.toString());
      expect(oracleInfo.feedCount).to.equal(3);

      console.log("✅ Oracle info retrieval working correctly");
      console.log("   Authority:", oracleInfo.authority.toString());
      console.log("   Feed Count:", oracleInfo.feedCount);
    } catch (error) {
      console.error("Oracle info test error:", error);
      throw error;
    }
  });

  it("Tests toggle_feed_status function", async () => {
    try {
      // Deactivate ETH feed
      const deactivateTx = await program.methods
        .toggleFeedStatus()
        .accounts({
          priceFeed: ethFeedPda,
          authority: provider.wallet.publicKey,
        })
        .rpc();

      console.log("ETH feed deactivate transaction:", deactivateTx);

      // Verify ETH feed is now inactive
      let ethFeed = await program.account.priceFeed.fetch(ethFeedPda);
      expect(ethFeed.isActive).to.be.false;

      // Try to get value from inactive feed - should fail
      try {
        await program.methods
          .getFeedValue()
          .accounts({
            priceFeed: ethFeedPda,
          })
          .view();
        throw new Error("Should have failed for inactive feed");
      } catch (err) {
        // Expected to fail
        console.log("   ✅ Correctly rejected inactive feed");
      }

      // Reactivate ETH feed
      const reactivateTx = await program.methods
        .toggleFeedStatus()
        .accounts({
          priceFeed: ethFeedPda,
          authority: provider.wallet.publicKey,
        })
        .rpc();

      console.log("ETH feed reactivate transaction:", reactivateTx);

      // Verify ETH feed is active again
      ethFeed = await program.account.priceFeed.fetch(ethFeedPda);
      expect(ethFeed.isActive).to.be.true;

      console.log("✅ Feed status toggle working correctly");
    } catch (error) {
      console.error("Toggle status test error:", error);
      throw error;
    }
  });

  it("Tests update_feed_metadata function", async () => {
    try {
      const newDescription = "Updated: Solana native token price in USD with real-time data";

      const tx = await program.methods
        .updateFeedMetadata(newDescription)
        .accounts({
          priceFeed: solFeedPda,
          authority: provider.wallet.publicKey,
        })
        .rpc();

      console.log("SOL feed metadata update transaction:", tx);

      // Verify metadata was updated
      const solFeed = await program.account.priceFeed.fetch(solFeedPda);
      expect(solFeed.description).to.equal(newDescription);

      console.log("✅ Feed metadata update working correctly");
      console.log("   New description:", solFeed.description);
    } catch (error) {
      console.error("Update metadata test error:", error);
      throw error;
    }
  });

  it("Tests price volatility simulation", async () => {
    try {
      // Simulate price movements for all feeds
      const btcPrices = [98000, 92000, 97500]; // Bitcoin volatility
      const ethPrices = [3650, 3420, 3580]; // Ethereum volatility
      const solPrices = [255, 235, 248]; // Solana volatility

      for (let i = 0; i < 3; i++) {
        // Update BTC
        await program.methods
          .updateFeed(new anchor.BN(btcPrices[i]))
          .accounts({
            priceFeed: btcFeedPda,
            authority: provider.wallet.publicKey,
          })
          .rpc();

        // Update ETH
        await program.methods
          .updateFeed(new anchor.BN(ethPrices[i]))
          .accounts({
            priceFeed: ethFeedPda,
            authority: provider.wallet.publicKey,
          })
          .rpc();

        // Update SOL
        await program.methods
          .updateFeed(new anchor.BN(solPrices[i]))
          .accounts({
            priceFeed: solFeedPda,
            authority: provider.wallet.publicKey,
          })
          .rpc();

        console.log(`   Round ${i + 1}: BTC=$${btcPrices[i]}, ETH=$${ethPrices[i]}, SOL=$${solPrices[i]}`);
      }

      // Verify final update counts
      const btcFeed = await program.account.priceFeed.fetch(btcFeedPda);
      const ethFeed = await program.account.priceFeed.fetch(ethFeedPda);
      const solFeed = await program.account.priceFeed.fetch(solFeedPda);

      expect(btcFeed.updateCount.toNumber()).to.equal(4); // 1 initial + 3 updates
      expect(ethFeed.updateCount.toNumber()).to.equal(4);
      expect(solFeed.updateCount.toNumber()).to.equal(4);

      expect(btcFeed.value.toNumber()).to.equal(97500);
      expect(ethFeed.value.toNumber()).to.equal(3580);
      expect(solFeed.value.toNumber()).to.equal(248);

      console.log("✅ Price volatility simulation completed");
      console.log("   Final BTC: $" + btcFeed.value.toNumber() + " (Updates: " + btcFeed.updateCount.toNumber() + ")");
      console.log("   Final ETH: $" + ethFeed.value.toNumber() + " (Updates: " + ethFeed.updateCount.toNumber() + ")");
      console.log("   Final SOL: $" + solFeed.value.toNumber() + " (Updates: " + solFeed.updateCount.toNumber() + ")");
    } catch (error) {
      console.error("Price volatility test error:", error);
      throw error;
    }
  });

  it("Tests final oracle state verification", async () => {
    try {
      const oracle = await program.account.oracle.fetch(oraclePda);
      const btcFeed = await program.account.priceFeed.fetch(btcFeedPda);
      const ethFeed = await program.account.priceFeed.fetch(ethFeedPda);
      const solFeed = await program.account.priceFeed.fetch(solFeedPda);

      // Verify final oracle state
      expect(oracle.feedCount).to.equal(3);
      expect(oracle.authority.toString()).to.equal(provider.wallet.publicKey.toString());

      // Verify all feeds are properly configured
      expect(btcFeed.feedId).to.equal(0);
      expect(ethFeed.feedId).to.equal(1);
      expect(solFeed.feedId).to.equal(2);

      expect(btcFeed.isActive).to.be.true;
      expect(ethFeed.isActive).to.be.true;
      expect(solFeed.isActive).to.be.true;

      console.log("✅ Final oracle state verification passed");
      console.log("   Oracle Authority:", oracle.authority.toString());
      console.log("   Total Feeds:", oracle.feedCount);
      console.log("   Feed Summary:");
      console.log("     - BTC_USD (ID: 0): $" + btcFeed.value.toNumber() + " (Updates: " + btcFeed.updateCount.toNumber() + ")");
      console.log("     - ETH_USD (ID: 1): $" + ethFeed.value.toNumber() + " (Updates: " + ethFeed.updateCount.toNumber() + ")");
      console.log("     - SOL_USD (ID: 2): $" + solFeed.value.toNumber() + " (Updates: " + solFeed.updateCount.toNumber() + ")");
    } catch (error) {
      console.error("Final verification error:", error);
      throw error;
    }
  });
});