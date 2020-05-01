import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //El usuario tiene metamask y está en el navegador
  web3 = new Web3(window.web3.currentProvider);
}else {
  // El usuario no tiene metamask y está en el servidor
  const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/38f5b3524c3c4be6a211bdce5408d577");
  web3 = new Web3(provider);
}
export default web3;
