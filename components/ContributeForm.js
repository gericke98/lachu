//Importacion de librerias y variables
import React, {Component} from "react";
import {Form, Input, Message, Button} from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import {Router} from "../routes";

//Creación de componente
class ContributeForm extends Component {
//Inicialización de variables
  state = {
    value: "",
    errorMessage: "",
    loading: false
  };

//Creación de evento
  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address); //Obtención de proyecto específico
    this.setState({loading: true, errorMessage: ""});
    try{
      const accounts = await web3.eth.getAccounts();
      //Llamar a la función contribuir dentro del smart contract
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether") //Cambio de ether a wei porque el input esta en ether
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`)//Para hacer el refresh
    } catch (err) {
      //En caso de error
      this.setState({errorMessage: err.message});
    }
    this.setState({loading: false, value: ""});
  };
//Mostrar en la página
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>¿Cuánto quiere invertir?</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
            label= "ether"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header= "Ooops" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Invertir!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
