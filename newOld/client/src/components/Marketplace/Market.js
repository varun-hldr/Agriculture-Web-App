import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as API from "../api/apiActions";

export default class Market extends Component {
  state = {
    products: [],
    isLoaded: false,
  };
  async componentDidMount() {
    const products = await API.getProductByCategory(
      this.props.match.params.name
    );
    if (products) {
      this.setState({ products, isLoaded: true });
    }
  }

  render() {
    return (
      <div className="market">
        <div className="market-top">
          <div className="featured d-flex justify-content-between">
            <div className="featured-products">
              <p>Featured Products</p>
            </div>
            <div className="total-products">
              <p>
                Total in {this.props.match.params.name}{" "}
                <span>{this.state.products.length}</span>
              </p>
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
            "Loading..."
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
