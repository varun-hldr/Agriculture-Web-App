import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as IMG from "./img";
import * as API from "./api/apiActions";

class Home extends Component {
  state = {
    name: "",
    isLoaded: false,
  };
  productCard = (title, items, image) => {
    return (
      <Link to={`/market/${title}`} class="card" type="button">
        <div class="card-body">
          <p>{title}</p>

          <span>{items}</span>
        </div>
        <img src={image} class="card-img-bottom" alt={title} />
      </Link>
    );
  };
  searchHandler = async () => {
    if (this.state.name) {
      const products = await API.findProductByCategoryAndName(this.state.name);
      this.props.dispatch({ type: "SEARCH_RESULT", payload: { products } });
      this.setState({
        isLoaded: true,
      });
    }
  };
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    if (this.state.isLoaded) {
      return <Redirect to="/market/search result" />;
    }
    return (
      <div className="home">
        <div
          className="hero-sec"
          style={{ backgroundImage: `url(${IMG.heroBackground})` }}
        >
          <div className="hero-box">
            <div className="hero-text">
              <h1>Agriculture Business In India</h1>
              <p>More than 14,000 products</p>
            </div>
            <div className="hero-search">
              <input
                onChange={this.onChangeHandler}
                placeholder="What are you looking for?"
                name="name"
              />
              <button onClick={this.searchHandler}>
                Find <img src={IMG.wSearch} />
              </button>
            </div>
          </div>
        </div>
        <div className="home-top">
          <div class="outer-border">
            <div class="inner-border">
              <div className="hero-cards">
                {this.productCard("Live Stock", "50 Items", IMG.liveStock)}
                {this.productCard("Crops", "240 Items", IMG.crops)}
                {this.productCard(
                  "Farm Equipment",
                  "290 Items",
                  IMG.farmEquipment
                )}
                {this.productCard("Books", "50 Items", IMG.books)}
              </div>
            </div>
          </div>
        </div>
        <div className="home-bottom">
          <div className="row">
            <div className="col-5 myCol">
              <div className="latest-text">
                <h1>Latest Announcement</h1>
                <p>Buy the best products from verified suppliers</p>
              </div>
              <div className="latest-arrow">
                <Link>
                  <img className="left" src={IMG.larrow} alt="arrow" />
                </Link>
                <Link>
                  <img className="right" src={IMG.arrow} alt="arrow" />
                </Link>
              </div>
              <div className="show-all">
                <button>Show All</button>
              </div>
            </div>
            <div className="col-7 myCol">
              <div className="card-box">
                {this.announcementCard(
                  "5 Feb 2020",
                  "250pcs",
                  "We Buy Barley",
                  IMG.product1,
                  "Nirobi Hughes",
                  "6538927642"
                )}
                <div className="card-pagination d-flex justify-content-center">
                  <button>.</button>
                  <button>.</button>
                  <button>.</button>
                  <button>.</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  announcementCard = (date, items, title, image, vendor, number) => {
    return (
      <div
        class="announcement-card"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="card-heading d-flex justify-content-between">
          <span>{date}</span>
          <span>{items}</span>
        </div>
        <h1>{title}</h1>
        <div className="card-bottom">
          <p>{vendor}</p>
          <p>Phone: +91-{number}</p>
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);
