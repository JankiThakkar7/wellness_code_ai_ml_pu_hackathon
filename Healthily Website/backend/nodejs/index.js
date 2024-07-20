const login = require("./routes/login");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const app = express();
require("dotenv").config();
require("./utils/passport");
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      domain: process.env.NODE_ENV === "development" ? "localhost" : "hms",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_STRING,
      ttl: 7 * 24 * 60 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: /^/,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.get("/home", (req, res) => {
  res.send("Hello Node ");
});

app.use("/auth", login);

const PORT = 3000 || process.env.PORT;
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to Database...");
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));
