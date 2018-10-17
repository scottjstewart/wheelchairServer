require("dotenv").config();
var express = require("express");
var app = express();
var inventory = require("./controllers/inventory.controller");
var user = require("./controllers/user.controller");
var sequelize = require("./db");
var bodyParser = require("body-parser");
var cors = require("cors");
var reviews = require("./controllers/reviews.controller");
var cartItems = require("./controllers/cart.controller");
const errorware = (err, req, res, next) => {
  console.log(err);
  return res.sendStatus(500);
};
sequelize.sync(); // pass in {force: true} for resetting tables
app.use(cors());
app.use(bodyParser.json());
app.use(require("./middleware/headers"));
app.use("/reviews", reviews, errorware);
app.use("/cartItems", cartItems, errorware);
app.use("/inventories", inventory, errorware);
app.use("/users", user, errorware);
app.use(require("./middleware/validate-session"));
app.listen(3002, function() {
  console.log("App is listening on 3002.");
});
