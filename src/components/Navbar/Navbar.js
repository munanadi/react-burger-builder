import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

function Navbar() {
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  return (
    <nav className={classes.Navbar}>
      <h1>Burger Builder</h1>
      <ul className={classes.Nav}>
        <Link to="/" className={classes.Links}>
          Burger Builder
        </Link>
        {isAuthenticated ? (
          <Link to="/orders" className={classes.Links}>
            Orders
          </Link>
        ) : null}
        {isAuthenticated ? (
          <Link to="/logout" className={classes.Links}>
            Logout
          </Link>
        ) : (
          <Link to="/auth" className={classes.Links}>
            Login
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
