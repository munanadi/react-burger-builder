import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withError from "../../components/UI/withError/withError";

import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false, //checks if order now button is clicked to show modal for Order Summary
    loading: false,
    error: null // Check if the initial ingredients were fetched correctly
  };

  componentDidMount() {
    // Fetch the ingredients from /ingredients.json and setup
    axios
      .get("ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  udpatePurchasableState = ingredients => {
    // find if any ingredients are present at all
    const quantity = Object.keys(ingredients)
      .map(ele => ingredients[ele])
      .reduce((sum, curr) => sum + curr, 0);
    this.setState({ purchasable: quantity > 0 });
  };

  addIngredient = type => {
    const oldIngredientCount = this.state.ingredients[type];
    const updatedCount = oldIngredientCount + 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredient,
      totalPrice: newPrice
    });
    this.udpatePurchasableState(updatedIngredient);
  };

  removeIngredient = type => {
    const oldIngredientCount = this.state.ingredients[type];
    // No ingredients present so dont remove
    if (!oldIngredientCount) {
      return;
    }
    const updatedCount = oldIngredientCount - 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredient,
      totalPrice: newPrice
    });
    this.udpatePurchasableState(updatedIngredient);
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
    //  show the contact form to fill data
    // encode all the ingredients in the search parameters
    let params = [];
    for (let i in this.state.ingredients) {
      params.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    const queryString = params.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    //   Check what ingredients are less than or is zero
    const disabledInfo = { ...this.state.ingredients };
    for (let ingredientName in disabledInfo) {
      disabledInfo[ingredientName] = disabledInfo[ingredientName] <= 0;
    }

    return (
      <React.Fragment>
        {/* Check if the ingredients are present before showing the burger */}
        {this.state.ingredients ? (
          <Burger ingredients={this.state.ingredients} />
        ) : (
          <h2 style={{ textAlign: "center" }}>
            Something went wrong fetching the initial Ingredients
          </h2>
        )}
        <Modal show={this.state.purchasing} modalClosed={this.cancelPurchasing}>
          {!this.state.loading && this.state.ingredients ? (
            <OrderSummary
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              cancelPurchasing={this.cancelPurchasing}
              conitnuePurchasing={this.conitnuePurchasing}
            />
          ) : (
            <Spinner />
          )}
        </Modal>
        <BuildControls
          ingredientAdd={this.addIngredient}
          removeIngredient={this.removeIngredient}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          updatePurchasing={this.updatePurchasing}
        />
      </React.Fragment>
    );
  }
}

export default withError(BurgerBuilder, axios);
