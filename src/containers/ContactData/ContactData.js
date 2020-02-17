import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";

import classes from "./ContactData.module.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    loading: false
  };

  handleContactFormSubmit = event => {
    //   Order the burger here. send firebase stuff.
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: 0 || this.state.totalPrice,
      customer: {
        name: "John Doe",
        email: "jhon@gmail.com"
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

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Enter Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Enter Email"
        />
        <Button buttonType={"Success"} clicked={this.handleContactFormSubmit}>
          Order
        </Button>
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

export default ContactData;
