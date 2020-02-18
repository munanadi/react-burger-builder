import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  initIngredients
} from "../../store/actions/index";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withError from "../../components/UI/withError/withError";

import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false //checks if order now button is clicked to show modal for Order Summary
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  udpatePurchasableState = ingredients => {
    // find if any ingredients are present at all
    const quantity = Object.keys(ingredients)
      .map(ele => ingredients[ele])
      .reduce((sum, curr) => sum + curr, 0);
    return quantity > 0;
  };

  updatePurchasing = () => {
    this.setState({ purchasing: true });
  };

  // Do not continue with the purchase of the burger.
  cancelPurchasing = () => {
    this.setState({ purchasing: false });
  };

  // Continue with our order and check out
  conitnuePurchasing = () => {
    // just navigate to /checkout but use redux to store ingredients
    this.props.history.push("/checkout");
  };

  render() {
    //   Check what ingredients are less than or is zero
    const disabledInfo = { ...this.state.ingredients };
    for (let ingredientName in disabledInfo) {
      disabledInfo[ingredientName] = disabledInfo[ingredientName] <= 0;
    }

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.cancelPurchasing}>
          {!this.state.loading && this.props.ingredients ? (
            <OrderSummary
              ingredients={this.props.ingredients}
              totalPrice={this.props.totalPrice}
              cancelPurchasing={this.cancelPurchasing}
              conitnuePurchasing={this.conitnuePurchasing}
            />
          ) : (
            <Spinner />
          )}
        </Modal>
        {/* Check if the ingredients are present before showing the burger */}
        {this.props.ingredients ? (
          <>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              ingredientAdd={this.props.addIngredient}
              removeIngredient={this.props.removeIngredient}
              disabledInfo={disabledInfo}
              price={this.props.totalPrice}
              purchasable={
                this.props.ingredients
                  ? this.udpatePurchasableState(this.props.ingredients)
                  : false
              }
              updatePurchasing={this.updatePurchasing}
            />
          </>
        ) : (
          <h2 style={{ textAlign: "center" }}>
            Something went wrong fetching the initial Ingredients
          </h2>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: igName => dispatch(addIngredient(igName)),
    removeIngredient: igName => dispatch(removeIngredient(igName)),
    onInitIngredients: () => dispatch(initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(BurgerBuilder, axios));
