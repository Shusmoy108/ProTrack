import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CreateTask from "../Task/CreateTask";
import styles from "../Task/taskstyle";
import Task from "../Task/Task";
import Axios from "Utils/Axios";
import ProductSubtaskbody from "./ProductSubtaskbody";
import Tooltip from "@material-ui/core/Tooltip";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import BackIcon from "@material-ui/icons/FastRewind";
import DropDown from "../Dropdown/Dropdown";
class TaskBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createflag: 0,
            tasklist: this.props.tasklist,
            subtask: -1,
            craetenextflag: 0,
            tasknumber: -1,
            taskname: "",
            alltask: [],
            tasknames: []
        };
    }
    componentDidMount() {
        let that = this;
        Axios.showtask(function (err, data) {
            if (err) {
            } else {
                that.setState({
                    alltask: data.tasks,
                    taskname: data.tasks[0].task_name
                });
                let tasknames = [];
                for (let i = 0; i < data.tasks.length; i++) {
                    tasknames.push(data.tasks[i].task_name);
                }
                that.setState({ tasknames: tasknames });
            }
        });
    }
    opencreatebox = () => {
        this.setState({ createflag: 1 });
    };
    openalltask = e => {
        this.setState({ createflag: -1 });
        this.setState(state => ({ tasknumber: e }));
    };
    closecreatebox = () => {
        this.setState({ createflag: 0 });
        this.setState(state => ({ tasknumber: -1 }));
    };
    opennextcreatebox = x => {
        this.setState(state => ({ createflag: 0 }));
        this.setState(state => ({ tasknumber: x }));
    };
    closenextcreatebox = () => {
        this.setState(state => ({ craetenextflag: 0 }));
        this.setState(state => ({ tasknumber: -1 }));
    };
    createtask = e => {
        this.props.createproducttask(this.props.id, e, this.state.tasknumber);
        let alltask = this.state.alltask;
        let task = {
            task_name: e,
            subtask: []
        };
        alltask.push(task);
        let tasknames = this.state.tasknames;
        tasknames.push(e);
        this.setState({
            createflag: 0,
            alltask: alltask,
            tasknames: tasknames
        });
        this.setState(state => ({ tasknumber: -1 }));
    };
    createoldtask = () => {
        let task = this.state.alltask.find(
            task => task.task_name === this.state.taskname
        );
        this.props.createproductoldtask(
            this.props.id,
            task,
            this.state.tasknumber
        );
        this.setState({ createflag: 0 });
        this.setState(state => ({ tasknumber: -1 }));
    };
    deletetask = e => {
        this.props.deleteproducttask(this.props.id, e);
    };
    edittask = (e, n) => {
        this.props.editproducttask(this.props.id, e, n);
    };
    showtask = () => {
        this.props.showtask(-1);
    };
    createsubtask = (e, n, f, g, i, j) => {
        this.props.createproductsubtask(this.props.id, e, n, f, g, i, j);
    };
    createoldsubtask = (e, n, f, g) => {
        this.props.createproductoldsubtask(this.props.id, e, n, f, g);
    };
    deletesubtask = (e, n) => {
        this.props.deleteproductsubtask(this.props.id, e, n);
    };
    editsubtask = (e, n, f, g, i) => {
        this.props.editproductsubtask(this.props.id, e, n, f, g, i);
    };
    showsubtask = e => {
        this.setState({ subtask: e });
    };
    handletaskname = taskname => {
        this.setState({ taskname: taskname });
    };
    render() {
        const { classes } = this.props;
        let task;
        let create;
        if (this.state.subtask === -1) {

            if (this.state.createflag === 1 && this.state.tasknumber === -1) {
                create = (
                    <CreateTask
                        createnexttask={this.createnexttask}
                        closenext={this.closenextcreatebox}
                        createtask={this.createtask}
                        show={this.closecreatebox}
                    />
                );
            }
            if (this.state.createflag === -1 && this.state.tasknumber === -1) {
                create = (
                    <DropDown
                        createtask={this.createoldtask}
                        close={this.closecreatebox}
                        newcreate={this.opencreatebox}
                        value={this.state.taskname}
                        inputfield={"Step-Name"}
                        values={this.state.tasknames}
                        handleChange={this.handletaskname}
                    />
                );
            }
            let tasklist = [];
            for (let i = 0; i < this.props.tasklist.length; i++) {
                tasklist.push(
                    <Task
                        key={i}
                        id={this.props.tasklist[i]._id}
                        task_number={i}
                        add={1}
                        opennextcreatebox={this.opennextcreatebox}
                        showsubtask={this.showsubtask}
                        task_name={this.props.tasklist[i].task_name}
                        deletetask={this.deletetask}
                        edittask={this.edittask}
                        openalltask={this.openalltask}
                    />
                );
                if (
                    i === this.state.tasknumber &&
                    this.state.createflag === 1
                ) {
                    tasklist.push(
                        <CreateTask
                            createnexttask={this.createnexttask}
                            key={this.props.tasklist.length}
                            closenext={this.closenextcreatebox}
                            createtask={this.createtask}
                            show={this.closecreatebox}
                        />
                    );
                }
                if (
                    i === this.state.tasknumber &&
                    this.state.createflag === -1
                ) {
                    tasklist.push(
                        <DropDown
                            createtask={this.createoldtask}
                            close={this.closecreatebox}
                            newcreate={this.opencreatebox}
                            value={this.state.taskname}
                            key={this.props.tasklist.length + 1}
                            inputfield={"Step-Name"}
                            values={this.state.tasknames}
                            handleChange={this.handletaskname}
                        />
                    );
                }
            }
            task = (


                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >

                    <div style={{ display: 'flex', width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ flex: 1, textAlign: "center" }} className={classes.productHeading}>
                            <Tooltip title='Back to Product'>

                                <Button
                                    variant="contained"
                                    onClick={this.showtask}
                                    color={"primary"}
                                >
                                    <BackIcon />
                                    Steps of {this.props.product_name}
                                </Button>


                            </Tooltip>
                        </div>
                        <div style={{ flex: 1, justifyContent: 'center' }}>

                            <Hidden only={["xs"]}>
                                <div>
                                    <Button disabled  >{" "}</Button>
                                   
                                        <Button onClick={() => this.openalltask(-1)} variant="contained" color='primary'>
                                            Add Step
                                        </Button>
                                </div>
                            </Hidden>
                        </div>
                    </div>
                    {create}
                    {tasklist}
                </ div>


            );
        } else {
            task = (
                <ProductSubtaskbody
                    product_name={this.props.product_name}
                    showsubtask={this.showsubtask}
                    createsubtask={this.createsubtask}
                    deletesubtask={this.deletesubtask}
                    editsubtask={this.editsubtask}
                    taskname={this.props.tasklist[this.state.subtask]._id}
                    task_name={
                        this.props.tasklist[this.state.subtask].task_name
                    }
                    subtasklist={
                        this.props.tasklist[this.state.subtask].subtask
                    }
                    createoldsubtask={this.createoldsubtask}
                />
            );
        }
        return (<div>
           
            {task}
            <Hidden only={["sm", "md", "lg", "xl"]}>
                <Tooltip title='Add Step'>
                    <Button
                        variant="fab"
                        color="primary"
                        aria-label="Add"
                        onClick={() => this.props.openalltask(-1)}
                        className={classes.button}
                    >
                        <AddIcon />
                    </Button>
                </Tooltip>
            </Hidden>
        </div>)
    }
}

TaskBody.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskBody);
