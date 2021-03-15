import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as USER from "../api/apiActions";
import * as icon from "../img";

export default class Signup extends Component {
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
      return <Redirect to="/login" />;
    }
    return (
      <div className="login-page">
        <div
          className="row"
          style={{ backgroundImage: `url(${icon.loginBack})` }}
        >
          <div className="col-6 login-col hide-div"></div>
          <div className="col-6 login-col">
            <form className="login-form">
              {/* <form className="login-form">
                <h2 className="text-center">Looks like you're new here!</h2>
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
                <div>
                  <label>
                    Existing User <Link to="/login">Login</Link>
                  </label>
                </div>
                <button
                  onClick={this.register}
                  type="button"
                  className="btn btn-dark mt-3"
                >
                  Signup
                </button>
              </form> */}
              {/* Login */}
              <img className="logo" src={icon.logo} alt="logo" />

              <h1>Create an account</h1>

              <div className="form-group">
                <label>{this.state.text}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="username"
                  onChange={this.onChange}
                />
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  name="email"
                  onChange={this.onChange}
                />

                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Password"
                  name="password"
                  onChange={this.onChange}
                />
              </div>

              <div className="login-button">
                <button onClick={this.register} type="button">
                  Signup
                </button>
              </div>

              <div className="social-login">
                <div className="line">
                  <h6>Or</h6>
                </div>
                <a href="/auth/google">
                  <img
                    src={icon.google}
                    className="img-thumbnail"
                    alt="google"
                  />
                </a>
                <a href="/auth/facebook">
                  <img
                    src={icon.facebook}
                    className="img-thumbnail"
                    alt="facebook"
                  />
                </a>
              </div>
              <div className="checkbox">
                <label>
                  Don't have an account? <Link to="/login">Sign In</Link>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
