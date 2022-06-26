const User = require("../models/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bycrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({ error: err });
    }
    let user = new User({
      username: req.body.userName,
      email: req.body.email,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        res.json({
          message: "User Added Sucessfully!",
        });
      })
      .catch((error) => {
        res.json({
          message: "An error occured!",
        });
      });
  });
};

const login = (req, res, next) => {
  var username = req.body.userName;
  var password = req.body.password;

  User.findOne({ username: username }).then((user) => {
    if (user) {
      bycrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign({ name: user.name }, "verySecretValue", {
            expiresIn: "1h",
          });
          res.json({ message: "Login Successful!", token });
        } else {
          res.json({ message: "Password does not matched!" });
        }
      });
    } else {
      res.json({ message: "No User Found!" });
    }
  });
};

module.exports = {
  register,
  login,
};
