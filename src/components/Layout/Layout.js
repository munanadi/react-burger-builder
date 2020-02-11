import React from "react";

import Navbar from "../Navbar/Navbar";

import classes from "./Layout.module.css";

const Layout = props => (
  <React.Fragment>
    <Navbar />
    <main className={classes.Content}>{props.children}</main>
  </React.Fragment>
);

export default Layout;
