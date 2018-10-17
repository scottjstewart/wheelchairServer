var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

router.post("/createuser", function(req, res) {
  var firstname = req.body.user.firstname;
  var lastname = req.body.user.lastname;
  var email = req.body.user.email;
  var password = req.body.user.password;

  User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    passwordhash: bcrypt.hashSync(password, 10)
  }).then(
    function createSuccess(user) {
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });
      res.json({
        user: user,
        message: "created",
        sessionToken: token
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.post("/login", function(req, res, next) {
  User.findOne({ where: { email: req.body.user.email } }).then(
    function(user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.passwordhash, function(
          err,
          matches
        ) {
          if (matches) {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24
            });
            res.json({
              user: user,
              message: "successfully authenticated",
              sessionToken: token
            });
          } else {
            res.status(502).send({ error: "authentification failed" });
          }
        });
      } else {
        res.status(500).send({ error: "authentification failed" });
      }
    },
    function(err) {
      next(err);
      console.log(err);
    }
  );
});
router.get("/:id", function(req, res, next) {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {
      if (!user) {
        return res.sendStatus(404);
      }
      res.status(200).json(review);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/foo", (req, res) => res.sendStatus(200));

module.exports = router;
