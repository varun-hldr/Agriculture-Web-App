import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as USER from "../api/apiActions";

class userDashboard extends Component {
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

  makeTable = (index, { username, role, status }) => {
    const style =
      status === "Active" ? "btn btn-dark ms-2" : "btn btn-warning ms-2";
    return (
      <tr key={index}>
        <th scope="row">{index}</th>
        <td>{username}</td>
        <td>{role}</td>
        <td>
          <button type="button" className={style}>
            {status}
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
      <table className="table text-center mt-3">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
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

export default connect(mapStateToProps)(userDashboard);
