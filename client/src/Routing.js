import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Layout from "./components";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as API from "./components/api/apiActions";

class Routing extends Component {
  viewCart = async (id) => {
    if (this.props.auth.isAuth) {
      const cart = await API.findCartByID(id.substring(0, 10));
      if (cart.length !== 0)
        this.props.dispatch({ type: "CART", payload: { cart } });
    }
  };
  async componentDidMount() {
    const { token, user, success } = await API.checkLogin();
    if (success) {
      await this.props.dispatch({
        type: "AUTH_LOGIN",
        payload: { token, user },
      });
      await this.viewCart(user._id);
    }

    // this.setState({
    //   check,
    // });
    // if (this.props.auth.isAuth) {
    //   const cart = await API.findCartByID(
    //     this.props.auth.user._id.substring(0, 10)
    //   );
    //   if (cart) this.props.dispatch({ type: "CART", payload: { cart } });
    // }
  }
  render() {
    return (
      <div className="container main">
        <Router>
          <Layout.Navbar />
          <Switch>
            <Route exact path="/" component={Layout.Home} />
            <Route path="/adduser" component={Layout.AddUser} />
            <Route
              path="/dashboard"
              component={
                this.props.auth.user.role === "Admin"
                  ? Layout.adminDashboard
                  : Layout.userDashboard
              }
            />
            <Route path="/login" component={Layout.Login} />
            <Route path="/signup" component={Layout.Signup} />
            <Route path="/user/:id" component={Layout.Profile} />

            <Route path="/market/:name" component={Layout.Market} />
            <Route path="/add-product" component={Layout.AddProduct} />
            <Route path="/product/:name" component={Layout.ProductPage} />
            <Route path="/cart" component={Layout.Cart} />
            <Route path="/orders" component={Layout.Orders} />
            <Route path="/all-products" component={Layout.AllProducts} />

            <Route path="/support/chat" component={Layout.Chat} />
          </Switch>
        </Router>
        <Layout.Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Routing);
