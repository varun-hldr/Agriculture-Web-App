import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Layout from "./components";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as API from "./components/api/apiActions";

class Routing extends Component {
  async componentDidMount() {
    const { token, user, success } = await API.checkLogin();
    if (success) {
      this.props.dispatch({
        type: "AUTH_LOGIN",
        payload: { token, user },
      });
    }
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

            <Route path="/market/:name" component={Layout.Market} />
            <Route path="/add-product" component={Layout.AddProduct} />
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
