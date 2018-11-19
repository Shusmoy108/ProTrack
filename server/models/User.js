const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
  usertype: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.statics.insertUser = function(
  name,
  username,
  password,
  usertype,
  cb
) {
  this.findOne({ username: username }, function(err, user) {
    if (!user) {
      const newUser = new User({
        name: name,
        username: username,
        usertype: usertype
      });
      newUser.password = newUser.generateHash(password);
      newUser.save(function(err) {
        if (err) {
          return cb({ msg: "Internal Server Error" }, null);
        }
        return cb(200, null, newUser);
      });
    } else {
      return cb(400, { msg: "User Name already exist" }, null);
    }
  });
};

UserSchema.statics.deleteUser = function(id, cb) {
  this.findOneAndRemove({ _id: id })
    .then(user => {
      if (!user) {
        return cb(404, { msg: "Data Not Found" }, null);
      }
      return cb(200, null, user);
    })
    .catch(err => {
      errors.msg = "Internal server error";
      return cb(500, errors, null);
    });
};

UserSchema.statics.editUser = function(id, name, username, usertype, cb) {
  User.findOne({ _id: id }, function(err, user) {
    if (user.username === username) {
      var update = {
        name: name,
        username: username,
        usertype: usertype
      };
      var query = { _id: id };
      var options = { new: true };
      User.findOneAndUpdate(query, update, options, function(err, updateduser) {
        if (err) {
          return cb(500, { msg: "Internel Server error" }, null);
        } else {
          return cb(200, null, updateduser);
        }
      });
    } else {
      User.findOne({ username: username }, function(err, user) {
        if (!user) {
          var update = {
            name: name,
            username: username,
            usertype: usertype
          };
          var query = { _id: id };
          var options = { new: true };
          User.findOneAndUpdate(query, update, options, function(
            err,
            updateduser
          ) {
            if (err) {
              return cb(500, { msg: "Internel Server error" }, null);
            } else {
              return cb(200, null, updateduser);
            }
          });
        } else {
          return cb(400, { msg: "User Name already exist" }, null);
        }
      });
    }
  });
};

// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password, password2) {
  return bcrypt.compareSync(password, password2);
};
UserSchema.statics.getUser = function(cb) {
  this.find(function(err, users) {
    if (err) cb(400, { msg: "Data not found" }, null);
    else {
      cb(200, null, users);
    }
  });
};
UserSchema.statics.checkUser = function(username, password, cb) {
  var that = this;
  this.findOne({ username: username }, function(err, user) {
    if (err) cb("Server error", null);
    if (!user) {
      cb("User not found", null);
    } else {
      if (user.validPassword(password, user.password)) {
        cb(null, user);
      } else {
        cb("Username & Password don't match", null);
      }
    }
  });
};

UserSchema.statics.getUserlist = function(cb) {
  var that = this;
  this.find(function(err, users) {
    if (err) cb("Server error", null);
    else {
      cb(null, users);
    }
  });
};

module.exports = User = mongoose.model("User", UserSchema);
