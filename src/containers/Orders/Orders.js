import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import withError from "../../components/UI/withError/withError";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import { fetchOrders } from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    if (this.props.token)
      this.props.fetchOrders(this.props.token, this.props.userId);
  }

  render() {
    if (!this.props.token) return <Redirect to="/" />;
    let display = (
      <div style={{ marginTop: "100px" }}>
        <Spinner />
      </div>
    );
    if (!this.props.loading) {
      display = (
        <div style={{ marginTop: "100px" }}>
          {this.props.orders.map(order => {
            return (
              <Order
                key={order.id}
                price={order.price}
                ingredients={order.ingredients}
              />
            );
          })}
        </div>
      );
    }
    return display;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Orders, axios));
