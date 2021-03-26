import React, { Component } from "react";
import Users from "./Users";
import AllProducts from "./AllProducts";

export default class adminDashboard extends Component {
  state = {
    users: true,
  };
  onChangeHandler = (users) => {
    this.setState({
      users,
    });
  };
  render() {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <button
            onClick={() => this.onChangeHandler(false)}
            className="dashboard-products"
          >
            Products
          </button>
          <button
            onClick={() => this.onChangeHandler(true)}
            className="dashboard-users"
          >
            Users
          </button>
        </div>
        {this.state.users ? <Users /> : <AllProducts />}
      </div>
    );
  }
}
