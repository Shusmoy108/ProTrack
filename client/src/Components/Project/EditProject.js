import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";

import styles from "../Product/productstyle";

import Axios from "Utils/Axios";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/DoneAll";

import { projectInput } from "../../Validator/projectValidator";
import { ediProject } from "../../Utils/projectAxios";
import TaskInputCard from "./TaskInputCard";
class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: "",
            client_name: "",
            quantity: "0",
            deadline: Date.now(),
            task_name: "",
            project_id: "",
            productlist: [],
            usertype: "",
            username: "",
            productnames: [],
            createflag: 0,
            glbErr: "",
            errors: {},
            product: {
                task: []
            },
            taskid: 0,
            taskError: [],
            task: [],
            error: {},
            next: false
        };
    }
    componentDidMount() {
        let that = this;
        Axios.getProduct(this.props.project.product_name, function(err, data) {
            if (err) {
                //that.props.history.push("/");
            } else {
                that.setState(
                    {
                        product: data.product,
                        project_id: that.props.project.project_id,
                        client_name: that.props.project.client_name,
                        quantity: that.props.project.quantity,
                        product_name: that.props.project.product_name,
                        deadline: that.props.project.deadline.split(".")[0]
                    },
                    () => {
                        let tasks = [];
                        let taskError = [];
                        let tasknames = [];
                        data.product.task.forEach((taski, i) => {
                            let task = {
                                task_name: taski.task_name,
                                task_status: "undone",
                                subtask: []
                            };
                            let x = that.props.project.task.findIndex(
                                task => task.task_name === taski.task_name
                            );
                            if (x !== -1) {
                                task.task_status =
                                    that.props.project.task[x].task_status;
                            }
                            let taskerr = {
                                task_name: taski.task_name,
                                subtask: []
                            };
                            tasknames.push(taski.task_name);
                            taski.subtask.forEach((subtaskj, j) => {
                                let subtask_err = {
                                    subtask_name: subtaskj.subtask_name,
                                    subtask_error: ""
                                };
                                taskerr.subtask.push(subtask_err);
                                let subtaskold;

                                if (x !== -1) {
                                    subtaskold = that.props.project.task[
                                        x
                                    ].subtask.find(
                                        subtask =>
                                            subtask.subtask_name ===
                                            subtaskj.subtask_name
                                    );
                                }
                                if (subtaskj.subtask_type === "Dropdown") {
                                    let subtask = {
                                        subtask_name: subtaskj.subtask_name,
                                        subtask_type: "Dropdown",
                                        subtask_value: ""
                                    };
                                    if (subtaskold) {
                                        subtask = subtaskold;
                                    }
                                    task.subtask.push(subtask);
                                } else if (
                                    subtaskj.subtask_type === "Checkbox"
                                ) {
                                    // let x = that.props.project.task.findIndex(
                                    //     task =>
                                    //         task.task_name === taski.task_name
                                    // );
                                    let subtask = {
                                        subtask_name: subtaskj.subtask_name,
                                        subtask_type: "Checkbox",
                                        subtask_value: [],
                                        subtask_check: []
                                    };
                                    if (subtaskold) {
                                        subtask = subtaskold;
                                    }
                                    task.subtask.push(subtask);
                                } else {
                                    let subtask = {
                                        subtask_name: subtaskj.subtask_name,
                                        subtask_type: "",
                                        subtask_value: ""
                                    };

                                    if (subtaskold) {
                                        subtask = subtaskold;
                                    }
                                    task.subtask.push(subtask);
                                }
                            });
                            tasks.push(task);
                            taskError.push(taskerr);
                        });
                        that.setState({ taskError: taskError }, () => {
                            that.setState({ task: tasks }, () => {
                                that.setState({
                                    task_name:
                                        that.state.product.task[0].task_name
                                });
                            });
                        });
                    }
                );
            }
        });
    }
    handletaskname = task_name => {
        let i = this.state.product.task.findIndex(
            task => task.task_name === task_name.target.value
        );
        this.setState(
            {
                task_name: this.state.product.task[i].task_name,
                taskid: i
            },
            () => {
                let taskid = this.state.taskid;
                if (this.state.product.task.length > taskid + 1) {
                    this.setState({
                        next: false
                    });
                } else {
                    this.setState({
                        next: true
                    });
                }
            }
        );
    };
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    handleDateChange = e => {
        this.setState({ deadline: e.target.value });
    };
    handdleSpecChange = (i, j) => e => {
        let task = this.state.task;
        task[i].subtask[j].subtask_value = e.target.value;
        this.setState({ task: task });
    };
    handleCheckChange = (i, j, k, e) => {
        let task = this.state.task;
        task[i].subtask[j].subtask_check[k] = !task[i].subtask[j].subtask_check[
            k
        ];
        if (task[i].subtask[j].subtask_check[k]) {
            task[i].subtask[j].subtask_value.push(e);
        } else {
            let index = task[i].subtask[j].subtask_value.indexOf(e);
            if (index !== -1) task[i].subtask[j].subtask_value.splice(index, 1);
        }
        this.setState({ task: task });
    };
    createproject = () => {
        let data = {
            project_id: this.state.project_id,
            product_name: this.state.product_name,
            deadline: this.state.deadline,
            client_name: this.state.client_name,
            quantity: this.state.quantity,
            task: this.state.task
        };
        let { errors, isValid } = projectInput(data);
        if (!isValid) {
            this.setState({
                taskError: errors.taskError,
                errors: errors,
                glbErr: "Some Error is happened. Check All Fields and Steps"
            });
        } else {
            let that = this;
            ediProject(data, (err, project) => {
                if (project) {
                    that.setState({ glbErr: "" });
                    that.props.handleEdit(project);
                } else {
                    that.setState({ glbErr: err.msg });
                }
            });
            this.setState({ taskError: errors.taskError, errors: {} });
        }
    };
    handleNext = () => {
        let taskid = this.state.taskid;
        taskid++;
        if (this.state.product.task.length > taskid + 1) {
            this.setState({
                task_name: this.state.product.task[taskid].task_name,
                taskid: taskid,
                next: false
            });
        } else {
            this.setState({
                task_name: this.state.product.task[taskid].task_name,
                taskid: taskid,
                next: true
            });
        }
    };
    render() {
       // const { classes } = this.props;
        let button;

        button = (
            <Button onClick={this.createproject}>
                <DoneIcon />
            </Button>
        );
        let values = [];
        let tasknames = [];
        for (let i = 0; i < this.state.productnames.length; i++) {
            values.push(
                <MenuItem key={i} value={this.state.productnames[i]}>
                    {this.state.productnames[i]}
                </MenuItem>
            );
        }
        for (let j = 0; j < this.state.product.task.length; j++) {
            tasknames.push(
                <MenuItem key={j} value={this.state.product.task[j].task_name}>
                    {this.state.product.task[j].task_name}
                </MenuItem>
            );
        }
        return (
            <div>
                {this.state.task_name && (
                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "center"
                        }}
                    >
                        <div>
                            <FormHelperText
                                id="component-error-text"
                                style={{ color: "red", fontSize: 20 }}
                            >
                                {this.state.glbErr}
                            </FormHelperText>
                            <div
                                style={{
                                    fontFamily: "Helvetica Neue",
                                    fontSize: 20,
                                    margin: "2% 0"
                                }}
                            >
                                Project ID : {this.state.project_id}
                            </div>
                            <div
                                style={{
                                    fontFamily: "Helvetica Neue",
                                    fontSize: 20,
                                    margin: "2% 0"
                                }}
                            >
                                Product Name : {this.state.product_name}
                            </div>
                            <div>
                                <FormControl
                                    style={{ fullWidth: "true", width: "100%" }}
                                >
                                    <InputLabel
                                        htmlFor="adornment-amount"
                                        style={{ marginRight: 10 }}
                                    >
                                        Client Name
                                    </InputLabel>
                                    <Input
                                        id="standard-required"
                                        value={this.state.client_name}
                                        onChange={this.handleChange(
                                            "client_name"
                                        )}
                                    />
                                </FormControl>
                                <FormHelperText
                                    id="component-error-text"
                                    style={{ color: "red" }}
                                >
                                    {this.state.errors.client_name}
                                </FormHelperText>
                            </div>
                            <div>
                                <FormControl
                                    style={{ fullWidth: "true", width: "100%" }}
                                >
                                    <InputLabel
                                        htmlFor="adornment-amount"
                                        style={{ marginRight: 10 }}
                                    >
                                        Quantity
                                    </InputLabel>
                                    <Input
                                        id="standard-required"
                                        value={this.state.quantity}
                                        onChange={this.handleChange("quantity")}
                                    />
                                </FormControl>
                                <FormHelperText
                                    id="component-error-text"
                                    style={{ color: "red" }}
                                >
                                    {this.state.errors.quantity}
                                </FormHelperText>
                            </div>
                            <div>
                                <FormControl
                                    style={{ fullWidth: "true", width: "100%" }}
                                >
                                    <div
                                        htmlFor="adornment-amount"
                                        style={{ marginRight: 10 }}
                                    >
                                        Deadline
                                    </div>
                                    <Input
                                        type="datetime-local"
                                        value={this.state.deadline}
                                        onChange={this.handleChange("deadline")}
                                    />
                                </FormControl>
                                <FormHelperText
                                    id="component-error-text"
                                    style={{ color: "red" }}
                                >
                                    {this.state.errors.deadline}
                                </FormHelperText>
                            </div>
                            <div style={{ padding: "5% 0" }}>
                                <InputLabel
                                    shrink
                                    htmlFor="productname"
                                    style={{ paddingRight: "5%" }}
                                >
                                    Step Name :
                                </InputLabel>
                                <Select
                                    value={this.state.task_name}
                                    onChange={this.handletaskname}
                                    input={<Input name="age" id="age-helper" />}
                                >
                                    {tasknames}
                                </Select>
                            </div>
                            {this.state.product.task.length && (
                                <TaskInputCard
                                    task={
                                        this.state.product.task[
                                            this.state.taskid
                                        ]
                                    }
                                    taskError={
                                        this.state.taskError[this.state.taskid]
                                    }
                                    taskinput={
                                        this.state.task[this.state.taskid]
                                    }
                                    i={this.state.taskid}
                                    handleSpecChange={this.handdleSpecChange}
                                    handleCheckChange={this.handleCheckChange}
                                    next={this.state.next}
                                    handleNext={this.handleNext}
                                />
                            )}
                            {button}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

CreatePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreatePage);
