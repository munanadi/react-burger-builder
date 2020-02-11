import React from "react";

import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

const Modal = ({ children, show, modalClosed }) =>
  show ? (
    <>
      <Backdrop show={show} clicked={modalClosed}/>
      <div className={classes.Modal}>{children}</div>)
    </>
  ) : null;

export default Modal;
