import axios from "axios";
//import showErr from "./errorAxios";

let url = "";

export function insertUser(name, username, password, usertype, callback) {
  if (localStorage.getItem("jwtToken")) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    if (name && username && password && usertype) {
      axios
        .post(url + "/user/insert", {
          name: name,
          username: username,
          usertype: usertype,
          password: password
        })
        .then(res => {
          callback(null, res.data);
        })
        .catch(error => {
          console.log(error.response);
          if (error.response && error.response.data) {
            if (!error.response.data.authorized) {
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("name");
              localStorage.removeItem("username");
              callback(error.response.data.msg, null);
            } else {
              callback(error.response.data.msg, null);
            }
          } else {
            callback("Unknown error", null);
          }
        });
    } else {
      callback("Fill Up all details", null);
    }
  } else {
    callback("unauthorized local", null);
  }
}

export function deleteUser(id, callback) {
  if (localStorage.getItem("jwtToken")) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    if (id) {
      axios
        .delete(url + "/user/delete/" + id)
        .then(res => {
          callback(null, res.data);
        })
        .catch(error => {
          console.log(error.response);
          if (error.response && error.response.data) {
            if (!error.response.data.authorized) {
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("name");
              localStorage.removeItem("username");
              callback(error.response.data.msg, null);
            } else {
              callback(error.response.data.msg, null);
            }
          } else {
            callback("Unknown error", null);
          }
        });
    } else {
      callback("Fill Up all details", null);
    }
  } else {
    callback("unauthorized local", null);
  }
}

export function editUser(id, name, username, usertype, callback) {
  if (localStorage.getItem("jwtToken")) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    if (name && username && id && usertype) {
      axios
        .post(url + "/user/edit/" + id, {
          name: name,
          username: username,
          usertype: usertype
        })
        .then(res => {
          callback(null, res.data);
        })
        .catch(error => {
          console.log(error.response);
          if (error.response && error.response.data) {
            if (!error.response.data.authorized) {
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("name");
              localStorage.removeItem("username");
              callback(error.response.data.msg, null);
            } else {
              callback(error.response.data.msg, null);
            }
          } else {
            callback("Unknown error", null);
          }
        });
    } else {
      callback("Fill Up all details", null);
    }
  } else {
    callback("unauthorized local", null);
  }
}
export function getUsers(callback) {
  if (localStorage.getItem("jwtToken")) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .get(url + "/user/get")
      .then(res => {
        callback(null, res.data);
      })
      .catch(error => {
        console.log(error.response);
        if (error.response && error.response.data) {
          if (!error.response.data.authorized) {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("name");
            localStorage.removeItem("username");
            callback(error.response.data.msg, null);
          } else {
            callback(error.response.data.msg, null);
          }
        } else {
          callback("Unknown error", null);
        }
      });
  } else {
    callback("Fill Up all details", null);
  }
}
