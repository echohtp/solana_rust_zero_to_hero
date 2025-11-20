import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CounterApp } from "../target/types/counter_app";

describe("counter_app", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.CounterApp as Program<CounterApp>;
  let counterKeypair: anchor.web3.Keypair;
  let provider = anchor.getProvider();

  beforeEach(()=>{
    // Genearte a new counter account for each test
    counterKeypair = anchor.web3.Keypair.generate();
  });


  it("Initalizes the counter!", async ()=>{
    await program.methods
      .initialize()
      .accounts({
        counter: counterKeypair.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([counterKeypair])
      .rpc();
  })

  it("Increments the counter!", async ()=>{
    await program.methods
      .initialize()
      .accounts({
        counter: counterKeypair.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([counterKeypair])
      .rpc();

    await program.methods
      .increment()
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc();
  });

  it("Decrements the counter!", async ()=>{
    await program.methods
      .initialize()
      .accounts({
        counter: counterKeypair.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([counterKeypair])
      .rpc();

    await program.methods
      .increment()
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc();

    await program.methods
      .decrement()
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc();
  });

  it("Prevents counter underflow!", async ()=>{
    await program.methods
      .initialize()
      .accounts({
        counter: counterKeypair.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([counterKeypair])
      .rpc();

    try {
      await program.methods
        .decrement()
        .accounts({
          counter: counterKeypair.publicKey,
        })
        .rpc();
      // If we reach this line, the test should fail
      throw new Error("Counter underflow was not prevented");
    } catch (err) {
      const errorMsg = "CounterUnderflow";
      if (!err.toString().includes(errorMsg)) {
        throw err; // rethrow if it's a different error
      }
    }
  });
});