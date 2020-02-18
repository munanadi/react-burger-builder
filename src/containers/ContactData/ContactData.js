import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: "",
      email: ""
    },
    loading: false
  };

  handleContactFormSubmit = event => {
    //   Order the burger here. send firebase stuff.
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.orderForm.name,
        email: this.state.orderForm.email
      }
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        // Order goes through - close the modal and stop the loading spinner
        this.setState({ loading: false, purchasing: false });
        this.props.history.push("/");
      })
      .catch(err => {
        // Something went wrong
        this.setState({ loading: false, purchasing: false });
      });
  };

  inputChangeHandler = event => {
    const udpatedForm = { ...this.state.orderForm };
    udpatedForm[event.target.name] = event.target.value;
    this.setState({
      orderForm: udpatedForm
    });
  };

  render() {
    let form = (
      <form onSubmit={this.handleContactFormSubmit}>
        <Input
          inputtype="input"
          type="text"
          label="Name"
          name="name"
          placeholder="Enter Name"
          required
          changed={event => this.inputChangeHandler(event)}
        />
        <Input
          inputtype="input"
          type="email"
          label="Email"
          name="email"
          required
          placeholder="Enter Email"
          changed={event => this.inputChangeHandler(event)}
        />
        <Button buttonType={"Success"}>Order</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Contact Details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps)(ContactData);
