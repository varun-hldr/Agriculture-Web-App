import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import * as USER from "../api/apiActions";
import * as icon from "../img";

class Login extends Component {
  state = {
    user: {},
    text: "Login to manage your account",
  };

  login = async () => {
    const { token, user, message } = await USER.login(this.state.user);
    if (user) {
      this.props.dispatch({
        type: "AUTH_LOGIN",
        payload: { token, user },
      });
    } else {
      this.setState({
        text: message,
      });
    }
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      text: "Login to manage your account",
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    if (this.props.auth.isAuth) {
      return <Redirect to="/" />;
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
              <img className="logo" src={icon.logo} alt="logo" />
              <h1>Hello,</h1>
              <h1>Welcome Back</h1>
              {/* <span className="badge bg-dark mt-4">{}</span> */}
              <div className="form-group">
                <label>{this.state.text}</label>
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
              <div className="forgot">
                <Link to="/account/reset">Forgot your password?</Link>
              </div>

              <div className="login-button">
                <button onClick={this.login} type="button">
                  Login
                </button>
              </div>

              <div className="social-login">
                <div className="line">
                  <h6>Or</h6>
                </div>

                <a href="http://localhost:3100/auth/google">
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
                  Don't have an account? <Link to="/signup">Signup</Link>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Login);
