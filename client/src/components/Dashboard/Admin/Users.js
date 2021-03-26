import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as USER from "../../api/apiActions";
import EditPopover from "../../Popover/EditPopover";
import DeleteIcon from "@material-ui/icons/Delete";

class Users extends Component {
  state = {
    users: null,
    page: [],
    number: 9,
  };
  componentDidMount() {
    if (this.props.auth.isAuth) {
      this.getAllUser(this.props.auth.token);
    }
  }
  setUsersHandler = (page, number) => {
    const start = (page - 1) * number;
    const end = page * number;
    const users = this.props.user.alluser.slice([start], [end]);
    this.setState({
      users,
    });
  };

  makePages = (alluser, number) => {
    function isInt(n) {
      return n % 1 === 0;
    }
    const page = [];
    let length = 0;
    if (isInt(alluser.length / number)) {
      length = alluser.length / number;
    } else {
      length = alluser.length / number + 1;
    }
    for (var i = 1; i <= length; i++) {
      page.push(i);
    }
    return page;
  };

  getAllUser = async (token) => {
    const { alluser, message } = await USER.allUser(token);
    if (alluser) {
      this.props.dispatch({ type: "ALL_USER", payload: { alluser } });

      this.setState({
        users: alluser.slice([0], [9]),
        page: this.makePages(alluser, this.state.number),
      });
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
      USER.status === "Active" ? "btn btn-dark ms-2" : "btn btn-warning ms-2";
    return (
      <tr key={index}>
        {/* <th scope="row">{index}</th> */}
        <td>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/user/${USER._id}`}
          >
            {USER.username}
          </Link>
        </td>
        <td>{USER.role}</td>
        <td>
          <button type="button" className={style}>
            {USER.status}
          </button>
        </td>
        <td className="d-flex justify-content-evenly">
          <EditPopover USER={USER} setUpdateUser={this.setUpdateUser} />
          <button
            onClick={() => this.setDeleteUser(USER)}
            type="button"
            className="btn btn-danger ms-2"
          >
            <DeleteIcon />
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
      <React.Fragment>
        {this.state.users !== null ? (
          <React.Fragment>
            <table className="table text-center table-borderless">
              <thead className="table-dark">
                <tr>
                  {/* <th scope="col">#</th> */}
                  <th scope="col">Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th scope="col">Manage</th>
                </tr>
              </thead>

              <tbody>
                {this.state.users.map((user, index) =>
                  this.makeTable(index, user)
                )}
              </tbody>
            </table>
            <div className="pagination">
              {this.state.page.map((page) => (
                <button
                  onClick={() => this.setUsersHandler(page, this.state.number)}
                  className="page"
                >
                  {page}
                </button>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <h3>Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Users);
