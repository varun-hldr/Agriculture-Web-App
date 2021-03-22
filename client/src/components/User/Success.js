import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as IMAGE from "../img";

export default class Seccess extends Component {
  render() {
    return (
      <div className="success-message">
        <div className="image">
          <img src={IMAGE.farming} />
        </div>
        <div className="text">
          <h1>Yay!</h1>
          <p>Your profile has been successfully updated.</p>
        </div>
        <Link to="/">
          <button className="button">Home</button>
        </Link>
      </div>
    );
  }
}
