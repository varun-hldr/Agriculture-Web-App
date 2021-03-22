import React, { Component } from "react";
import { connect } from "react-redux";
import * as API from "../api/apiActions";
import Success from "./Success";

class Profile extends Component {
  state = {
    isLoaded: false,
    change: false,
    user: {},
    updatedUser: {},
    error: false,
    message: "",
    updated: false,
  };
  async componentDidMount() {
    const user = await API.getUserById(this.props.match.params.id);
    this.setState({
      user,
      isLoaded: true,
    });
  }
  render() {
    return (
      <div className="profile">
        {this.state.isLoaded ? (
          <div className="profile-body">
            {this.state.updated ? (
              <Success />
            ) : (
              <React.Fragment>
                {this.state.change
                  ? this.changeUserData(this.state.user)
                  : this.viewUserData(this.state.user)}
              </React.Fragment>
            )}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
  viewUserData = ({ username, email, role, status }) => {
    return (
      <React.Fragment>
        <div className="username">
          <span>Username</span>
          <h5>{username}</h5>
        </div>
        <div className="email">
          <span>Email Address</span>
          <h5>{email}</h5>
        </div>
        <div className="role">
          <span>Role</span>
          <h5>{role}</h5>
        </div>
        <div className="status">
          <span>Vendor Status</span>
          <h5>{status}</h5>
        </div>
        <div className="change-profile">
          <button
            onClick={() => {
              this.setState({ change: true });
            }}
          >
            Change Data
          </button>
        </div>
      </React.Fragment>
    );
  };
  changeUserData = ({ username, email, role, status }) => {
    return (
      <React.Fragment>
        <div className="username">
          <span>Username</span>
          <input
            onChange={this.onChangeHandler}
            name="username"
            placeholder={username}
          />
        </div>
        <div className="email">
          <span>Email Address</span>
          <input name="email" value={email} disabled />
        </div>
        <div className="role">
          <span>Role</span>
          <input name="role" value={role} disabled />
        </div>
        <div className="status">
          <span>Vendor Status</span>
          <input name="status" value={status} disabled />
        </div>
        <div className="password">
          {this.state.error ? (
            <span style={{ color: "red" }}>{this.state.message}</span>
          ) : (
            <span>Password</span>
          )}

          <input onChange={this.onChangeHandler} name="password" />
        </div>
        <div className="confirm-password">
          <span>Confirm Password</span>
          <input onChange={this.onChangeHandler} name="confirmPassword" />
        </div>
        <div className="update-profile">
          <button onClick={this.onClickHandler}>Update Profile</button>
        </div>
      </React.Fragment>
    );
  };
  onChangeHandler = (e) => {
    this.setState({
      error: false,
      updatedUser: {
        ...this.state.updatedUser,
        [e.target.name]: e.target.value,
      },
    });
  };
  onClickHandler = async () => {
    const id = this.props.match.params.id;
    const token = this.props.auth.token;
    const { username, password, confirmPassword } = this.state.updatedUser;
    if (this.state.updatedUser) {
      if (password.length > 4) {
        if (password === confirmPassword) {
          const user = { username, password };
          const data = await API.updateUser({ id, user, token });
          if (data) {
            this.setState({
              updated: true,
            });
          }
        } else {
          this.setState({
            error: true,
            message: "Password do not match",
          });
        }
      } else {
        this.setState({
          error: true,
          message: "password length must be at least 5 characters long",
        });
      }
    }
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Profile);
