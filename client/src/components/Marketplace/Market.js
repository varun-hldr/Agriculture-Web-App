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
    page: [],
    number: 8,
    length: 0,
  };

  setUsersHandler = (page, number) => {
    const start = (page - 1) * number;
    const end = page * number;
    const products = this.props.user.products.data.slice([start], [end]);
    this.setState({
      products,
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

  dispatchProducts = async () => {
    const products = await API.getProductByCategory(
      this.props.match.params.name
    );
    if (products) {
      await this.props.dispatch({
        type: "SEARCH_RESULT",
        payload: { products },
      });
    }
    return products;
  };

  async componentDidMount() {
    let products = [];
    if (this.props.match.params.name === "search result") {
      if (this.props.user.products.isLoaded) {
        products = this.props.user.products.data;
      } else {
        products = null;
      }
    } else {
      products = await this.dispatchProducts();
    }

    if (products) {
      this.setState({
        products: products.slice([0], [this.state.number]),
        isLoaded: true,
        name: this.props.match.params.name,
        page: this.makePages(products, this.state.number),
        length: products.length,
      });
    } else {
      this.setState({
        message: "Sorry! No product found",
      });
    }

    // if (
    //   this.props.match.params.name === "search result" &&
    //   this.props.user.products.isLoaded
    // ) {
    //   if (this.props.user.products.data.length !== 0) {
    //     const { data } = this.props.user.products;
    //     this.setState({
    //       products: data.slice([0], [this.state.number]),
    //       isLoaded: true,
    //       name: this.props.match.params.name,
    //       page: this.makePages(data, this.state.number),
    //       length: data.length,
    //     });
    //   } else {
    //     this.setState({
    //       message: "Sorry! No product found",
    //     });
    //   }
    // } else {
    //   const products = await API.getProductByCategory(
    //     this.props.match.params.name
    //   );
    //   if (products) {
    //     this.setState({
    //       products: products.slice([0], [this.state.number]),
    //       isLoaded: true,
    //       name: this.props.match.params.name,
    //       page: this.makePages(products, this.state.number),
    //       length: products.length,
    //     });
    //   }
    // }
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
              {this.state.name ? (
                <p>
                  Total in {this.state.name} <span>{this.state.length}</span>
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
