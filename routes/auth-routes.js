const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

// Validate User Functions
const { loginValidation, registerValidation } = require("../validation");

module.exports = (router) => {
  // Auth Register
  router.post("/auth/register", registerValidation, async (req, res) => {
    res.json({ user: req.user });
  });

  // when login is successful, retrieve user info
  router.get("/auth/login/success", (req, res) => {
    if (req.user) {
      //   Create and assign a token
      const token = jwt.sign({ user: req.user }, keys.token.TOKEN_SECRET);
      const user = {
        token: token,
        user: req.user,
        success: true,
      };
      res.send(user);
    } else {
      res.send({ success: false });
    }
  });

  // when login failed, send failed msg
  router.get("/auth/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
    });
  });

  // When logout, redirect to client
  router.get("/auth/logout", (req, res) => {
    req.logout();
    // res.json({
    //   success: true,
    // });
    res.redirect("/");
  });

  // Auth Login with Passport Local
  router.post(
    "/auth/login",
    loginValidation,
    passport.authenticate("local"),
    (req, res) => {
      const user = {
        token: req.token,
        user: req.user,
      };
      res.send(user);
    }
  );

  // AUTH WITH GOOGLE
  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  // callback route for google to redirect to
  router.get(
    "/auth/google/redirect",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect(keys.CLIENT_HOME_PAGE_URL);
    }
  );

  // AUTH WITH FACEBOOK
  router.get("/auth/facebook", passport.authenticate("facebook"));

  // callback route for facebook to redirect to
  router.get(
    "/auth/facebook/redirect",
    passport.authenticate("facebook", {
      successRedirect: keys.CLIENT_HOME_PAGE_URL,
      failureRedirect: "/auth/login/failed",
    })
  );
};

// module.exports = router;
