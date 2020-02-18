import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../ContactData/ContactData";

class Checkout extends Component {
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
          ingredients={this.props.ingredients}
          checkoutContinue={this.checkoutContinueHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
        />
        <Route
          path={this.props.match.url + "/contact-details"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
