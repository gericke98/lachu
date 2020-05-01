//Importación de librerías y variables
import React, {Component} from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import {Card, Grid, Button} from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import {Link} from "../../routes";

//Creación de componente para la página
class CampaignShow extends Component {
  //Función que se ejecuta al cargar la página
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address); //Obtención de address de la campaña específica

    const summary = await campaign.methods.getSummary().call(); //Llamar a la función del smart contract

    //Devolver datos obtenidos
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }
  //Mostrar en página
  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Identificador manager del proyecto",
        description: "El manager creó el proyecto y puede modificarlo",
        style: {overflowWrap: "break-word"}
      },

      {
        header: minimumContribution,
        meta: "Inversión mínima en wei",
        description: "Debes invertir al menos esa cantidad para entrar en el proyecto"
      },

      {
        header: requestCount,
        meta: "Número de propuestas de gastos",
        description: "Una propuesta de gasto intenta sacar dinero del contrato para realizar una función"
      },

      {
        header: approversCount,
        meta:  "Número de inversores",
        description: "Número de inversores del proyecto"
      },

      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Balance del proyecto en ether",
        description: "El balance del proyecto es el dinero que queda en el contrato para gastar"
      }

    ];

    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <h3>Detalles del proyecto</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>Ver gastos</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
