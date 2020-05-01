//Importar librerías y variables
import React, {Component} from "react";
import { Form, Button, Input, Message} from "semantic-ui-react";
import Layout from "../../components/Layout";
import instance from "../../ethereum/factory";
import web3 from "../../ethereum/web3"
import {Router} from "../../routes";

//Creación de componente para la página de nuevo proyecto
class CampaignNew extends Component {
  //Inicialización de variables
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading:false
  };
  //Creación de evento onSubmit
  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading: true, errorMessage: ""}); //Establecer que se está cargando
    try {
      const accounts = await web3.eth.getAccounts(); //Obtener direcciones web3
      await instance.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from:accounts[0]
        }); //Llamada a la funcion crear campaña del smart contract
      Router.pushRoute("/"); //Actualización de la ruta
    } catch (err) {
      //Muestra mensaje de error en caso de transacción fallida
      this.setState({ errorMessage: err.message});
    }

    this.setState({loading:false}); //Establecer que ya se ha terminado la transaccion

  };

  //Función para mostrar elementos en la web
  render () {
    return(
      <Layout>
      <h3>Crear un proyecto</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Inversión mínima</label>
          <Input
           label="wei"
           labelPosition="right"
           value={this.state.minimumContribution}
           onChange={event => this.setState({minimumContribution: event.target.value})}
          />
        </Form.Field>
        <Message error header="Oops!" content = {this.state.errorMessage} />
        <Button loading={this.state.loading} primary>Crear!</Button>
      </Form>
      </Layout>
    );

  }
}

export default CampaignNew;
