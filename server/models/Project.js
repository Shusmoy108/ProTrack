const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectValidators = require("../Validator/projectValidator");
const ProjectSchema = new Schema({
    project_id: String,
    product_name: String,
    client_name: String,
    quantity: Number,
    deadline: Date,
    project_status: String,
    current_position: String,
    next_position: String,
    completed_task: Number,
    total_task: Number,
    task: []
});
ProjectSchema.statics.insertProject = (data, cb) => {
    //////console.log(data);
    const { errors, isValid } = projectValidators.projectInput(data);
    ////console.log(data);
    // Check Validation
    if (!isValid) {
        return cb(400, errors, null);
    }
    let current_position = "";
    let next_position = "";
    if (data.task.length) {
        current_position = data.task[0].task_name;
        if (data.task.length > 1) {
            next_position = data.task[1].task_name;
        }
    }
    Project.findOne({ project_id: data.project_id })
        .then(project => {
            if (project) {
                errors.msg = "Project already exists";
                return cb(400, errors, null);
            } else {
                const newProject = new Project({
                    project_id: data.project_id,
                    product_name: data.product_name,
                    client_name: data.client_name,
                    quantity: data.quantity,
                    deadline: data.deadline,
                    project_status: "pending",
                    current_position: current_position,
                    next_position: next_position,
                    completed_task: 0,
                    total_task: data.task.length,
                    task: data.task
                });

                newProject
                    .save()
                    .then(projecti => {
                        return cb(200, null, projecti);
                    })
                    .catch(err => {
                        return cb(500, { msg: "Internal server Error" }, null);
                        // //console.log(err);
                    });
            }
        })
        .catch(err => {
            errors.msg = "Internal server error";
            return cb(500, errors, null);
        });
};
ProjectSchema.statics.upadteProject = function(data, cb) {
    //////console.log(data);
    const { errors, isValid } = projectValidators.projectInput(data);
    ////console.log(data);
    // Check Validation
    if (!isValid) {
        return cb(400, errors, null);
    }
    let current_position = data.task[data.task.length - 1].task_name;
    let next_position = data.task[data.task.length - 1].task_name;
    let f = 0;
    for (let i = 0; i < data.task.length; i++) {
        if (data.task[i].task_status === "undone" && f === 0) {
            current_position = data.task[i].task_name;
            f = 1;
        } else if (data.task[i].task_status === "undone" && f === 1) {
            next_position = data.task[i].task_name;
            f = -1;
        }
    }
    var query = { project_id: data.project_id };
    var options = { new: true };
    var update = {
        client_name: data.client_name,
        quantity: data.quantity,
        deadline: data.deadline,
        current_position: current_position,
        next_position: next_position,
        total_task: data.task.length,
        task: data.task
    };
    this.findOneAndUpdate(query, update, options, function(
        err,
        updatedproject
    ) {
        if (err) {
            return cb(500, { msg: "Internel Server error" }, null);
        } else {
            return cb(200, null, updatedproject);
        }
    });
};
ProjectSchema.statics.getAllProjects = (project_status, cb) => {
    ////console.log("here");
    //cb(200, null, "here");
    if (project_status === "ongoing") {
        Project.find({ project_status: { $in: ["ongoing", "redo"] } }).exec(
            function(err, projects) {
                if (err) {
                    cb(500, { msg: "server error" }, null);
                } else {
                    cb(200, null, projects);
                }
            }
        );
    } else {
        Project.find({ project_status: project_status }).exec(function(
            err,
            projects
        ) {
            if (err) {
                cb(500, { msg: "server error" }, null);
            } else {
                cb(200, null, projects);
            }
        });
    }
};

ProjectSchema.statics.deleteProject = function(id, cb) {
    this.findOneAndRemove({ project_id: id })
        .then(project => {
            if (!project) {
                return cb(404, { msg: "Data Not Found" }, null);
            }
            return cb(200, null, project);
        })
        .catch(err => {
            errors.msg = "Internal server error";
            return cb(500, errors, null);
        });
};
ProjectSchema.statics.findProject = function(id, cb) {
    this.findOne({ project_id: id }, function(err, project) {
        if (err) {
            return cb(500, { msg: "Internel Server error" }, null);
        } else {
            return cb(200, null, project);
        }
    });
};

ProjectSchema.statics.updateProjectStatus = (id, status, cb) => {
    var query = { project_id: id };
    var options = { new: true };
    var update = {
        project_status: status
    };

    Project.findOneAndUpdate(query, update, options, function(
        err,
        updatedproject
    ) {
        if (err) {
            return cb(500, { msg: "Internel Server error" }, null);
        } else {
            //console.log("deleted");
            return cb(200, null, updatedproject);
        }
    });
};
ProjectSchema.statics.updateProjectProgress = (
    id,
    current_position,
    next_position,
    task,
    inc,
    cb
) => {
    let i = parseInt(inc);

    var query = { project_id: id };
    var options = { new: true };
    var update = {
        current_position: current_position,
        next_position: next_position,
        task: task,
        $inc: { completed_task: i }
    };

    Project.findOneAndUpdate(query, update, options, function(
        err,
        updatedproject
    ) {
        if (err) {
            return cb(500, { msg: "Internel Server error" }, null);
        } else {
            return cb(200, null, updatedproject);
        }
    });
};
module.exports = Project = mongoose.model("Project", ProjectSchema);
