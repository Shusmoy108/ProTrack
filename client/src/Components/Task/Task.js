import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./taskstyle";
import PropTypes from "prop-types";
import InputBase from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Listicon from "@material-ui/icons/List";
import Editicon from "@material-ui/icons/Edit";
import Deleteicon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Modal from "../Modal/Modal";
class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_name: "",
            edit_flag: 0,
            task_name: "",
            createflag: 0,
            open: false
        };
    }
    opencreatebox = () => {
        this.props.opennextcreatebox(this.props.task_number);
    };
    settaskname = e => {
        this.setState({ edit_name: e.target.value });
    };
    seteditflag = () => {
        this.setState({ edit_name: this.props.task_name });
        this.setState({ edit_flag: 1 });
    };
    deletetask = () => {
        this.props.deletetask(this.props.task_name);
        this.setState({ open: false });
    };
    edittask = () => {
        if (this.state.edit_name !== this.props.task_name && this.state.edit_name !== "")
            this.props.edittask(this.props.task_name, this.state.edit_name);
        this.setState({ edit_flag: 0 });
    };
    showsubtask = () => {
        this.props.showsubtask(this.props.task_number);
    };
    modalopen = () => {
        this.setState({ open: true });
    };
    modalclose = () => {
        this.setState({ open: false });
    };
    render() {
        // const { classes } = this.props;
        let task;
        let button;

        if (this.state.edit_flag === 1) {
            task = (
                <div style={{ flex: 1, textAlign: "center" }}
                >
                    <InputBase
                        label="Step-name"
                        placeholder="Enter a Taskname....."
                        value={this.state.edit_name}
                        onChange={this.settaskname}

                    />
                </div>
            );
            if (this.state.edit_name === this.props.task_name || this.state.edit_name === "")
                button = (
                    <div style={{ flex: 1 }}>

                        <Tooltip title='Close' >
                            <Button onClick={this.edittask}   style={{ margin: '1% 1%' }}
                            variant='outlined'
                            color='primary'>
                                <CloseIcon />
                            </Button>
                        </Tooltip>
                    </div>
                );
            else
                button = (
                    <div style={{ flex: 1 }}>

                        <Tooltip title='Edit Step'>
                            <Button onClick={this.edittask}   style={{ margin: '1% 1%' }}
                            variant='outlined'
                            color='primary'>
                                <DoneIcon />
                            </Button>
                        </Tooltip>
                    </div>
                );
        } else {
            let add;
            if (this.props.add === 1) {
                add = (
                    <Tooltip title='Add Step'>
                        <Button
                            onClick={() =>
                                this.props.openalltask(this.props.task_number)
                            }
                            style={{ margin: '1% 1%' }}
                            variant='outlined'
                            color='primary'
                        >
                            <AddIcon />
                        </Button>
                    </Tooltip>
                );
            }
            task = (
                <div style={{ flex: 1, textAlign: "center" }}>
                    {this.props.task_name}
                </div>
            );
            button = (
                <div
                    style={{ flex: 1 }}
                >
                    <Tooltip title='Show step details'>
                        <Button onClick={this.showsubtask}  style={{ margin: '1% 1%' }}
                            variant='outlined'
                            color='primary'>
                            <Listicon />
                        </Button>
                    </Tooltip>
                    {add}
                    <Tooltip title='Delete Step'>
                        <Button onClick={this.modalopen}  style={{ margin: '1% 1%' }}
                            variant='outlined'
                            color='primary'>
                            <Deleteicon />
                        </Button>
                    </Tooltip>
                    <Tooltip title='Edit Step'>
                        <Button onClick={this.seteditflag}  style={{ margin: '1% 1%' }}
                            variant='outlined'
                            color='primary'>
                            <Editicon />
                        </Button>
                    </Tooltip>
                </div>
            );
        }

        return (
            <div style={{ display: 'flex', width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                <Modal
                    name={this.props.task_name}
                    handleYes={this.deletetask}
                    handleNo={this.modalclose}
                    open={this.state.open}
                />
                {task}
                {button}
            </div>
        );
    }
}

Task.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Task);
