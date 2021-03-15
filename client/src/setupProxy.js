const proxy = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(proxy("/auth/google", { target: "http://localhost:3100/" }));
//   app.use(proxy("/auth/facebook", { target: "http://localhost:3100/" }));
//   //   app.use(proxy("/api/*", { target: "http://localhost:3100/" }));
// };
module.exports = function (app) {
  // app.use(
  //   proxy("/auth/google", { target: "https://agribazzar.herokuapp.com/" })
  // );
  // app.use(
  //   proxy("/auth/facebook", { target: "https://agribazzar.herokuapp.com/" })
  // );
  // //   app.use(proxy("/*", { target: "https://agribazzar.herokuapp.com/" }));
};
