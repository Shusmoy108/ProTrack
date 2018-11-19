const checker = require("./is-empty");

module.exports.projectInput = data => {
    let taskError = [];
    let errors = {};
    let err = false;
    if (!checker.isStringAndNotEmpty(data.project_id)) {
        errors.project_id = "Project Id field is required";
        err = true;
    }
    if (!checker.isStringAndNotEmpty(data.client_name)) {
        errors.client_name = "Client name field is required";
        err = true;
    }
    if (!checker.isNumber(data.quantity)) {
        errors.quantity =
            "Quantity field is required and it is Number type data";
        err = true;
    }
    if (!checker.isDate(data.deadline)) {
        errors.deadline = "Deadline field is required";
        err = true;
    }

    data.task.forEach((taski, i) => {
        let t = {
            task_name: taski.task_name,
            subtask: []
        };
        taski.subtask.forEach((subtaskj, j) => {
            let s = {
                subtask_name: subtaskj.subtask_name,
                subtask_err: ""
            };
            if (subtaskj.subtask_value) {
                if (
                    subtaskj.subtask_type === "Number" &&
                    !checker.isNumber(subtaskj.subtask_value)
                ) {
                    s.subtask_err =
                        subtaskj.subtask_name + " is a Number Field";
                    err = true;
                }
                if (
                    subtaskj.subtask_type === "Date" &&
                    !checker.isDate(subtaskj.subtask_value)
                ) {
                    s.subtask_err = subtaskj.subtask_name + " is a Date Field";
                    err = true;
                }
            }
            t.subtask.push(s);
        });
        taskError.push(t);
    });

    errors.taskError = taskError;
    console.log(errors, err);
    return {
        errors,
        isValid: !err
    };
};
