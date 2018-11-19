const checker = require("./is-empty");

module.exports.userInput = data => {
  let errors = {};
  if (!checker.isStringAndNotEmpty(data.username)) {
    errors.username = "User Name is Required";
  }
  if (!checker.isStringAndNotEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (!checker.isStringAndNotEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!checker.isStringAndNotEmpty(data.usertype)) {
    errors.usertype = "User Type is required";
  }

  return {
    errors,
    isValid: checker.isEmpty(errors)
  };
};
module.exports.usereditInput = data => {
  let errors = {};
  if (!checker.isStringAndNotEmpty(data.username)) {
    errors.username = "User Name is Required";
  }
  if (!checker.isStringAndNotEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (!checker.isStringAndNotEmpty(data.usertype)) {
    errors.usertype = "User Type is required";
  }

  return {
    errors,
    isValid: checker.isEmpty(errors)
  };
};
