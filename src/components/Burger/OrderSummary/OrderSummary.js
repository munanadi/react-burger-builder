import React, {  } from "react";

import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const style = {
    textAlign: "center"
  };

  return (
    <div style={style}>
      <h3>Order Details</h3>
      <p>
        Total price of <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      <ul>
        {Object.keys(props.ingredients).map(igKey => (
          <li
            style={{
              listStyle: "none"
            }}
            key={igKey}
          >
            <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
            {props.ingredients[igKey]}
          </li>
        ))}
      </ul>
      <p>Continue to Checkout?</p>
      <Button buttonType="Danger" clicked={props.cancelPurchasing}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={props.conitnuePurchasing}>
        CONTINUE
      </Button>
    </div>
  );
};

export default OrderSummary;
