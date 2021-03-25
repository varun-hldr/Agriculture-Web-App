import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as API from "../api/apiActions";

class Cart extends Component {
  state = {
    products: [],
    totalPrice: 0,
    isLoaded: false,
    check: false,
  };

  // Razorpay Payment Integration
  openPopup = async (e) => {
    e.preventDefault();

    if (this.props.auth.isAuth) {
      const { products, totalPrice } = this.state;
      const id = this.props.auth.user._id.substring(0, 10);
      // create order
      const { amount, id: order_id, currency, error } = await API.createOrder(
        totalPrice
      );
      if (error) {
        alert(error.description);
      } else {
        // Getting the order details back
        var options = {
          key: "rzp_test_xk1pmd7sXsGx3L",
          amount: amount.toString(),
          currency: currency,
          name: "Agribazzar",
          description: "Test Transaction",
          order_id: order_id,
          theme: {
            color: "#3399cc",
          },
          handler: async (response) => {
            const orderData = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            const data = { orderData, products, id };
            const { error, msg, orderId, paymentId } = await API.onOrderSuccess(
              data
            );
            if (error) {
              alert(error);
            } else {
              this.setCheckHandler(true);
            }
          },
          prefill: {
            name: "Varun",
            email: "varun@agribazzar.com",
            contact: "9999999999",
          },
          notes: {
            address: "Agribazzar Corporate Office",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      }
    }
  };

  setCheckHandler = (check) => {
    this.setState({
      check,
    });
  };

  setTotalPrice = (cart) => {
    let totalPrice = 0;
    cart.map((product) => {
      totalPrice =
        parseInt(product.productPrice) * parseInt(product.totalItem) +
        totalPrice;
    });
    return totalPrice;
  };

  viewCart = async (id) => {
    const cart = await API.findCartByID(id.substring(0, 10));
    if (cart.length !== 0) {
      this.props.dispatch({ type: "CART", payload: { cart } });
      this.setState({
        products: this.props.user.cart,
      });
      const totalPrice = this.setTotalPrice(cart);
      this.setState({
        totalPrice,
      });
    }
    this.setState({
      isLoaded: true,
    });
  };

  async componentDidMount() {
    if (this.props.auth.isAuth) {
      await this.viewCart(this.props.auth.user._id);
    }
  }

  render() {
    if (!this.props.auth.isAuth) {
      return <Redirect to="/login" />;
    }
    if (this.state.check) {
      return <Redirect to="/orders" />;
    }
    return (
      <div className="shopping-cart">
        <div className="cart-top">
          <h1>Shopping Cart</h1>
        </div>
        {this.state.isLoaded ? (
          <div className="cart-body">
            {this.state.products.length !== 0 ? (
              this.state.products.map((product) =>
                this.showProductHandler(product)
              )
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="cart-footer">
          <div className="product-total">
            <div className="total-price">
              <p>Total</p>
              <h1>Rs.{this.state.totalPrice}</h1>
            </div>
            <button
              id="rzp-button1"
              onClick={(e) => this.openPopup(e)}
              className="place-order"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    );
  }

  removeProductFromCart = async (id) => {
    let products = this.state.products;
    products.map((product) => {
      if (product._id === id) {
        const index = products.indexOf(product);
        products.splice(index, 1);
      }
    });

    this.props.dispatch({ type: "CART", payload: { cart: products } });
    this.setState({
      products,
    });
    const message = await API.deleteProductFromCart(id);
  };

  showProductHandler = ({
    productName,
    productImage,
    productPrice,
    totalItem,
    _id,
  }) => {
    return (
      <div className="cart-product">
        <img src={productImage[0]} alt={productName} />
        <p>{productName}</p>
        <div className="set-item">
          <button name="minus" onClick={(e) => this.onClickHandler(e, _id)}>
            -
          </button>
          <span>{totalItem}</span>
          <button name="plus" onClick={(e) => this.onClickHandler(e, _id)}>
            +
          </button>
        </div>
        <div className="product-price">
          <button
            onClick={() => this.removeProductFromCart(_id)}
            className="remove-product"
          >
            X
          </button>
          <h1>Rs.{parseInt(productPrice) * parseInt(totalItem)}</h1>
        </div>
      </div>
    );
  };
  onClickHandler = (e, _id) => {
    let products = this.state.products;
    if (e.target.name === "plus") {
      products.map((product) => {
        if (product._id === _id) {
          const index = products.indexOf(product);
          products[index] = { ...product, totalItem: product.totalItem + 1 };
        }
      });
    } else {
      products.map((product) => {
        if (product._id === _id) {
          const index = products.indexOf(product);
          if (products[index].totalItem > 1) {
            products[index] = { ...product, totalItem: product.totalItem - 1 };
          }
        }
      });
    }
    const totalPrice = this.setTotalPrice(products);
    this.setState({
      products,
      totalPrice,
    });
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Cart);
