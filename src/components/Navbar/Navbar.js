import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={classes.Navbar}>
      <h1>Burger Builder</h1>
      <ul className={classes.Nav}>
        <Link to="/" className={classes.Links}>Burger Builder</Link>
        <Link to="/orders" className={classes.Links}>Orders</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
