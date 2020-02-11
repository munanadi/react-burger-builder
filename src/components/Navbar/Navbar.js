import React from "react";

import classes from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={classes.Navbar}>
      <h1>Burger Builder</h1>
      <ul>
        <li>Burger Builder</li>
        <li>Checkout</li>
      </ul>
    </nav>
  );
}

export default Navbar;
