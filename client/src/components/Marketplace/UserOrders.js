import React, { Component } from "react";
import { connect } from "react-redux";
import * as API from "../api/apiActions";
import { Redirect } from "react-router-dom";
import { Fragment } from "react";

class UserOrders extends Component {
  state = {
    orders: null,
  };
  componentDidMount() {
    if (this.props.auth.isAuth) {
      const id = this.props.auth.user._id;
      this.viewOrders(id);
      this.checkingCartValue(id);
    }
  }
  viewOrders = async (id) => {
    if (!this.state.orders) {
      const orders = await API.findOrdersByID(id.substring(0, 10));
      this.setState({
        orders,
      });
    }
  };
  checkingCartValue = async (id) => {
    const cart = await API.findCartByID(id.substring(0, 10));
    this.props.dispatch({ type: "CART", payload: { cart } });
  };
  render() {
    if (!this.props.auth.isAuth) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="order-main">
        {this.state.orders ? (
          <div className="order">
            {this.state.orders.length !== 0 ? (
              <React.Fragment>
                <div className="order-header">
                  <h1>My Orders</h1>
                  <h1>
                    Total <span>{this.state.orders.length}</span>
                  </h1>
                </div>
                <div className="order-body">
                  {this.state.orders.map((product) =>
                    this.showProductHandler(product)
                  )}
                </div>
              </React.Fragment>
            ) : (
              <h1>You have no orders</h1>
            )}
          </div>
        ) : (
          <h1>Loading... </h1>
        )}
      </div>
    );
  }
  showProductHandler = ({
    productName,
    productImage,
    productPrice,
    totalItem,
  }) => {
    return (
      <div className="order-product">
        <div className="image">
          <img src={productImage[0]} alt={productName} />
        </div>
        <div className="title">
          <p>{productName}</p>
        </div>
        <div className="order-price">
          <h1>Rs.{parseInt(productPrice) * parseInt(totalItem)}</h1>
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(UserOrders);
