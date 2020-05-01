//Importacion de librerías y variables
import React, {Component} from "react";
import instance from "../ethereum/factory";
import {Card, Button} from "semantic-ui-react";
import Layout from "../components/Layout"
import {Link} from "../routes"


//Creación de componente para publicar pagina de inicio
class CampaignIndex extends Component {
  //Función que se llama al entrar en la página
  static async getInitialProps() {
    // Variable que guarda todas los proyectos desplegados
    const campaigns = await instance.methods.getDeployedCampaign().call();
    //Devuelve variable que guarda todas los proyectos desplegados
    return {campaigns}
  }
  //Función para mostrar cada campaña por separado
  renderCampaigns () {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route = {`/campaigns/${address}`}>
            <a>Saber más</a>
          </Link>
        ),
        fluid: true
      };
    });
    //Variable que busca un proyecto determinado por el "address" y devuelve la informacion de ese proyecto
    //La informacion que devuelve es el address de cada proyecto y un boton para saber más

    return <Card.Group items={items} />;
  }

  //Función para mostrar los contenidos de la página
  render() {
    return(
      <Layout>
      <div>
        <h3> Proyectos abiertos </h3>
        <Link route = "/campaigns/new">
          <a>
            <Button floated="right" content="Crear proyecto" icon="add circle" primary={true}/>
          </a>
        </Link>
        {this.renderCampaigns()}
      </div>
      </Layout>
    );
  }
}
export default CampaignIndex;
