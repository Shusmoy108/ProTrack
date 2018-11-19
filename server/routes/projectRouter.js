const express = require("express");
const projectRouter = express.Router();
const fs = require("fs");
const pdf = require("html-pdf");
const Project = require("../models/Project");
const passport = require("passport");
require("../settings/passport")(passport);
projectRouter.post(
    "/insert",
    passport.authenticate("jwt", { session: false }),
    function (req, res) {
        Project.insertProject(req.body.data, (status, err, data) => {
            if (status === 200) {
                return res.json({
                    success: true,
                    authorized: true,
                    user: req.user,
                    project: data
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
projectRouter.post(
    "/edit",
    passport.authenticate("jwt", { session: false }),
    function (req, res) {
        Project.upadteProject(req.body.data, (status, err, data) => {
            if (status === 200) {
                return res.json({
                    success: true,
                    authorized: true,
                    user: req.user,
                    project: data
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
function nodeToString(node) {
    var tmpNode = document.createElement("div");
    tmpNode.appendChild(node.cloneNode(true));
    var str = tmpNode.innerHTML;
    tmpNode = node = null; // prevent memory leaks in IE
    return str;
}

projectRouter.post(
    "/printproject",
    passport.authenticate("jwt", { session: false }),
    function (req, res) {
        console.log('pdf', req.body.project);
        let project = req.body.project;
        let page = "";
        page = page + "<div>"
        page = page + "<div class='border'>" +

            " <div class='dektopColumn'>" +
            " <div class='label'> Project ID </div>" +
            "   <div  class='label'> Product Name </div>" +
            " <div  class='label'> Quantity  </div>" +
            "</div>" +
            "  <div class='dektopInput'>" +
            " <div class='input'> " + project.project_id + "</div>" +
            "<div class='input'> " + project.product_name + " </div>" +
            "<div class='input'> " + project.quantity + "  </div>" +
            " </div>" +


            "  <div class='dektopColumn'>" +

            "<div  class='label'> Client Name </div>" +
            " <div  class='label'> Deadline  </div>" +
            "</div>" +
            " <div class='dektopInput'>" +

            "<div class='input'> " + project.client_name + " </div>" +
            "   <div class='input'>" + new Date(project.deadline).toLocaleDateString()
            + "," + new Date(project.deadline).toLocaleTimeString() + " </div>" +
            "</div>" +

            "</div>"
        page = page + "</div>"

        page = page + "<div class='stepStyle' >";
        step = "";
        project.task.forEach(
            (task, i) => {

                step = step + "<div style='margin-right:10px;'>" +
                    "<div>" + "Step Name - " + (i + 1) + " : " + task.task_name + "</div>";
                step = step + "<div style='display:flex; flex-direction:column;'>";
                task.subtask.forEach((subtask, j) => {
                    let x;
                    //console.log(subtask.subtask_type, subtask.subtask_name, subtask.subtask_value);
                    if (subtask.subtask_type === 'Date') {

                        x = new Date(subtask.subtask_value.split('.')[0]).toLocaleDateString() + " , " + new Date(subtask.subtask_value.split('.')[0]).toLocaleTimeString()
                    }
                    else if (subtask.subtask_type === 'Checkbox') {
                        x = "";
                        subtask.subtask_value.forEach((value, k) => {
                            x = x + value;
                            if (k !== subtask.subtask_value.length - 1)
                                x = x + " , "
                        })
                    }
                    else {
                        x = subtask.subtask_value
                    }
                    step = step + "<div>" + subtask.subtask_name + " : " + x + "</div>"
                });
                if (task.task_status === 'done') {
                    step = step + '<div> Step Completed </div>'
                }
                else if (task.task_status === 'undone') {
                    step = step + '<div> Step is not Completed </div>'
                }
                step = step + '</div></div>'
            })
        page = page + step + '</div>'

        let myCSS =
            "<html>\n" +
            "  <head>\n" +
            '      <link rel="stylesheet" href="stylesheets/bootstrap.min.css">\n' +
            '      <link rel="stylesheet" href="public/stylesheets/style.css">\n' +
            "  </head>\n" +
            "  <body>\n";
        let logo =
            "<div class='container' ><img src='../public/images/biggo.png' class='img-responsive' width='70px' /></div>\n";
        let footer =
            "<footer class='container-fluid text-center'><p>Project Management Software Made By</p>\n" +
            '<div class="row">' +
            '<div class="col-xs-offset-6">' +
            '<img src="../public//images/biggo.png" class="img-responsive" width=100px /></div></div></footer>\n';
        let pageToprint = myCSS + page + "\n" + "</body></html>";
        let options = {
            format: "letter",
            base: "http://localhost:5000/public/",
            // width: "865px",
            // height: "1222px",
            zoomFactor: 0.5
        };
        fs.writeFile("project.html", pageToprint, err => {
            if (err) {
                console.log("error here");
            }
            console.log("The file has been saved!");
            pdf
                .create(pageToprint, options)
                .toFile("./public/pdf/project-" + project.project_id + ".pdf", function (err, res2) {
                    if (err) {
                        console.log(err);
                        console.log("error here");
                        //res.status(500).send("Some kind of error...");
                        return;
                    }
                    console.log("pdf created on printMessage");
                    console.log(res2);
                    //res.render("print_pdf");
                });
        });
        return res.json({
            success: true,

        });
    }
);

projectRouter.get(
    "/getprojects/:project_status",
    passport.authenticate("jwt", { session: false }),
    function (req, res) {
        Project.getAllProjects(
            req.params.project_status,
            (status, err, data) => {
                if (status === 200) {
                    return res.json({
                        success: true,
                        authorized: true,
                        user: req.user,
                        projects: data
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
projectRouter.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    function (req, res) {
        Project.deleteProject(req.params.id, (status, err, data) => {
            if (status === 200) {
                return res.json({
                    success: true
                });
            } else {
                return res.json({
                    success: false
                });
            }
        });
    }
);
projectRouter.post(
    "/edit/status/:id",
    passport.authenticate("jwt", { session: false }),
    function (req, res) {
        Project.updateProjectStatus(
            req.params.id,
            req.body.status,
            (status, err, data) => {
                if (status === 200) {
                    return res.json({
                        success: true,
                        project: data
                    });
                } else {
                    return res.json({
                        success: false,
                        err: err
                    });
                }
            }
        );
    }
);
projectRouter.post(
    "/edit/progress/:id",
    passport.authenticate("jwt", { session: false }),
    function (req, res) {
        Project.updateProjectProgress(
            req.params.id,
            req.body.current_position,
            req.body.next_position,
            req.body.task,
            req.body.inc,
            (status, err, data) => {
                if (status === 200) {
                    return res.json({
                        success: true,
                        project: data
                    });
                } else {
                    return res.json({
                        success: false,
                        err: err
                    });
                }
            }
        );
    }
);
projectRouter.get(
    "/show/:id",
    passport.authenticate("jwt", { session: false }),
    function (req, res) {
        Project.findProject(req.params.id, (status, err, data) => {
            if (status === 200) {
                return res.json({
                    success: true,
                    authorized: true,
                    user: req.user,
                    project: data
                });
            } else {
                return res.json({
                    success: false,
                    authorized: true,
                    user: req.user,
                    err: err,
                    project: data
                });
            }
        });
    }
);
module.exports = projectRouter;
