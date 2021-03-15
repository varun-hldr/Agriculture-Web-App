const proxy = require("http-proxy-middleware");

const target = "https://agribazzar.herokuapp.com/";
// const target = "http://localhost:3100/";

module.exports = function (app) {
  app.use(proxy("/auth/google", { target: target }));
  app.use(proxy("/auth/facebook", { target: target }));
  //   app.use(proxy("/api/*", { target: "http://localhost:3100/" }));
};
