A web3 adaptor for RepuCoin's RESTful API.


## Table of contents

* [Install](#install)
* [Usage](#usage)
* [Web3 method supported](#web3-method-supported)
* [Send transaction](#send-transaction)
* [Documentation](https://thorify.vecha.in)
* [Notes](#notes)
* [Compatibility](#compatibility)
* [Debugging](#debugging)

## Install

``` bash
npm install --save repuify
npm install --save web3@1.*  # Web3 is needed as dependency.
```

## Usage

``` javascript
// ES6 style
import { repuify } from "repuify";
const Web3 = require("web3");		// Recommend using require() instead of import here

const web3 = repuify(new Web3(), "http://localhost:8669");

web3.eth.getBlock("latest").then(res => console.log(res));
// Best block info will be displayed
```

If you would like to write code in ES5, check below for the initialization code.

``` javascript
// ES5 style
const repuify = require("repuify").repuify;
const Web3 = require("web3");

const web3 = repuify(new Web3(), "http://localhost:8669");

web3.eth.getBlock("latest").then(res => console.log(res));
// Best block info will be displayed
```

## RepuCoin

However, in RepuCoin, the structure is different from Ethereum's and Vechain's block structure, whereby, blocks are differentiated by two different types. Microblocks and Keyblocks.

```
RepuCoin web3 instance
├── eth
│   ├── getKeyblockByHeight
│   ├── getKeyblockByHash
│   ├── getMicroblockByHash
│   ├── getTransactionByHash
```

## Send Transaction

In Thor official implementation , the client **DOES NOT** neither manage user's private-key/keyStore nor use private key to sign a Transaction. Unfortunately, thorify can not directly perform `eth_sendTransaction` but there is another way to sign a transaction.

In [web3.js accounts](https://web3js.readthedocs.io/en/1.0/web3-eth-accounts.html#eth-accounts), it gives the opportunity to add your private-key, stored in your runtime context (In Node.js context, it's stored in memory while in Browser context, it's stored in memory/local storage), to accounts module. When you are trying to send a transaction, the module will check the private key associated with from field. Once the private key and from have been matched, the module will sign the transaction.
The APIs that follows the mechanism are:

+ `web3.eth.sendTransaction()`
+ `contract.deploy.send()`
+ `contract.methods.myMethod.send()`

## Documentation

[API Reference](https://thorify.vecha.in/#/?id=api-reference)

### Method not supported

The RESTful API of Thor is different with Ethereum's JSON-RPC, therefore, there are some methods in web3 are not supported by thorify, feel free to open an issue discuss the features.

## Notes

- There are three special block number in Ethereum: `earliest`,`latest`,`pending`. In VeChain Thor, we introduced `best` block and there is no `pending` block, so they will be replaced with `0` (aka genesis), `best`, `best`

## Compatibility

Currently, `Thorify` is compatible with `web3@1.*`.

## Debugging

```shell
DEBUG=thor:* ts-node index.ts 
```

`ts-node index.ts` can be replaced with command to run your code, this example is only for Node.js environment. For more detailed info, please refer to [debug](https://www.npmjs.com/package/debug).