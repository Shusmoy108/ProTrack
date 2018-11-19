import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CreateTask from "./CreateTask";
import styles from "./taskstyle";
import Task from "./Task";
import Axios from "Utils/Axios";
import Header from "../Header/Header";
import Tooltip from "@material-ui/core/Tooltip"
import Hidden from "@material-ui/core/Hidden/Hidden";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import TaskSubtaskbody from "./TaskSubtaskBody";

class TaskBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createflag: 0,
            tasklist: [],
            showpage: "task",
            usertype: "",
            username: "",
            subtask: -1,
            craetenextflag: 0,
            tasknumber: -1
        };
    }

    opencreatebox = () => {
        this.setState({ createflag: 1 });
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
        let that = this;
        Axios.createtask(e, this.state.tasknumber, function (err, data) {
            if (err) that.setState({ msgLogin: err });
            else {
                that.setState({ tasklist: data.tasks });
            }
        });
    };
    closenext() { }
    deletetask = e => {
        let that = this;
        Axios.deletetask(e, function (err, data) {
            if (err) that.setState({ msgLogin: err });
            else {
                that.setState({ tasklist: data.tasks });
            }
        });
    };
    edittask = (e, n) => {
        let that = this;
        Axios.edittask(e, n, function (err, data) {
            if (err) that.setState({ msgLogin: err });
            else {
                that.setState({ tasklist: data.tasks });
            }
        });
    };
    showsubtask = e => {
        this.setState({ subtask: e });
    };
    createsubtask = (e, n, f, g, i) => {
        let that = this;
        Axios.createtasksubtask(e, n, f, g, i, function (err, data) {
            if (err) that.setState({ msgLogin: err });
            else {
                that.setState({ tasklist: data.tasks });
            }
        });
    };
    createoldsubtask = (e, n, f) => {
        let that = this;

        Axios.createtaskoldsubtask(e, n, f, function (err, data) {
            if (err) that.setState({ msgLogin: err });
            else {
                that.setState({ tasklist: data.tasks });
            }
        });
    };
    deletesubtask = (e, n) => {
        let that = this;
        Axios.deletetasksubtask(e, n, function (err, data) {
            if (err) that.setState({ msgLogin: err });
            else {
                that.setState({ tasklist: data.tasks });
            }
        });
    };
    editsubtask = (e, n, f, g, i) => {
        let that = this;
        Axios.edittasksubtask(e, n, f, g, i, function (err, data) {
            if (err) that.setState({ msgLogin: err });
            else {
                that.setState({ tasklist: data.tasks });
            }
        });
    };
    componentDidMount() {
        let that = this;
        Axios.showtask(function (err, data) {
            if (err) {
                that.props.history.push("/");
            } else {
                that.setState({
                    tasklist: data.tasks,
                    usertype: data.user.usertype,
                    username: data.user.username
                });
            }
        });
    }

    render() {
        const { classes } = this.props;
        let task;
        let create;
        if (this.state.subtask === -1) {

            if (this.state.createflag === 1) {
                create = (
                    <CreateTask
                        closenext={this.closenext}
                        createtask={this.createtask}
                        show={this.closecreatebox}
                    />
                );
            }
            let tasklist = [];
            for (let i = 0; i < this.state.tasklist.length; i++) {
                tasklist.push(
                    <Task
                        key={i}
                        id={this.state.tasklist[i]._id}
                        task_number={i}
                        add={0}
                        opennextcreatebox={this.opennextcreatebox}
                        showsubtask={this.showsubtask}
                        task_name={this.state.tasklist[i].task_name}
                        deletetask={this.deletetask}
                        edittask={this.edittask}
                    />
                );
                if (i === this.state.tasknumber) {
                    tasklist.push(
                        <CreateTask
                            createnexttask={this.createnexttask}
                            key={this.state.tasklist.length}
                            closenext={this.closenextcreatebox}
                            createtask={this.createtask}
                            show={this.closecreatebox}
                        />
                    );
                }
            }
            task = (
                < div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
                }>
                    {tasklist}


                </div>
            );
        } else {
            task = (
                <TaskSubtaskbody
                    showsubtask={this.showsubtask}
                    createsubtask={this.createsubtask}
                    deletesubtask={this.deletesubtask}
                    editsubtask={this.editsubtask}
                    taskname={this.state.tasklist[this.state.subtask].task_name}
                    subtasklist={this.state.tasklist[this.state.subtask].subtask}
                    createoldsubtask={this.createoldsubtask}
                />
            );
        }
        return (
            <div>
                <Header
                    page='menu'
                  
                    item='step'
                    history={this.props.history}
                    username={this.state.username}
                    usertype={this.state.usertype}
                />
                <div
                    className={classes.topBorder}
                >
                    <div style={{ margin: '1% 5%', flex: 1 }}>
                        Step-List
                        </div>
                    {this.state.subtask === -1 && (<div className={classes.print}>




                        <Button
                            onClick={this.opencreatebox}
                            color='primary'
                            variant='contained'
                            // onClick={this.printDocument}
                            style={{ marginLeft: "5%" }}
                        >
                            ADD Step
                                </Button>


                    </div>)}
                </div>
                {create}
                {task}
                {this.state.subtask === -1 && (<Hidden only={["sm", "md", "lg", "xl"]}>
                    <Tooltip title='Create Step'>
                        <Button
                            variant="fab"
                            color="primary"
                            aria-label="Add"
                            onClick={this.opencreatebox}
                            className={classes.button}
                        >
                            <AddIcon />
                        </Button>
                    </Tooltip>
                </Hidden>)}
            </div>
        );
    }
}

TaskBody.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskBody);
