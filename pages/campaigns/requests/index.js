//Importacion de librerías y variables
import React, {Component} from "react";
import Layout from "../../../components/Layout";
import {Button, Table} from "semantic-ui-react";
import {Link} from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

//Creación de componente de la página
class RequestIndex extends Component {
  //Función que se ejecuta al cargar la página
  static async getInitialProps(props) {
    const {address} = props.query; //Obtener la address de la campaña
    const campaign = Campaign(address); //Obtener el proyecto específico de la address
    const requestCount = await campaign.methods.getRequestsCount().call(); //Llamar a la funcion para saber el numero de propuestas de gastos
    const approversCount = await campaign.methods.approversCount().call(); //Llamar a la función para saber el número de approvers

    const requests = await Promise.all(Array(parseInt(requestCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call();
    }) ); //Obtener información de la estrcutra Request

    return {address, requests, requestCount, approversCount}; //Devolución de variables
  }
  //Mostrar filas de proyectos en la página. Cada fila es un proyecto
  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
      <RequestRow
        key={index}
        id={index}
        request={request}
        address={this.props.address}
        approversCount={this.props.approversCount}
      />
    );
    })
  }
  render() {
    const {Header, Row, HeaderCell, Body} = Table;
    return (
      <Layout>

        <h3>Propuestas de gasto</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{marginBottom: 10}}> Añadir gasto </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Descripción</HeaderCell>
              <HeaderCell>Gasto</HeaderCell>
              <HeaderCell>Beneficiario</HeaderCell>
              <HeaderCell>Nº aprobaciones</HeaderCell>
              <HeaderCell>Aprobar</HeaderCell>
              <HeaderCell>Finalizar</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
        <div>Encontradas {this.props.requestCount} propuestas de gasto </div>
      </Layout>
    );
  }
}

export default RequestIndex;
