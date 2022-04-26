const Web3 = require('web3');
let provider = 'https://matic-mumbai.chainstacklabs.com/';
const ERC20 = require('./ERC20.json');
const accountPrivateKey = '345084502b2d36ea542d0e68ebd682ebf92dddfcafbe597efead47d1949b8afd';
const accountAddress = '0xd6F8595B0a1808dA9b529Da525F1101716618D1A';
const contractAddress = '0xfAc4B29B5b1515e1a1d74BC45Cd19d5b26CBF7e1';
const abi = require('ethereumjs-abi');
(async () => {
    try {
        const options = {
            // Enable auto reconnection
            reconnect: {
                auto: true,
                delay: 10000, // ms
                maxAttempts: 5,
                onTimeout: false
            }
        };
        provider = 'wss://ws-matic-mumbai.chainstacklabs.com';
        const web3 = new Web3(new Web3.providers.WebsocketProvider(provider, options));

        // const web3 = new Web3(new Web3.providers.HttpProvider(provider));

        // let ethBalance = await web3.eth.getBalance(accountAddress);
        // console.log('ETH Balance:', web3.utils.fromWei(ethBalance, 'ether'));
        web3.eth.accounts.wallet.add(accountPrivateKey);
        const contract = new web3.eth.Contract(ERC20, contractAddress);
        let estimateGas = await contract.methods.getRandomNumber().estimateGas({ from: accountAddress });

        let data = await contract.methods.getRandomNumber().send({ from: accountAddress, gas: estimateGas });
        const typesArray = [{ type: 'uint256', name: 'seed' }];
        // let seed = web3.eth.abi.decodeParameters(typesArray, data.events['2'].raw.data);
        const rawSeed = data.events['2'].raw.data;
        console.log(web3.utils.isHexStrict(rawSeed));
        // var txDecoder = require('ethereum-tx-decoder');
        // var decodedTx = txDecoder.decodeTx(data.events['2'].raw);
        // console.log(decodedTx);
        // contract.events
        //     .Deposited({}, (error, event) => {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             console.log(event);
        //         }
        //     })
        //     .on('data', async (event) => {
        //         console.log('Event:', event);
        //     })
        //     .on('error', (err) => console.log('error', err.message, err.stack));

        // contract
        //     .getPastEvents('Deposited', {
        //         fromBlock: 26056016,
        //         toBlock: 'latest'
        //     })
        //     .then((res) => {
        //         console.log({ deposited: res[0] });
        //     })
        //     .catch((err) => console.log({ err }));

        // let data = await contract.methods.winner().call();
        // console.log({ dat: data });

        // const balanceOfAccount = await wethContract.methods.balanceOf(accountAddress).call();
        // console.log({ balanceOfAccount: web3.utils.fromWei(balanceOfAccount, 'ether') });
        // web3.eth.accounts.wallet.add(accountPrivateKey);

        // const account = web3.eth.accounts.wallet[0];
        // console.log({ account });
        // let estimateGas = await wethContract.methods.withdraw(web3.utils.toWei('0.01')).estimateGas({ from: accountAddress });
        // console.log({ estimateGas });
        // let rs = await wethContract.methods.withdraw(web3.utils.toWei('0.01')).send({ from: accountAddress, gas: estimateGas });
        // console.log({ rs });

        // let estimateGas = await wethContract.methods.deposit().estimateGas({ from: accountAddress, value: web3.utils.toWei('0.001') });
        // console.log({ estimateGas });
        // let rs = await wethContract.methods.deposit().send({ from: accountAddress, value: web3.utils.toWei('0.001'), gas: estimateGas });
        // console.log({ rs });

        // const blockNumberLastest = await web3.eth.getBlockNumber();
        // const options = {
        //     filters: {
        //         src: accountAddress
        //     }
        //     // ,
        //     // fromBlock: blockNumberLastest - 1000,
        //     // toBlock: 'latest'
        // };

        // let pastEvent = await wethContract.getPastEvents('Transfer', options);
        // console.log({ pastEvent });

        // const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
        // const addresses = ['0xEDC5d158D95988f52500147afd2CA0671a50d8Db', '0x61CdF0e6514b4112130ee5404880208FA67064C0'];
        // const contractCallContext = addresses.map((address, index) => {
        //     return {
        //         reference: 'user' + index,
        //         contractAddress: contractAddress,
        //         abi: ERC20,
        //         calls: [{ reference: 'balance' + index, methodName: 'balanceOf', methodParameters: [address] }]
        //     };
        // });
        // let rs = await multicall.call(contractCallContext);
        // console.log(JSON.stringify(rs));
    } catch (e) {
        console.error(e);
    }
})();
