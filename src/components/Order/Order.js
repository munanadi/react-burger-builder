import React from "react";

import classes from "./Order.module.css";

const Order = props => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  let displayIngredients = ingredients.map(ig => (
    <span
      style={{
        textTransform: "capitalize",
        display: "inline",
        border: "1px solid #ccc",
        padding: "5px",
        margin: "0 8px"
      }}
      key={ig.name}
    >
      {ig.name}({ig.amount}) {"   "}
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients : {displayIngredients}</p>
      <p>
        Price <strong>Rs. {Order.price}</strong>
      </p>
    </div>
  );
};

export default Order;
