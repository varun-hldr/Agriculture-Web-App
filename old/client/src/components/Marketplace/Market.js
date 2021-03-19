import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Market extends Component {
  state = {
    product: {
      productImage: [
        "https://i.imgur.com/vBi7Z5j.jpg",
        "https://i.imgur.com/ETUTDk4.jpg",
        "https://i.imgur.com/fHlXjni.jpg",
      ],
      productName: "Mahindra Jivo 245 DI 4WD, 24 hp Tractor, 750 kg",
      productPrice: "3.2 Lakhs",
      productRating: 5,
      productDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      productCategory: "Farm Equipment",
      productInStock: true,
      totalItem: 7,
      dateOfListing: { day: "15", month: "Aug", year: "2020" },
      userId: "76578648565",
      userName: "Varun",
    },
  };
  render() {
    const data = [
      this.state.product,
      this.state.product,
      this.state.product,
      this.state.product,
      this.state.product,
      this.state.product,
    ];
    return (
      <div className="market">
        <div className="market-top">
          <div className="featured d-flex justify-content-between">
            <div className="featured-products">
              <p>Featured Products</p>
            </div>
            <div className="total-products">
              <p>
                Total in Farm Eqipment <span>12,400</span>
              </p>
            </div>
          </div>
        </div>
        <div className="market-body">
          <div className="products d-flex d-flex justify-content-evenly flex-wrap">
            {data.map((product) => this.makeProductCard(product))}
          </div>
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
    } = productData;
    return (
      <div class="card">
        <img src={productImage[2]} class="card-img-top" alt="..." />
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
            <Link>Fast Buy</Link>
          </div>
        </div>
      </div>
    );
  };
}
