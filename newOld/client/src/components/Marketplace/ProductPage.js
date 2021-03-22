import React, { Component } from "react";
import * as API from "../api/apiActions";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as IMAGE from "../img";

class ProductPage extends Component {
  state = {
    featured: "",
    product: {},
    isLoaded: false,
    cart: {
      added: false,
    },
  };
  async componentDidMount() {
    const { name } = this.props.match.params;
    if (this.props.auth.isAuth) {
      let product = await API.getProductById(name);
      if (product) {
        delete product._id;
        this.setState({
          product: {
            ...product,
            totalItem: 1,
            cartId: this.props.auth.user._id.substring(0, 10),
          },
          featured: product.productImage[0],
          isLoaded: true,
        });
      }
    }
  }

  render() {
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
    } = this.state.product;

    if (!this.props.auth.isAuth) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="product-page">
        {this.state.isLoaded ? (
          <div className="product">
            <p className="breadcum">
              <Link to="/">Agribazzar</Link>
              {"->"}
              <Link to={`/market/${productCategory}`}>{productCategory}</Link>
              {"->"}

              <Link className="active">{productName}</Link>
            </p>
            <div className="row">
              <div className="col-7 image-col">
                <div className="image-gallery">
                  <div className="myrow">
                    <div className="mycol-10">
                      <div className="featured">
                        <img src={this.state.featured} alt="ih" />
                      </div>
                    </div>
                    <div className="mycol-2">
                      <div className="image-list">
                        {productImage.map((image) => (
                          <img
                            type="button"
                            src={image}
                            alt={productName}
                            onClick={() => this.setFeatured(image)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-5 data-col">
                <div className="top">
                  <p className="date">
                    {dateOfListing.day +
                      "    " +
                      dateOfListing.month +
                      "    " +
                      dateOfListing.year}
                  </p>
                  <p>{userName}</p>
                  <p>
                    <span>Rating: 5/{productRating}</span>
                  </p>
                </div>
                <div className="middle">
                  <span>{productCategory}</span>
                  <p>{productName}</p>
                </div>
                <div className="end">
                  <div className="items">
                    <div className="total-item">
                      <button name="minus" onClick={this.onClickHandler}>
                        -
                      </button>
                      <span>{this.state.product.totalItem}</span>
                      <button name="plus" onClick={this.onClickHandler}>
                        +
                      </button>
                    </div>
                    <h1>Rs.{productPrice}</h1>
                  </div>
                  <div className="buy">
                    {this.state.cart.added ? (
                      <Link className="view-cart" to="/cart">
                        <button>View Cart</button>
                      </Link>
                    ) : (
                      <button onClick={this.addProductOnCartHandler}>
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="product-description">
              <div className="product-nav">
                <a className="active">Description</a>
                <a>Characterstics</a>
                <a>Experts</a>
              </div>
              <div className="main-row">
                <div className="half-width image">
                  <img src={productImage[1]} alt={productName} />
                </div>
                <div className="half-width description">
                  <div className="desc">
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                  </div>
                  <div className="posted-by">
                    <h1>Posted by</h1>
                    <div className="farmer-details">
                      <img src={IMAGE.farmerProfile} alt="farmer-profile" />
                      <div className="farmer-name">
                        <p>{userName}</p>
                        <span>Rating 10/8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }

  setFeatured = (featured) => {
    this.setState({
      featured,
    });
  };

  addProductOnCartHandler = async () => {
    const message = await API.addProductOnCart(this.state.product);
    this.setState({
      cart: {
        added: true,
        message,
      },
    });
    let cart = await API.findCartByID(this.state.product.cartId);
    console.log(cart);
    this.props.dispatch({ type: "CART", payload: { cart } });
  };

  onClickHandler = (e) => {
    if (e.target.name === "plus") {
      this.setState({
        product: {
          ...this.state.product,
          totalItem: this.state.product.totalItem + 1,
        },
      });
    } else {
      if (this.state.product.totalItem > 1) {
        this.setState({
          product: {
            ...this.state.product,
            totalItem: this.state.product.totalItem - 1,
          },
        });
      }
    }
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ProductPage);
