var express = require("express");
var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Inventory = sequelize.import("../models/inventory");

router.post("/", function(req, res, next) {
  Inventory.create(req.body).then(
    function createSuccess(inventory) {
      res.json(inventory);
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.get("/", function(req, res) {
  Inventory.findAll().then(
    function findAllSuccess(data) {
      console.log("Controller data:", data);
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

module.exports = router;
