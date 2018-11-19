import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CreateSubtask from "./CreateSubtask";
import styles from "./subtaskstyle";
import Subtask from "./Subtask";
import Axios from "Utils/Axios";

import AddIcon from "@material-ui/icons/Add";

import Header from "../Header/Header";

import Tooltip from "@material-ui/core/Tooltip"
import Hidden from "@material-ui/core/Hidden/Hidden";
import Button from "@material-ui/core/Button/Button";

import Showspec from "./Showspec";

class SubtaskBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createflag: 0,
            subtasklist: [],
            showpage: "subtask",
            usertype: "",
            username: "",
            showsubtask: -1,
            spec: -1
        };
    }
    setpage = e => {
        this.setState(state => ({ showpage: e }));
        if (this.state.showpage !== "subtask") this.props.history.push("/");
    };
    opencreatebox = () => {
        let e = 1;
        this.setState(state => ({ createflag: e }));
    };
    closecreatebox = () => {
        let e = 0;
        this.setState(state => ({ createflag: e }));
    };
    createsubtask = (e, n, f) => {
        let that = this;
        Axios.createsubtask(e, n, f, function (err, data) {
            if (err) that.setState({ msgLogin: err });
            else {
                that.setState({ subtasklist: data.subtasks });
            }
        });
    };
    deletesubtask = e => {
        let that = this;
        Axios.deletesubtask(e, function (err, data) {
            if (err) that.setState({ msgLogin: err });
            else {
                that.setState({ subtasklist: data.subtasks });
            }
        });
    };
    editsubtask = (e, n, f, g) => {
        let that = this;
        Axios.editsubtask(e, n, f, g, function (err, data) {
            if (err) that.setState({ msgLogin: err });
            else {
                that.setState({ subtasklist: data.subtasks });
            }
        });
    };

    componentDidMount() {
        let that = this;
        Axios.showsubtask(function (err, data) {
            if (err) {
                that.props.history.push("/");
            } else {
                that.setState({
                    subtasklist: data.subtasks,
                    usertype: data.user.usertype,
                    username: data.user.username
                });
            }
        });
    }
    showspec = x => {
        this.setState({ spec: x });
    };

    render() {
        const { classes } = this.props;
        let subtask;
        let create;
        if (this.state.showsubtask === -1) {
            if (this.state.createflag === 1) {
                create = (
                    <CreateSubtask
                        createsubtask={this.createsubtask}
                        show={this.closecreatebox}
                    />
                );
            }
            let subtasklist = [];
            for (let i = 0; i < this.state.subtasklist.length; i++) {
                subtasklist.push(
                    <Subtask
                        key={i}
                        add={0}
                        subtask_number={i}
                        id={this.state.subtasklist[i]._id}
                        showspec={this.showspec}
                        subtask_name={this.state.subtasklist[i].subtask_name}
                        subtask_type={this.state.subtasklist[i].subtask_type}
                        subtask_option={this.state.subtasklist[i].subtask_option}
                        deletesubtask={this.deletesubtask}
                        editsubtask={this.editsubtask}
                    />
                );
            }
            subtask = (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
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
                            fontSize: 20
                        }}> <b>Subtask Name</b></div>
                        <div style={{
                            flex: 1, display: "flex",
                            fontSize: 20,
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
                    subtaskname={this.state.subtasklist[this.state.spec].subtask_name}
                    subtasktype={this.state.subtasklist[this.state.spec].subtask_type}
                    option={this.state.subtasklist[this.state.spec].subtask_option}
                />
            );
        }
        return (
            <div>
                <Header
                 page='menu'
                 item='spec'
                    history={this.props.history}
                    username={this.state.username}
                    usertype={this.state.usertype}
                />
                <div
                    className={classes.topBorder}
                >
                    <div style={{ margin: '1% 5%', flex: 1 }}>
                        Specification-List
                        </div>
                    <div className={classes.print}>




                        <Button
                            onClick={this.opencreatebox}
                            color='primary'
                            variant='contained'
                            // onClick={this.printDocument}
                            style={{ marginLeft: "5%" }}
                        >
                            ADD Specification
                                </Button>


                    </div>
                </div>
                {subtask}
                <Hidden only={["sm", "md", "lg", "xl"]}>
                    <Tooltip title='Create Specification'>
                        <Button
                            page='menu'
                            variant="fab"
                            color="primary"
                            aria-label="Add"
                            onClick={this.opencreatebox}
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
