const express = require("express");
const authRouter = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("../settings/config");
require("../settings/passport")(passport);
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const mainuser = "protrack";
const mainpassword = "1234";
const maintype = "Admin";
authRouter.post("/login", function(req, res) {
  // render the page and pass in any flash data if it exists

  User.find({}, function(err, user) {
    if (user.length == 0) {
      User.insertUser(
        mainuser,
        mainuser,
        mainpassword,
        "Admin",
        (status, err, data) => {
          if (status === 200) {
            User.checkUser(req.body.username, req.body.password, function(
              err,
              user
            ) {
              if (err) {
                return res.status(500).send({ success: false, msg: err });
              } else {
                let token = jwt.sign(user.toJSON(), config.secret);
                console.log(req.body + "res");
                return res.json({
                  success: true,
                  token: "JWT " + token,
                  usertype: user.usertype,
                  username: user.username,
                  type: user.usertype
                });
              }
            });
          } else {
          }
        }
      );
    } else {
      User.checkUser(req.body.username, req.body.password, function(err, user) {
        if (err) {
          return res.status(500).send({ success: false, msg: err });
        } else {
          let token = jwt.sign(user.toJSON(), config.secret);
          //console.log(req.body + "res");
          return res.json({
            success: true,
            token: "JWT " + token,
            usertype: user.usertype,
            username: user.username,
            type: user.usertype
          });
        }
      });
    }
  });

  if (!req.body.username || !req.body.password) {
    return res.status(500).send({ success: false, msg: "Fill Up all details" });
  }
  //console.log(req.body+"req");
});

authRouter.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    return res.json({ success: true, authorized: true, user: req.user });
  }
);

getToken = function(headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports = authRouter;
