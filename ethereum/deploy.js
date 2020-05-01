const HDWalletProvider = require("truffle-hdWallet-provider");
const Web3 = require("web3");
const compiledFactory = require ("./build/:CampaignFactory.json");
const Campaign = require ("./build/:Campaign.json");

const provider = new HDWalletProvider("belt swing impose sketch input liquid hen lucky bronze notable pave spread",
 "https://rinkeby.infura.io/v3/38f5b3524c3c4be6a211bdce5408d577");

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: compiledFactory.bytecode})
    .send({ gas : "1000000" ,from: accounts[0]});


  console.log("Contract deployed to ", result.options.address);
};
deploy();
