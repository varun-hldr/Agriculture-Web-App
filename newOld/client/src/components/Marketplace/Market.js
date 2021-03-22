import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as API from "../api/apiActions";

class Market extends Component {
  state = {
    products: [],
    isLoaded: false,
    name: "",
    message: "Loading...",
  };
  async componentDidMount() {
    if (
      this.props.match.params.name === "search result" &&
      this.props.user.products.isLoaded
    ) {
      if (this.props.user.products.data.length !== 0) {
        this.setState({
          products: this.props.user.products.data,
          isLoaded: true,
          name: this.props.match.params.name,
        });
      } else {
        this.setState({
          message: "Sorry! No product found",
        });
      }
    } else {
      const products = await API.getProductByCategory(
        this.props.match.params.name
      );
      if (products) {
        this.setState({
          products,
          isLoaded: true,
          name: this.props.match.params.name,
        });
      }
    }
  }

  render() {
    // console.log(this.props.user.products.isLoaded);
    return (
      <div className="market">
        <div className="market-top">
          <div className="featured d-flex justify-content-between">
            <div className="featured-products">
              <p>Featured Products</p>
            </div>
            <div className="total-products">
              {this.state.name ? (
                <p>
                  Total in {this.state.name}{" "}
                  <span>{this.state.products.length}</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="market-body">
          {this.state.isLoaded ? (
            <div className="products d-flex d-flex justify-content-evenly flex-wrap">
              {this.state.products.map((product) =>
                this.makeProductCard(product)
              )}
            </div>
          ) : (
            <h3>{this.state.message}</h3>
          )}
        </div>
      </div>
    );
  }
  makeProductCard = (productData) => {
    const {
      productImage,
      productName,
      productPrice,
      productRating,
      productDescription,
      productCategory,
      productInStock,
      totalItem,
      dateOfListing,
      userId,
      userName,
      _id,
    } = productData;
    return (
      <Link to={`/product/${_id}`} class="card">
        <img src={productImage[0]} class="card-img-top" alt="..." />
        <div class="card-body">
          <div className="card-body-top d-flex justify-content-between">
            <div className="date">
              <p>
                {dateOfListing.day} {dateOfListing.month}
              </p>
            </div>
            <div className="rating">
              <span>Rating: {productRating}/5</span>
            </div>
          </div>
          <p className="price">Rs.{productPrice}</p>
          <p className="name">{productName}</p>
          <div className="buy">
            <Link to={`/product/${_id}`}>Fast Buy</Link>
          </div>
        </div>
      </Link>
    );
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Market);
