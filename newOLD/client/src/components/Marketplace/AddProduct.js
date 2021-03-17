import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import * as API from "../api/apiActions";

class AddProduct extends Component {
  state = {
    product: {
      productImage: [],
      productName: "",
      productPrice: "",
      productRating: "5",
      productDescription: "",
      productCategory: "Live Stock",
      productInStock: true,
      totalItem: 1,
      dateOfListing: {},
      userId: this.props.auth.user._id,
      userName: this.props.auth.user.username,
    },
    display: true,
    featured: "",
  };
  componentDidMount() {
    this.setState({
      product: {
        ...this.state.product,
        dateOfListing: this.getDateHandler(),
      },
    });
  }

  getDateHandler = () => {
    const month = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var d = new Date();

    const myDate = {
      day: d.getDate(),
      month: month[d.getMonth()],
      year: d.getFullYear(),
    };
    return myDate;
  };
  render() {
    if (!this.props.auth.isAuth) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="add-product">
        <h1>Add Product</h1>
        <div className="row">
          <div className="col-7 product-data">
            <div className="info">
              <label>Product Information</label>
            </div>
            <div className="name">
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                onChange={this.onChangeHandler}
              />
            </div>

            <div className="category">
              <label>Category</label>
              <select
                aria-label="Default select example"
                name="productCategory"
                onChange={this.onChangeHandler}
              >
                <option selected value="Live Stock">
                  Live Stock
                </option>
                <option value="Crops">Crops</option>
                <option value="Farm Equipment">Farm Equipment</option>
                <option value="Books">Books</option>
              </select>
            </div>
            <div className="description">
              <label>Description</label>
              <textarea
                type="textarea"
                name="productDescription"
                onChange={this.onChangeHandler}
              />
            </div>

            <div className="other">
              <div className="price">
                <label>Price</label>
                <input
                  type="text"
                  name="productPrice"
                  placeholder="Set price"
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="total-item">
                <label>Total Item</label>
                <button name="minus" onClick={this.onClickHandler}>
                  -
                </button>
                <span>{this.state.product.totalItem}</span>
                <button name="plus" onClick={this.onClickHandler}>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="col-5 product-image">
            <div className="info">
              <label>Add Photo</label>
            </div>
            <div className="image-gallery">
              <div className="featured">
                {this.state.featured ? (
                  <img src={this.state.featured} alt="ih" />
                ) : null}
              </div>
              <div className="image-list">
                {this.state.product.productImage.map((image) => (
                  <img
                    onClick={() => this.setFeatured(image)}
                    type="button"
                    src={image}
                    alt={image}
                  />
                ))}
              </div>
            </div>
            <div className="input-box">
              {this.state.display ? (
                <input onChange={this.uploadImage} type="file" />
              ) : (
                <div className="wait">
                  <p>Please wait...</p>
                </div>
              )}
            </div>
            <div className="d-flex flex-row-reverse add">
              <button onClick={this.addProductHandler}>Add Product</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  onChangeHandler = (e) => {
    this.setState({
      product: {
        ...this.state.product,
        [e.target.name]: e.target.value,
      },
    });
  };

  addProductHandler = () => {
    API.addProduct(this.state.product);
  };

  setFeatured = (featured) => {
    this.setState({
      featured,
    });
  };

  uploadImage = async (e) => {
    this.setState({
      display: false,
    });
    const fd = new FormData();
    fd.append("image", e.target.files[0]);
    const { url, message } = await axios
      .post("https://my-image.herokuapp.com/upload", fd)
      .then((res) => res.data);
    if (url) {
      if (!this.state.featured) {
        this.setFeatured(url);
      }
      const productImage = this.state.product.productImage;
      productImage.push(url);
      this.setState({
        product: {
          ...this.state.product,
          productImage,
        },
      });
    } else {
      alert(message);
    }

    this.setState({
      display: true,
    });
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

export default connect(mapStateToProps)(AddProduct);
