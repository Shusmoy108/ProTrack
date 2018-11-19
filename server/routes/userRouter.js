const express = require("express");
const userRouter = express.Router();

const User = require("../models/User");
const passport = require("passport");
require("../settings/passport")(passport);

userRouter.post(
  "/insert",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    User.insertUser(
      req.body.name,
      req.body.username,
      req.body.password,
      req.body.usertype,
      (status, err, data) => {
        if (status === 200) {
          return res.json({
            success: true,
            authorized: true,
            newUser: data
          });
        } else {
          return res.json({
            success: false,
            authorized: true,
            user: req.user,
            err: err
          });
        }
      }
    );
  }
);

userRouter.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    User.editUser(
      req.params.id,
      req.body.name,
      req.body.username,
      req.body.usertype,
      (status, err, data) => {
        if (status === 200) {
          return res.json({
            success: true,
            authorized: true,
            user: data
          });
        } else {
          return res.json({
            success: false,
            authorized: true,
            user: req.user,
            err: err
          });
        }
      }
    );
  }
);

userRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    User.deleteUser(req.params.id, (status, err, data) => {
      if (status === 200) {
        return res.json({
          success: true,
          authorized: true
        });
      } else {
        return res.json({
          success: false,
          authorized: true,
          user: req.user,
          err: err
        });
      }
    });
  }
);

userRouter.get(
  "/get",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    User.getUser((status, err, data) => {
      if (status === 200) {
        return res.json({
          success: true,
          authorized: true,
          user: req.user,
          users: data
        });
      } else {
        return res.json({
          success: false,
          authorized: true,
          user: req.user,
          err: err
        });
      }
    });
  }
);

module.exports = userRouter;
