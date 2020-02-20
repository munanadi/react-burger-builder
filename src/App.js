import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { checkAuthStatus } from "./store/actions/auth";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import Lazyloader from "./components/Lazyloader/Lazyloader";

const asyncAuth = Lazyloader(() => import("./containers/Auth/Auth"));
const asyncOrders = Lazyloader(() => import("./containers/Orders/Orders"));
const asyncCheckout = Lazyloader(() =>
  import("./containers/Checkout/Checkout")
);

class App extends Component {
  componentDidMount() {
    this.props.autoTryAuthentication();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" exact component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoTryAuthentication: () => dispatch(checkAuthStatus())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
