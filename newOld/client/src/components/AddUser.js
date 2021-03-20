import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as USER from "./api/apiActions";

export default class addUser extends Component {
  state = {
    isRegistered: false,
    user: {},
    text: "",
  };

  register = async () => {
    const { user, message } = await USER.register(this.state.user);
    if (user) {
      this.setState({
        isRegistered: true,
      });
    } else {
      this.setState({
        ...this.state,
        text: message,
      });
    }
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      text: "",
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    if (this.state.isRegistered) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <form className="login-form">
        <h2 className="text-center">Please fill the form to add user</h2>
        <span className="badge bg-dark mt-4">{this.state.text}</span>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your full name"
            name="username"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            name="password"
            onChange={this.onChange}
          />
        </div>
        <button
          onClick={this.register}
          type="button"
          className="btn btn-dark mt-3"
        >
          Add User
        </button>
      </form>
    );
  }
}
