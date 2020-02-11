import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false //checks if order now button is clicked to show modal Order Summary
  };

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
    console.log("Continue purchasing the burger");
  };

  render() {
    //   Check what ingredients are less than or is zero
    const disabledInfo = { ...this.state.ingredients };
    for (let ingredientName in disabledInfo) {
      disabledInfo[ingredientName] = disabledInfo[ingredientName] <= 0;
    }

    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <Modal show={this.state.purchasing} modalClosed={this.cancelPurchasing}>
          <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            cancelPurchasing={this.cancelPurchasing}
            conitnuePurchasing={this.conitnuePurchasing}
          />
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

export default BurgerBuilder;
