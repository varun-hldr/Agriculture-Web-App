import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as IMAGE from "../img";

export default class SeccessMessage extends Component {
  render() {
    return (
      <div className="success-message">
        <div className="image">
          <img src={IMAGE.farming} />
        </div>
        <div className="text">
          <h1>Yay!</h1>
          <p>Your file has been uploaded.</p>
        </div>
        <button onClick={this.props.addMoreHandler} className="button">
          Add More
        </button>
      </div>
    );
  }
}
