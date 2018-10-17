var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Cart = sequelize.import("../models/cart");

router.post("/", function(req, res) {
  Cart.create(req.body).then(
    function createSuccess(cartItem) {
      res.json(cartItem);
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.get("/:id", function(req, res, next) {
  Cart.findOne({ where: { id: req.params.id } })
    .then(review => {
      if (!review) {
        return res.sendStatus(404);
      }
      res.status(200).json(review);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/", function(req, res, next) {
  Cart.findAll().then(
    function findAllSuccess(data) {
      console.log("Controller data:", data);
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

router.delete("/:id", function(req, res, next) {
  Cart.findOne({ where: { id: req.params.id } })
    .then(cartItem => {
      if (!cartItem) {
        return res.sendStatus(404);
      }
      return cartItem.destroy();
    })
    .then(() => {
      return res.status(200);
    })
    .catch(err => {
      next(err);
    });
});

router.patch("/:id", function(req, res, next) {
  Cart.findOne({ where: { id: req.params.id } })
    .then(cartItem => {
      if (!cartItem) {
        return res.sendStatus(404);
      }
      return cartItem.update(req.body);
    })
    .then(cartItem => {
      return res.status(200).json(cartItem);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
