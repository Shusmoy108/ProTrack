import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CreateSubtask from "../Subtask/CreateSubtask";
import styles from "../Subtask/subtaskstyle";
import Subtask from "../Subtask/Subtask";
import BackIcon from "@material-ui/icons/FastRewind";
import Axios from "Utils/Axios";
import Tooltip from "@material-ui/core/Tooltip";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import Showspec from "../Subtask/Showspec";
import DropDown from "../Dropdown/Dropdown";

class SubtaskBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createflag: 0,
            subtasklist: this.props.subtasklist,
            taskname: this.props.taskname,
            subtaskname: "",
            showpage: "subtask",
            usertype: "",
            username: "",
            showsubtask: -1,
            subtasknumber: -1,
            spec: -1,
            allsubtask: [],
            subtasknames: []
        };
    }
    componentDidMount() {
        let that = this;
        Axios.showsubtask(function (err, data) {
            if (err) {
                //that.props.history.push("/");
            } else {
                that.setState({
                    allsubtask: data.subtasks,
                    subtaskname: data.subtasks[0].subtask_name
                });
                let subtasknames = [];
                for (let i = 0; i < data.subtasks.length; i++) {
                    subtasknames.push(data.subtasks[i].subtask_name);
                }
                that.setState({ subtasknames: subtasknames });
            }
        });
    }
    openallsubtask = e => {
        this.setState({ createflag: -1 });
        this.setState(state => ({ subtasknumber: e }));
    };

    opencreatebox = () => {
        this.setState(state => ({ createflag: 1 }));
        //this.setState(state => ({ subtasknumber: -1 }));
    };
    closecreatebox = () => {
        let e = 0;
        this.setState(state => ({ createflag: e }));
        this.setState(state => ({ subtasknumber: -1 }));
    };
    opennextcreatebox = () => {
        this.setState(state => ({ createflag: 1 }));
    };
    createsubtask = (e, n, f) => {
        this.props.createsubtask(
            this.state.taskname,
            e,
            n,
            f,
            this.state.subtasknumber,
            this.props.task_name
        );
        let subtask = {
            subtask_name: e,
            subtask_type: n,
            subtask_option: f
        };
        let allsubtask = this.state.allsubtask;
        allsubtask.push(subtask);
        let subtasknames = this.state.subtasknames;
        subtasknames.push(e);

        this.setState({ allsubtask: allsubtask, subtasknames: subtasknames });

        this.setState(state => ({ subtasklist: this.props.subtasklist }));
    };
    createoldsubtask = () => {
        let subtask = this.state.allsubtask.find(
            subtask => subtask.subtask_name === this.state.subtaskname
        );
        this.props.createoldsubtask(
            this.state.taskname,
            subtask,
            this.state.subtasknumber,
            this.props.task_name
        );
        this.setState({ createflag: 0 });
        this.setState(state => ({ subtasknumber: -1 }));
    };
    deletesubtask = e => {
        this.props.deletesubtask(this.state.taskname, e);
    };
    editsubtask = (e, n, f, g) => {
        this.props.editsubtask(this.state.taskname, e, n, f, g);
    };
    showsubtask = () => {
        this.props.showsubtask(-1);
    };
    showspec = x => {
        this.setState({ spec: x });
    };
    handlesubtaskname = subtaskname => {
        this.setState({ subtaskname: subtaskname });
    };
    render() {
        const { classes } = this.props;
        let subtask;
        let create;
        if (this.state.showsubtask === -1) {
            if (this.state.createflag === 1 && this.state.subtasknumber === -1) {
                create = (
                    <CreateSubtask
                        createsubtask={this.createsubtask}
                        show={this.closecreatebox}
                    />
                );
            }
            if (this.state.createflag === -1 && this.state.subtasknumber === -1) {
                create = (
                    <DropDown
                        createtask={this.createoldsubtask}
                        close={this.closecreatebox}
                        newcreate={this.opencreatebox}
                        value={this.state.subtaskname}
                        inputfield={"Specification-Name"}
                        values={this.state.subtasknames}
                        handleChange={this.handlesubtaskname}
                    />
                );
            }
            let subtasklist = [];

            for (var i = 0; i < this.props.subtasklist.length; i++) {
                subtasklist.push(
                    <Subtask
                        key={i}
                        add={1}
                        showspec={this.showspec}
                        id={this.props.subtasklist[i]._id}
                        opennextcreatebox={this.opennextcreatebox}
                        openallsubtask={this.openallsubtask}
                        subtask_number={i}
                        subtask_name={this.props.subtasklist[i].subtask_name}
                        subtask_type={this.props.subtasklist[i].subtask_type}
                        subtask_option={this.props.subtasklist[i].subtask_option}
                        deletesubtask={this.deletesubtask}
                        editsubtask={this.editsubtask}
                    />
                );
                if (i === this.state.subtasknumber && this.state.createflag === 1) {
                    subtasklist.push(
                        <CreateSubtask
                            createsubtask={this.createsubtask}
                            show={this.closecreatebox}
                            key={this.props.subtasklist.length}
                        />
                    );
                }
                if (i === this.state.subtasknumber && this.state.createflag === -1) {
                    subtasklist.push(
                        <DropDown
                            createtask={this.createoldsubtask}
                            close={this.closecreatebox}
                            newcreate={this.opennextcreatebox}
                            value={this.state.subtaskname}
                            inputfield={"Specification-Name"}
                            values={this.state.subtasknames}
                            handleChange={this.handlesubtaskname}
                            key={this.props.subtasklist.length + 1}
                        />
                    );
                }
            }
            subtask = (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <div
                            style={{ flex: 1, textAlign: "center" }}
                            className={classes.productHeading}
                        >
                            {" "}
                            <Tooltip title="Back to Steps">
                                <Button
                                    variant="contained"
                                    onClick={this.showsubtask}
                                    color={"primary"}
                                >
                                    <BackIcon /> {this.props.product_name}
                                    >>
              {this.props.task_name}
                                </Button>
                            </Tooltip>

                        </div>
                        <Hidden only={["xs"]}>
                            <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>


                                <Button onClick={() => this.openallsubtask(-1)} variant="contained" color={"primary"}>
                                    Add Specification
                                    </Button>

                            </div>
                        </Hidden>
                    </div>
                    {create}
                    <div
                        style={{
                            width: "100%",
                            display: "flex",

                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <div style={{
                            flex: 1, display: "flex",

                            alignItems: "center",
                            justifyContent: "center",
                            fontSize:20
                        }}> <b>Subtask Name</b></div>
                        <div style={{
                            flex: 1, display: "flex",
                            fontSize:20,
                            alignItems: "center",
                            justifyContent: "center"
                        }}><b> Subtask Type</b></div>
                        <div style={{ flex: 1 }}> </div>
                    </div>
                    {subtasklist}
                </div>
            );
        }
        if (this.state.spec !== -1) {
            subtask = (
                <Showspec
                    back={this.showspec}
                    subtaskname={this.props.subtasklist[this.state.spec].subtask_name}
                    subtasktype={this.props.subtasklist[this.state.spec].subtask_type}
                    option={this.props.subtasklist[this.state.spec].subtask_option}
                />
            );
        }
        return (
            <div>

                {subtask}
                <Hidden only={["sm", "md", "lg", "xl"]}>
                    <Tooltip title="Add Specification">
                        <Button
                            variant="fab"
                            color="primary"
                            aria-label="Add"
                            onClick={() => this.openallsubtask(-1)}
                            className={classes.button}
                        >
                            <AddIcon />
                        </Button>
                    </Tooltip>
                </Hidden>
            </div>
        );
    }
}

SubtaskBody.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubtaskBody);
