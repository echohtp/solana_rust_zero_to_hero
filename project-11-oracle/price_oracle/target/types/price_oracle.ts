/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/price_oracle.json`.
 */
export type PriceOracle = {
  "address": "3GfdRMo1yozdU7EhD21Bz68wiFq4E13XuZ8TpBpvxBvF",
  "metadata": {
    "name": "priceOracle",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createFeed",
      "discriminator": [
        173,
        86,
        95,
        94,
        13,
        193,
        67,
        180
      ],
      "accounts": [
        {
          "name": "oracle",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "priceFeed",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  101,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "oracle"
              },
              {
                "kind": "account",
                "path": "oracle.feed_count",
                "account": "oracle"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "oracle"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "feedName",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    {
      "name": "getFeedInfo",
      "discriminator": [
        16,
        31,
        218,
        1,
        246,
        98,
        222,
        169
      ],
      "accounts": [
        {
          "name": "priceFeed"
        }
      ],
      "args": [],
      "returns": {
        "defined": {
          "name": "feedInfo"
        }
      }
    },
    {
      "name": "getFeedValue",
      "discriminator": [
        146,
        214,
        235,
        33,
        146,
        201,
        142,
        180
      ],
      "accounts": [
        {
          "name": "priceFeed"
        }
      ],
      "args": [],
      "returns": "u64"
    },
    {
      "name": "getOracleInfo",
      "discriminator": [
        249,
        26,
        180,
        81,
        227,
        168,
        80,
        2
      ],
      "accounts": [
        {
          "name": "oracle",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        }
      ],
      "args": [],
      "returns": {
        "defined": {
          "name": "oracleInfo"
        }
      }
    },
    {
      "name": "initializeOracle",
      "discriminator": [
        144,
        223,
        131,
        120,
        196,
        253,
        181,
        99
      ],
      "accounts": [
        {
          "name": "oracle",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "toggleFeedStatus",
      "discriminator": [
        240,
        163,
        79,
        125,
        170,
        100,
        178,
        229
      ],
      "accounts": [
        {
          "name": "priceFeed",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true,
          "relations": [
            "priceFeed"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "transferFeedAuthority",
      "discriminator": [
        63,
        74,
        204,
        176,
        102,
        196,
        154,
        238
      ],
      "accounts": [
        {
          "name": "priceFeed",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true,
          "relations": [
            "priceFeed"
          ]
        }
      ],
      "args": [
        {
          "name": "newAuthority",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "transferOracleAuthority",
      "docs": [
        "Transfer oracle authority"
      ],
      "discriminator": [
        121,
        248,
        188,
        188,
        98,
        217,
        168,
        20
      ],
      "accounts": [
        {
          "name": "oracle",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  111,
                  114,
                  97,
                  99,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "signer": true,
          "relations": [
            "oracle"
          ]
        }
      ],
      "args": [
        {
          "name": "newAuthority",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "updateFeed",
      "discriminator": [
        222,
        6,
        52,
        131,
        173,
        81,
        113,
        247
      ],
      "accounts": [
        {
          "name": "priceFeed",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true,
          "relations": [
            "priceFeed"
          ]
        }
      ],
      "args": [
        {
          "name": "newValue",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateFeedMetadata",
      "docs": [
        "Update feed metadata"
      ],
      "discriminator": [
        139,
        91,
        75,
        173,
        190,
        30,
        113,
        10
      ],
      "accounts": [
        {
          "name": "priceFeed",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true,
          "relations": [
            "priceFeed"
          ]
        }
      ],
      "args": [
        {
          "name": "newDescription",
          "type": {
            "option": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "oracle",
      "discriminator": [
        139,
        194,
        131,
        179,
        140,
        179,
        229,
        244
      ]
    },
    {
      "name": "priceFeed",
      "discriminator": [
        189,
        103,
        252,
        23,
        152,
        35,
        243,
        156
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "staleData",
      "msg": "The data is stale."
    },
    {
      "code": 6001,
      "name": "unauthorized",
      "msg": "Unauthorized action."
    },
    {
      "code": 6002,
      "name": "feedInactive",
      "msg": "Feed is not active."
    },
    {
      "code": 6003,
      "name": "nameTooLong",
      "msg": "Feed name is too long (max 32 characters)."
    },
    {
      "code": 6004,
      "name": "descriptionTooLong",
      "msg": "Feed description is too long (max 100 characters)."
    }
  ],
  "types": [
    {
      "name": "feedInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feedId",
            "type": "u32"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "value",
            "type": "u64"
          },
          {
            "name": "lastUpdated",
            "type": "i64"
          },
          {
            "name": "updateCount",
            "type": "u64"
          },
          {
            "name": "isActive",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "oracle",
      "docs": [
        "Oracle master account"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "feedCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "oracleInfo",
      "docs": [
        "Return data structures"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "feedCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "priceFeed",
      "docs": [
        "Individual price feed"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oracle",
            "type": "pubkey"
          },
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "feedId",
            "type": "u32"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "value",
            "type": "u64"
          },
          {
            "name": "lastUpdated",
            "type": "i64"
          },
          {
            "name": "updateCount",
            "type": "u64"
          },
          {
            "name": "isActive",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
