const { createProxyMiddleware } = require("http-proxy-middleware");

// const target = "https://agribazzar.herokuapp.com/";
const target = "http://localhost:3100/";

module.exports = function (app) {
  // app.use(
  //   "/auth/google",
  //   createProxyMiddleware({
  //     target: target,
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   "/auth/facebook",
  //   createProxyMiddleware({
  //     target: target,
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   "/auth/logout",
  //   createProxyMiddleware({
  //     target: target,
  //     changeOrigin: true,
  //   })
  // );
};
