import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";

class Checkout extends Component {
  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    for (let params of query.entries()) {
      ingredients[params[0]] = +params[1];
    }
    this.state = {
      ingredients: ingredients
    };
  }

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-details");
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinue={this.checkoutContinueHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
        />
        <Route
          path={this.props.match.url + "/contact-details"}
          render={props => (
            <ContactData {...props} ingredients={this.state.ingredients} />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
