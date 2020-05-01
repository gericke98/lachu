//Importación de librerías y variables
import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json"

//Creación de variable con el contrato que contiene todas las campañas desplegados (Campaign Factory)
const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),"0x04be71b7708187D87b1fa669afE98260076E9424");
//exporta la variable con el contrato desplegado creado
export default instance;
