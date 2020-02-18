import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { purchaseBurger } from "../../store/actions/index";
import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import withError from "../../components/UI/withError/withError";

class ContactData extends Component {
  state = {
    orderForm: {
      name: "",
      email: ""
    }
  };

  handleContactFormSubmit = event => {
    //   Order the burger here. send firebase stuff.
    event.preventDefault();
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.orderForm.name,
        email: this.state.orderForm.email
      }
    };
    this.props.onOrder(order, this.props.history);
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
    if (this.props.loading) {
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
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrder: (orderData, history) =>
      dispatch(purchaseBurger(orderData, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(withRouter(ContactData), axios));
