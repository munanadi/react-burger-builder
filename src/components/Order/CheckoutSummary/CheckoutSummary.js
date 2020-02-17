import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const CheckoutSummary = props => {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: "100%", margin: " auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button buttonType="Success" clicked={props.checkoutContinue}>
        Continue?
      </Button>
      <Button buttonType="Danger" clicked={props.checkoutCancelled}>
        Cancel
      </Button>
    </div>
  );
};

export default CheckoutSummary;
