import React, { Component } from "react";
import * as API from "../../api/apiActions";
import DeleteIcon from "@material-ui/icons/Delete";

export default class AllProducts extends Component {
  state = {
    collection: [],
    products: [],
    isLoaded: false,
    page: [],
    number: 6,
  };
  async componentDidMount() {
    const collection = await API.getAllProducts();
    if (collection.length !== 0) {
      this.setCollectionHandler(collection);
    }
  }

  setCollectionHandler = (collection) => {
    this.setState({
      collection,
      isLoaded: true,
      products: collection.slice([0], [this.state.number]),
      page: this.makePages(collection, this.state.number),
    });
  };
  setProductHandler = (page, number) => {
    const start = (page - 1) * number;
    const end = page * number;
    const products = this.state.collection.slice([start], [end]);
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

  deleteProductHandler = async (id) => {
    const result = await API.deleteProductById(id);
    if (result) {
      const collection = await API.getAllProducts();
      if (collection.length !== 0) {
        this.setCollectionHandler(collection);
      }
    }
  };

  render() {
    return (
      <div className="all-products">
        {this.state.isLoaded ? (
          this.state.products.map((product) => this.showProductHandler(product))
        ) : (
          <h1>Loading...</h1>
        )}
        <div className="pagination">
          {this.state.page.map((page) => (
            <button
              onClick={() => this.setProductHandler(page, this.state.number)}
              className="page"
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    );
  }

  showProductHandler = ({
    productName,
    productImage,
    productPrice,
    totalItem,
    _id,
  }) => {
    return (
      <div className="order-product">
        <div className="image">
          <img src={productImage[0]} alt={productName} />
        </div>
        <div className="title">
          <p>{productName}</p>
        </div>
        <button
          onClick={() => this.deleteProductHandler(_id)}
          type="button"
          className="delete-btn"
        >
          <DeleteIcon />
        </button>
      </div>
    );
  };
}
