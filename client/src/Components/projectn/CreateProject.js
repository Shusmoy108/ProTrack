import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import Header from "../Header/Header";
import Axios from "Utils/Axios";
import Button from "@material-ui/core/Button";
import { projectInput } from "../../Validator/projectValidator";
import { insertProject } from "../../Utils/projectAxios";
import TaskInputCard from "./TaskInputCard";
import DropDown from "../dropDownn/DropDown";
import styles from './createprojectStyle';
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
            tasknames: [],
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
            next: false,
            openValue: false,
            openTask: false,
            openValue1: false,
            openTask1: false,
        };
    }
    handleOpenValue = () => {
        this.setState({ openValue: !this.state.openValue });
    }
    handleOpenTask = () => {
        this.setState({ openTask: !this.state.openTask });
    }
    handleOpenValue1 = () => {
        this.setState({ openValue1: !this.state.openValue1 });
    }
    handleOpenTask1 = () => {
        this.setState({ openTask1: !this.state.openTask1 });
    }
    componentDidMount() {
        let that = this;
        let tasknames = [];
        Axios.showproduct(function (err, data) {
            if (err) {
                that.props.history.push("/");
            } else {
                that.setState({
                    productlist: data.products,
                    usertype: data.user.usertype,
                    username: data.user.username,
                    product_name: data.products[0].product_name
                });
                let tasks = [];
                let taskError = [];
                data.products[0].task.forEach((taski, i) => {
                    let task = {
                        task_name: taski.task_name,
                        task_status: "undone",
                        subtask: []
                    };
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
                            task.subtask.push(subtask);
                        } else {
                            let subtask = {
                                subtask_name: subtaskj.subtask_name,
                                subtask_type: subtaskj.subtask_type,
                                subtask_value: ""
                            };
                            task.subtask.push(subtask);
                        }
                    });
                    tasks.push(task);
                    taskError.push(taskerr);
                });
                that.setState({ taskError: taskError }, () => {
                    that.setState({ task: tasks }, () => {
                        that.setState({ product: data.products[0] }, () => {
                            that.setState({
                                task_name: that.state.product.task[0].task_name
                            });
                        });
                    });
                });

                let productnames = [];
                data.products.forEach((item, i) => {
                    productnames.push(item.product_name);
                });
                that.setState({ productnames: productnames, tasknames: tasknames });
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
                taskid: i,
                openTask: false,
                openTask1: false
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

    handleproductname = product_name => {
        this.setState({ product_name: product_name, openValue: false, openValue1: false, task: [] });
        let product = this.state.productlist.find(
            product => product.product_name === product_name
        );
        let tasks = [];
        let taskError = [];
        let tasknames = [];
        product.task.forEach((taski, i) => {
            let task = {
                task_name: taski.task_name,
                task_status: "undone",
                subtask: []
            };
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
                if (subtaskj.subtask_type === "Dropdown") {
                    let subtask = {
                        subtask_name: subtaskj.subtask_name,
                        subtask_type: "Dropdown",
                        subtask_value: ""
                    };
                    subtask.subtask_value = subtaskj.subtask_option[0];
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
                    task.subtask.push(subtask);
                } else {
                    let subtask = {
                        subtask_name: subtaskj.subtask_name,
                        subtask_type: subtaskj.subtask_type,
                        subtask_value: ""
                    };
                    task.subtask.push(subtask);
                }
            });
            tasks.push(task);
            taskError.push(taskerr);
        });
        if (tasks.length === product.task.length) {
            this.setState({ product: { task: [] }, taskError: [] }, () => {
                this.setState({ task: tasks, taskError: taskError, tasknames: tasknames }, () => {
                    this.setState({ product: product }, () => {
                        if (this.state.product.task.length) {
                            this.setState({
                                task_name: this.state.product.task[0].task_name
                            });
                        }
                    });
                });
            });
        }
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
        task[i].subtask[j].subtask_check[k] = !task[i].subtask[j].subtask_check[k];
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
            this.setState({ taskError: errors.taskError, errors: errors, glbErr: 'Some Error is happened.Check All Fields and Steps' });
        } else {
            insertProject(data, (err, project) => {
                if (project) {
                    this.setState({ glbErr: "" });
                    this.props.history.push("/project/pending");
                } else {
                    this.setState({ glbErr: err.msg });
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
                <Header
                    page='pending'
                    history={this.props.history}
                    username={this.state.username}
                    usertype={this.state.usertype}
                />
                {/* <div style={{
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}> */}


                <div
                    className={classes.border}
                >
                    <div style={{ margin: '1% 5%' }}>
                        Create Project
                        </div>
                </div>
                <div className={classes.rootDesktop}>
                    <div className={classes.gap}>
                        <div>
                            <FormHelperText
                                id="component-error-text"
                                style={{ color: "red" }}
                            >
                                {this.state.glbErr}
                            </FormHelperText>
                        </div>
                    </div>
                    <div className={classes.label}>

                        <div className={classes.input}>
                            <div className={classes.gap1}>
                                <div>
                                    Project ID
                                   </div>
                                <div></div>
                            </div>
                            <div className={classes.gap1}>
                                <div> Product Name</div>
                                <div></div>
                            </div>
                            <div className={classes.gap1}>
                                <div> Client Name</div>
                                <div></div>
                            </div>
                            <div className={classes.gap1}>
                                <div>DeadLine</div>
                                <div></div>
                            </div>
                            <div className={classes.gap1}>
                                <div>Quantity</div>
                                <div></div>
                            </div>
                        </div>
                        <div className={classes.labelInput}>
                            <div className={classes.gap}>
                                <div>

                                    <Input
                                        id="standard-required"
                                        value={this.state.project_id}
                                        onChange={this.handleChange("project_id")}
                                    />
                                </div>
                                <div>

                                    <FormHelperText
                                        id="component-error-text"
                                        style={{ color: "red" }}
                                    >
                                        {this.state.errors.project_id}
                                    </FormHelperText>
                                </div>
                            </div>
                            <div className={classes.gap}>
                                <div>

                                    <DropDown value={this.state.product_name} handleOpen={this.handleOpenValue} open={this.state.openValue} change={this.handleproductname} options={this.state.productnames} />
                                </div>
                                <div>

                                    <FormHelperText
                                        id="component-error-text"
                                        style={{ color: "red" }}
                                    >
                                        {this.state.errors.product_name}
                                    </FormHelperText>
                                </div>

                            </div>
                            <div className={classes.gap}>
                                <div>

                                    <Input
                                        id="standard-required"
                                        value={this.state.client_name}
                                        onChange={this.handleChange("client_name")}
                                    />
                                </div>
                                <div>

                                    <FormHelperText
                                        id="component-error-text"
                                        style={{ color: "red" }}
                                    >
                                        {this.state.errors.client_name}
                                    </FormHelperText>
                                </div>

                            </div>
                            <div className={classes.gap}>
                                <Input
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
                            <div className={classes.gap}>
                                <Input
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
                    <div className={classes.task}>

                        <div className={classes.gap1}>
                            <div className={classes.stepDrop}>Step Name</div><div>
                                <DropDown value={this.state.task_name} open={this.state.openTask} handleOpen={this.handleOpenTask} change={this.handletaskname} options={this.state.tasknames} />
                            </div>

                        </div>
                        <div>
                            {this.state.product.task.length && (
                                <TaskInputCard
                                    task={this.state.product.task[this.state.taskid]}
                                    taskError={this.state.taskError[this.state.taskid]}
                                    taskinput={this.state.task[this.state.taskid]}
                                    i={this.state.taskid}
                                    handleSpecChange={this.handdleSpecChange}
                                    handleCheckChange={this.handleCheckChange}
                                    next={this.state.next}
                                    handleNext={this.handleNext}
                                />
                            )}
                            {!this.state.product.task.length && (
                                <FormHelperText style={{ color: 'red', fontSize: 30 }}>
                                    No Steps is available in this product
                                </FormHelperText>
                            )}
                        </div>
                    </div>
                </div>
                <div className={classes.rootMobile}>
                    <FormHelperText
                        id="component-error-text"
                        style={{ color: "red", fontSize: 20 }}
                    >
                        {this.state.glbErr}
                    </FormHelperText>
                    <div>
                        <FormControl style={{ fullWidth: "true", width: "100%" }}>
                            <InputLabel
                                htmlFor="adornment-amount"
                                style={{ marginRight: 10 }}
                            >
                                Project Id
                </InputLabel>
                            <Input
                                id="standard-required"
                                value={this.state.project_id}
                                onChange={this.handleChange("project_id")}
                            />
                        </FormControl>
                        <FormHelperText
                            id="component-error-text"
                            style={{ color: "red" }}
                        >
                            {this.state.errors.project_id}
                        </FormHelperText>
                    </div>
                    <div style={{ padding: "5% 0" }}>
                        <div style={{ display: 'flex' }}>

                            <InputLabel
                                shrink
                                htmlFor="productname"

                            >
                                Product Name
              </InputLabel>
                            <DropDown value={this.state.product_name} handleOpen={this.handleOpenValue1} open={this.state.openValue1} change={this.handleproductname} options={this.state.productnames} />

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
                    <div className={classes.gap1}>
                        <div className={classes.stepDrop}>Step Name</div><div>
                            <DropDown value={this.state.task_name} open={this.state.openTask1} handleOpen={this.handleOpenTask1} change={this.handletaskname} options={this.state.tasknames} />
                        </div>
                    </div>
                    <div>
                        {this.state.product.task.length && (
                            <TaskInputCard
                                task={this.state.product.task[this.state.taskid]}
                                taskError={this.state.taskError[this.state.taskid]}
                                taskinput={this.state.task[this.state.taskid]}
                                i={this.state.taskid}
                                handleSpecChange={this.handdleSpecChange}
                                handleCheckChange={this.handleCheckChange}
                                next={this.state.next}
                                handleNext={this.handleNext}
                            />
                        )}
                        {!this.state.product.task.length && (
                            <FormHelperText style={{ color: 'red', fontSize: 30 }}>
                                No Steps is available in this product
                                </FormHelperText>
                        )}
                    </div>
                </div>
                <div className={classes.buttonStyle}>
                    <Button variant='contained' color='primary' onClick={this.createproject}>
                        Done
                </Button>
                </div>
                {/* </div> */}
            </div>
        );
    }
}

CreatePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreatePage);
