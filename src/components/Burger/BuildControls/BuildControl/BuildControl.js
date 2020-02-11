import React from "react";

import classes from "./BuildControl.module.css";

const BuildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Remove}
        onClick={props.removeIngredient}
        disabled={props.disabled}
      >
        Remove
      </button>
      <button className={classes.Add} onClick={props.ingredientAdd}>
        Add
      </button>
    </div>
  );
};

export default BuildControl;
