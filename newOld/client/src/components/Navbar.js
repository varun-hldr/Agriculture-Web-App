import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as IMG from "./img";

const Navbar = (props) => {
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
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/add-product">
                    Add Product
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
          <Link to="/cart" className="cart">
            <img src={IMG.cart} alt="cart" />
            {props.user.cart.length !== 0 ? (
              <span class="badge mybadge rounded-pill bg-success">
                {props.user.cart.length}
              </span>
            ) : null}
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
