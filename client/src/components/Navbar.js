import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as USER from "./api/apiActions";
import * as IMG from "./img";

const Navbar = (props) => {
  // const logout = async () => {
  //   await USER.logout();
  //   // if (success) {
  //   //   props.dispatch({ type: "AUTH_LOGOUT" });
  //   // }
  // };
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <Link to="/">
          <img src={IMG.logo} alt="logo" />
        </Link>

        <form className="d-flex right-nav">
          <Link to="/">
            <img src={IMG.search} alt="search" />
          </Link>

          {props.auth.isAuth ? (
            //   <Link to="/" onClick={logout}>
            //   <img src={IMG.profile} alt="cart" />

            // </Link>
            <div className="dropdown">
              <Link
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={IMG.profile} alt="cart" />
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="/">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    My Purchase
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item logout" href="/auth/logout">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">Log In</Link>
          )}
          <Link to="/">
            <img src={IMG.cart} alt="cart" />
          </Link>
        </form>
      </div>
    </nav>
  );
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Navbar);
