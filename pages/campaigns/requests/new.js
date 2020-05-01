//Importar librerías y variables
import React, {Component} from "react";
import {Form, Button, Message, Input} from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import {Link, Router} from "../../../routes";
import Layout from "../../../components/Layout";

//Creación de componente para la página
class RequestNew extends Component {
  //Inicialización de variables
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: ""
  };
  //Función que se ejecuta al llamar la página
  static async getInitialProps(props) {
    const {address} = props.query; //Obtener address de la página

    return {address};
  };
  //Creación de evento on Submit
  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address); //Obtención del proyecto específico del array
    const {description, value, recipient} = this.state;

    this.setState({ loading: true, errorMessage: ""}); //Establecer que la transacción está pendiente
    try{
      const accounts = await web3.eth.getAccounts(); //Obtención de addresses
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value),
        recipient
      ).send({from: accounts[0]}); //Llamar a la función del smart contract createRequest

      Router.pushRoute(`/campaigns/${this.props.address}/requests`); //Actualizar routing pagina
    } catch (err) {
      //Mostrar mensaje de error en caso de error en la transaccion
      this.setState({errorMessage: err.message});
    }
    this.setState({loading: false}); //Establecer transaccion como finalizada
  };

//Mostrar elementos en la pagina
  render() {
    return(
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>
            Atrás
          </a>
        </Link>
        <h3> Crear propuesta de gasto </h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Descripción</label>
            <Input
              value={this.state.description}
              onChange={event =>
                this.setState({description: event.target.value})}
            />
          </Form.Field>

          <Form.Field>
            <label>Gasto en ether</label>
            <Input
            value={this.state.value}
            onChange={event =>
              this.setState({value: event.target.value})}
            />
          </Form.Field>

          <Form.Field>
            <label>Beneficiario del gasto</label>
            <Input
              value={this.state.recipient}
              onChange={event =>
                this.setState({recipient: event.target.value})}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>Crear!</Button>
        </Form>

      </Layout>
    );
  }
}

export default RequestNew;
