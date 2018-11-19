import axios from "axios";
import showErr from "./errorAxios";

let url = "";

export function insertProject(data, callback) {
    if (localStorage.getItem("jwtToken")) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        console.log(data);
        if (data) {
            axios
                .post(url + "/project/insert", { data: data })
                .then(res => {
                    if (res.data && res.data.success) {
                        // console.log(res);
                        callback(null, res.data.project);
                    } else {
                        callback(res.data.err, null);
                    }
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
export function ediProject(data, callback) {
    if (localStorage.getItem("jwtToken")) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        //console.log(data);
        if (data) {
            axios
                .post(url + "/project/edit", { data: data })
                .then(res => {
                    if (res.data && res.data.success) {
                        // console.log(res);
                        callback(null, res.data.project);
                    } else {
                        callback(res.data.err, null);
                    }
                })
                .catch(error => {
                    //console.log(error.response);
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
function nodeToString(node) {
    var tmpNode = document.createElement("div");
    tmpNode.appendChild(node.cloneNode(true));
    var str = tmpNode.innerHTML;
    tmpNode = node = null; // prevent memory leaks in IE
    return str;
}

export function printProject(project, callback) {
    if (localStorage.getItem("jwtToken")) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
       
        if (project) {
            axios
                .post(url + "/project/printproject", { project:project })
                .then(res => {
                    console.log(res,'axios');
                    if (res.data && res.data.success) {
                        console.log(res,'axios');
                        callback(null, res.data);
                    } else {
                        callback(res.data.err, null);
                    }
                })
                .catch(error => {
                    console.log(error);
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

export function getProjects(project_status, callback) {
    if (localStorage.getItem("jwtToken")) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        if (project_status) {
            axios
                .get(url + "/project/getprojects/" + project_status)
                .then(res => {
                    if (res.data && res.data.success) {
                        //console.log(res);
                        callback(null, res.data);
                    } else {
                        callback(res.data.err, null);
                    }
                })
                .catch(error => {
                    //console.log(error.response);
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
export function deleteProject(id, callback) {
    if (localStorage.getItem("jwtToken")) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        if (id) {
            axios
                .delete(url + "/project/delete/" + id)
                .then(res => {
                    if (res.data.success) {
                        console.log(res);
                        callback(null, res.data);
                    } else {
                        callback(res.data.err, null);
                    }
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
export function updateProject(id, status, callback) {
    if (localStorage.getItem("jwtToken")) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        if (id) {
            axios
                .post(url + "/project/edit/status/" + id, { status: status })
                .then(res => {
                    if (res.data.success) {
                        console.log(res);
                        callback(null, res.data);
                    } else {
                        callback(res.data.err, null);
                    }
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
export function updateProjectProgress(
    id,
    current_position,
    next_position,
    task,
    inc,
    callback
) {
    if (localStorage.getItem("jwtToken")) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        if (id) {
            axios
                .post(url + "/project/edit/progress/" + id, {
                    current_position: current_position,
                    next_position: next_position,
                    task: task,
                    inc: inc
                })
                .then(res => {
                    if (res.data.success) {
                        console.log(res);
                        callback(null, res.data);
                    } else {
                        callback(res.data.err, null);
                    }
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
export function findProject(id, callback) {
    if (localStorage.getItem("jwtToken")) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem(
            "jwtToken"
        );
        if (id) {
            axios
                .get(url + "/project/show/" + id)
                .then(res => {
                    if (res.data.success) {
                        console.log(res);
                        callback(null, res.data);
                    } else {
                        callback(res.data.err, null);
                    }
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
