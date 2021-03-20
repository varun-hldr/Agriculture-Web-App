import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as USER from "../api/apiActions";
import EditPopover from "../Popover/EditPopover";

class adminDashboard extends Component {
  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.getAllUser(this.props.auth.token);
    }
  }

  getAllUser = async (token) => {
    const { alluser, message } = await USER.allUser(token);
    if (alluser) {
      this.props.dispatch({ type: "ALL_USER", payload: { alluser } });
    }
  };
  setUpdateUser = async (user) => {
    const userDetails = {
      id: user.id,
      token: this.props.auth.token,
      user,
    };
    const result = await USER.updateUser(userDetails);
    if (result) {
      this.getAllUser(this.props.auth.token);
    }
  };

  setDeleteUser = async (user) => {
    const userDetails = {
      id: user._id,
      token: this.props.auth.token,
    };
    const result = await USER.deleteUser(userDetails);
    if (result) {
      this.getAllUser(this.props.auth.token);
    }
  };

  makeTable = (index, USER) => {
    const style =
      USER.status === "Active" ? "btn btn-light ms-2" : "btn btn-warning ms-2";
    return (
      <tr key={index}>
        <th scope="row">{index}</th>
        <td>{USER.username}</td>
        <td>{USER.role}</td>
        <td>
          <button type="button" className={style}>
            {USER.status}
          </button>
        </td>
        <td className="d-flex justify-content-center">
          <EditPopover USER={USER} setUpdateUser={this.setUpdateUser} />
          <button
            onClick={() => this.setDeleteUser(USER)}
            type="button"
            className="btn btn-danger ms-2"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };
  render() {
    if (!this.props.auth.isAuth) {
      return <Redirect to="/login" />;
    }
    return (
      <table className="table table-dark table-striped  text-center mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Record</th>
          </tr>
        </thead>
        {this.props.user.alluser !== null ? (
          <tbody>
            {this.props.user.alluser.map((user, index) =>
              this.makeTable(index, user)
            )}
          </tbody>
        ) : null}
      </table>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(adminDashboard);
