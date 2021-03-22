import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as USER from "./api/apiActions";

class AddUser extends Component {
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
    if (!this.props.auth.isAuth) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="main-add-user">
        <form className="add-user">
          <h2 className="text-center">Please fill the form to add user</h2>
          <span className="badge bg-dark mt-4">{this.state.text}</span>
          <div className="add-user-div">
            <label>Name:</label>
            <input type="text" name="username" onChange={this.onChange} />
          </div>
          <div className="add-user-div">
            <label>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={this.onChange}
            />
          </div>
          <div className="add-user-div">
            <label>Password:</label>
            <input
              type="password"
              id="pwd"
              name="password"
              onChange={this.onChange}
            />
          </div>
          <button
            onClick={this.register}
            type="button"
            className="add-user-button"
          >
            Add User
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AddUser);
