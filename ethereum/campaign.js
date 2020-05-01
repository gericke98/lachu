//Importar librerías y variables
import web3 from "./web3";
import Campaign from "./build/Campaign.json";
//Exportar variable con contrato de campaña individual desplegado (Campaign)
export default address => {
  return new web3.eth.Contract(
    JSON.parse(Campaign.interface),
    address
  );
};
