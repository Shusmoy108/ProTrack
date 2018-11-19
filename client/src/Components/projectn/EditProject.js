import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input/Input";
import Axios from "Utils/Axios";
import Button from "@material-ui/core/Button";
import { projectInput } from "../../Validator/projectValidator";
import { ediProject } from "../../Utils/projectAxios";
import TaskInputCard from "./TaskInputCard";
import DropDown from "../dropDownn/DropDown";
import styles from './editprojectStyle';
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
            product: null,
            taskid: 0,
            taskError: [],
            task: [],
            error: {},
            next: false,
            openValue: false,
            openTask: false,
            openTask1: false,
            tasknames: []
        };
    }
    handleOpenTask = () => {
        this.setState({ openTask: !this.state.openTask });
    }
    handleOpenTask1 = () => {
        this.setState({ openTask1: !this.state.openTask1 });
    }
    componentDidMount() {
        let that = this;
        Axios.getProduct(this.props.project.product_name, function (err, data) {
            if (err) {
                //that.props.history.push("/");
            } else {
                //console.log(data.product, that.props.project, 'here');
                that.setState({
                    project_id: that.props.project.project_id,
                    product_name: that.props.project.product_name,
                    client_name: that.props.project.client_name,
                    deadline: that.props.project.deadline.split('.')[0],
                    quantity: that.props.project.quantity,
                })
                if (!data.product) {
                    that.setState({ product: null })
                }
                else {
                    let tasknames = []
                    let tasks = [];
                    let taskError = [];
                    data.product.task.forEach((taski, i) => {
                        //console.log(taski)
                        let task = {
                            task_name: taski.task_name,
                            task_status: "undone",
                            subtask: []
                        };
                        let x = that.props.project.task.find((t) => t.task_name === taski.task_name)
                        if (!x) {

                        }
                        else {
                            task.task_status = x.task_status;
                        }
                        tasknames.push(taski.task_name);
                        let taskerr = {
                            task_name: taski.task_name,
                            subtask: []
                        };
                        taski.subtask.forEach((subtaskj, j) => {
                            let subtask_err = {
                                subtask_name: subtaskj.subtask_name,
                                subtask_error: ""
                            };
                            taskerr.subtask.push(subtask_err);
                            if (subtaskj.subtask_type === "Dropdown") {
                                let subtask = {
                                    subtask_name: subtaskj.subtask_name,
                                    subtask_type: "Dropdown",
                                    subtask_value: ""
                                };

                                subtask.subtask_value = subtaskj.subtask_option[0];

                                if (!x) {

                                }
                                else {
                                    let y = x.subtask.find((s) => (s.subtask_name === subtask.subtask_name && s.subtask_type === subtask.subtask_type))
                                    if (!y) {

                                    }
                                    else {
                                        subtask.subtask_value = y.subtask_value;
                                    }

                                }
                                task.subtask.push(subtask);
                            } else if (subtaskj.subtask_type === "Checkbox") {
                                let subtask = {
                                    subtask_name: subtaskj.subtask_name,
                                    subtask_type: "Checkbox",
                                    subtask_value: [],
                                    subtask_check: []
                                };
                                subtaskj.subtask_option.forEach((e, c) => {
                                    subtask.subtask_check[c] = false;
                                });
                                if (!x) {

                                }
                                else {
                                    let y = x.subtask.find((s) => (s.subtask_name === subtask.subtask_name && s.subtask_type === subtask.subtask_type))
                                    if (!y) {

                                    }
                                    else {
                                        console.log(y, 'subtask');
                                        subtask.subtask_value = y.subtask_value;
                                        subtask.subtask_check = y.subtask_check;
                                    }

                                }
                                task.subtask.push(subtask);
                            } else {
                                let subtask = {
                                    subtask_name: subtaskj.subtask_name,
                                    subtask_type: subtaskj.subtask_type,
                                    subtask_value: ""
                                };
                                if (!x) {

                                }
                                else {
                                    let y = x.subtask.find((s) => (s.subtask_name === subtask.subtask_name && s.subtask_type === subtask.subtask_type))
                                    if (!y) {

                                    }
                                    else {
                                        subtask.subtask_value = y.subtask_value;
                                    }
                                }
                                task.subtask.push(subtask);
                            }
                        });
                        tasks.push(task);
                        taskError.push(taskerr);
                    });
                    that.setState({ taskError: taskError, tasknames: tasknames }, () => {
                        that.setState({ task: tasks }, () => {
                            that.setState({ product: data.product }, () => {
                                that.setState({
                                    task_name: that.state.product.task[0].task_name
                                }, () => {

                                });
                            });
                        });
                    });

                }
            }
        });
    }
    handletaskname = task_name => {
        let i = this.state.product.task.findIndex(
            task => task.task_name === task_name
        );
        this.setState(
            {
                task_name: this.state.product.task[i].task_name,
                openTask: false,
                openTask1: false,
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
        const { classes } = this.props;
        console.log(this.state.deadline, 'time');
        return (
            <div>
                <div
                    className={classes.border}
                >
                    <div style={{ margin: '1% 5%' }}>
                        Edit Project
                        </div>
                </div>
                <div className={classes.rootDesktop}>
                    <div className={classes.labelRoot}>
                        <div className={classes.gap}>
                            <div className={classes.label}>
                                <FormHelperText
                                    id="component-error-text"
                                    style={{ color: "red" }}
                                >
                                    {this.state.glbErr}
                                </FormHelperText>
                            </div>
                        </div>
                        <div className={classes.gap}>
                            <div className={classes.label}> Project ID </div> <div style={{ marginRight: '10px', marginTop: 6 }}><b> {this.state.project_id}</b>
                            </div>
                        </div>
                        <div className={classes.gap}>
                            <div className={classes.label} > Product Name </div>
                            <div className={classes.label}>
                                <b>{this.state.product_name}</b>
                            </div>
                        </div>
                        <div className={classes.gap}>
                            <div className={classes.label}> Client Name </div> <div> <Input
                                id="standard-required"
                                value={this.state.client_name}
                                onChange={this.handleChange("client_name")}
                            />
                                <FormHelperText
                                    id="component-error-text"
                                    style={{ color: "red" }}
                                >
                                    {this.state.errors.client_name}
                                </FormHelperText>
                            </div>
                        </div>
                        <div className={classes.gap}>
                            <div className={classes.label}> DeadLine </div> <div> <Input
                                id="standard-required"
                                type='datetime-local'
                                value={this.state.deadline}
                                onChange={this.handleChange("deadline")}
                            />
                                <FormHelperText
                                    id="component-error-text"
                                    style={{ color: "red" }}
                                >
                                    {this.state.errors.deadline}
                                </FormHelperText>
                            </div>
                        </div>
                        <div className={classes.gap}>
                            <div className={classes.label} > Quantity </div> <div> <Input
                                id="standard-required"

                                value={this.state.quantity}
                                onChange={this.handleChange("quantity")}
                            />
                                <FormHelperText
                                    id="component-error-text"
                                    style={{ color: "red" }}
                                >
                                    {this.state.errors.quantity}
                                </FormHelperText>
                            </div>
                        </div>
                    </div>
                    <div className={classes.vertical} />

                    {this.state.product && (
                        <div className={classes.cardRoot}>

                            <div className={classes.gap1}>
                                <div className={classes.label}>Step Name</div><div>
                                    <DropDown value={this.state.task_name} open={this.state.openTask} handleOpen={this.handleOpenTask} change={this.handletaskname} options={this.state.tasknames} />
                                </div>

                            </div>
                            <div>
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
                            </div>
                        </div>
                    )}
                    {!this.state.product && (
                        <div className={classes.deleteLabel}>
                            <FormHelperText
                                id="component-error-text"
                                style={{ color: "red", fontSize: 30 }}
                            >
                                Either the product is deleted or all the steps of the product is deleted
                                </FormHelperText>
                        </div>
                    )}


                </div>
                <div className={classes.rootMobile}>
                    <FormHelperText
                        id="component-error-text"
                        style={{ color: "red", fontSize: 20 }}
                    >
                        {this.state.glbErr}
                    </FormHelperText>
                    <div className={classes.gap}>
                        <div className={classes.label}> Project ID </div> <div style={{ marginRight: '10px', marginTop: 6 }}><b> {this.state.project_id}</b>
                        </div>
                    </div>
                    <div className={classes.gap}>
                        <div className={classes.label} > Product Name </div>
                        <div className={classes.label}>
                            <b>{this.state.product_name}</b>
                        </div>
                    </div>
                    <div>
                        <FormControl style={{ fullWidth: "true", width: "100%" }}>
                            <InputLabel
                                htmlFor="adornment-amount"
                                style={{ marginRight: 10 }}
                            >
                                Client Name
                </InputLabel>
                            <Input
                                id="standard-required"
                                value={this.state.client_name}
                                onChange={this.handleChange("client_name")}
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
                        <FormControl style={{ fullWidth: "true", width: "100%" }}>
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
                        <FormControl style={{ fullWidth: "true", width: "100%" }}>
                            <div htmlFor="adornment-amount" style={{ marginRight: 10 }}>
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
                    {this.state.product && (
                        <div className={classes.cardRoot}>

                            <div className={classes.gap1}>
                                <div className={classes.label}>Step Name</div><div>
                                    <DropDown value={this.state.task_name} open={this.state.openTask1} handleOpen={this.handleOpenTask1} change={this.handletaskname} options={this.state.tasknames} />
                                </div>

                            </div>
                            <div>
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
                            </div>
                        </div>
                    )}
                    {!this.state.product && (
                        <div className={classes.deleteLabel}>
                            <FormHelperText
                                id="component-error-text"
                                style={{ color: "red", fontSize: 30 }}
                            >
                                Either the product is deleted or all the steps of the product is deleted
                                </FormHelperText>
                        </div>
                    )}

                </div>
                <div className={classes.buttonStyle}>
                    <Button variant='contained' color='primary' onClick={this.createproject}>
                        Done
                </Button>
                </div>
            </div>
        );
    }
}

CreatePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreatePage);
