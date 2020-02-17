import React, { Component } from "react";
import Order from "../../components/Order/Order";
import withError from "../../components/UI/withError/withError";
import axios from "../../axios-orders";

class Orders extends Component {
  state = {
    loading: true,
    orders: []
  };

  componentDidMount() {
    // get orders as the page load
    axios
      .get("/orders.json")
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => this.setState({ loading: false }));
  }

  render() {
    return (
      <div style={{ marginTop: "100px" }}>
        {this.state.orders.map(order => {
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
}

export default withError(Orders, axios);
