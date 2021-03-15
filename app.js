const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
// const bodyParser = require("body-parser");
// const expressSession = require("express-session");
const cookieSession = require("cookie-session");
const cors = require("cors");
const keys = require("./config/keys");

// Routers
const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes");

// Passport Setup
require("./config/passport-setup");

const app = express();

// connect to mongodb
mongoose.connect(
  keys.mongodb.dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongodb");
  }
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   expressSession({
//     secret: keys.session.cookieKey,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 1000 },
//   })
// );

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Set up routes
app.use("/auth", authRouter);
app.use("/users", userRouter);

const port = process.env.PORT || 3100;
app.listen(port, () => console.log("Server is running on " + port));
