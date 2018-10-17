var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Review = sequelize.import("../models/reviews");

router.post("/", function(req, res) {
  Review.create(req.body).then(
    function createSuccess(reviews) {
      res.json(reviews);
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.get("/:id", function(req, res, next) {
  Review.findOne({ where: { id: req.params.id } })
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
  Review.findAll().then(
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
  Review.findOne({ where: { id: req.params.id } })
    .then(review => {
      if (!review) {
        return res.sendStatus(404);
      }
      return review.destroy();
    })
    .then(() => {
      return res.status(200);
    })
    .catch(err => {
      next(err);
    });
});

router.patch("/:id", function(req, res, next) {
  Review.findOne({ where: { id: req.params.id } })
    .then(review => {
      if (!review) {
        return res.sendStatus(404);
      }
      return review.update(req.body);
    })
    .then(review => {
      return res.status(200).json(review);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
