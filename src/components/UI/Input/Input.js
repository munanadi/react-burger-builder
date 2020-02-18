import React from "react";
import classes from "./Input.module.css";

const Input = props => {
  let inputElement;
  switch (props.inputtype) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          onChange={props.changed}
          {...props}
        />
      );
      break;
    case "textarea":
      inputElement = <textarea {...props} onChange={props.changed} />;
      break;
    default:
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
