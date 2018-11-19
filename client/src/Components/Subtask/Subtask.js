import React, { Component } from "react";

import { withStyles, Checkbox } from "@material-ui/core";
import styles from "./subtaskstyle";
import PropTypes from "prop-types";
import InputBase from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import Listicon from "@material-ui/icons/List";
import Editicon from "@material-ui/icons/Edit";
import Deleteicon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Hidden from "@material-ui/core/Hidden";
import Showspec from "./Showspec";
import Modal from "../Modal/Modal";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input/Input'
let options = [];
class Subtask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_name: this.props.subtask_name,
            edit_type: this.props.subtask_type,
            edit_option: this.props.subtask_option,
            option: "",
            edit_flag: 0,
            spec: -1,
            open: false,
            openSpec: false,
        };
    }
    handleOpen = () => {
        this.setState({ openSpec: !this.state.openSpec })
    }
    modalopen = () => {
        this.setState({ open: true });
    };
    modalclose = () => {
        this.setState({ open: false });
    };
    setoption = e => {
        this.setState({ option: e.target.value });
    };
    setsubtaskname = e => {
        this.setState({ edit_name: e.target.value });
    };
    seteditflag = () => {
        this.setState({ edit_name: this.props.subtask_name, edit_type: this.props.subtask_type, edit_option: this.props.subtask_option }, () => {
            this.setState({ edit_flag: 1 });
        });

    };
    deletesubtask = () => {
        this.props.deletesubtask(this.props.subtask_name);
        this.setState({ open: false });
    };
    closebox = () => {
        this.setState({ edit_flag: 0 });
    };
    opencreatebox = () => {
        this.props.opennextcreatebox(this.props.subtask_number);
    };
    editsubtask = () => {
        if (
            (this.state.edit_name !== this.props.subtask_name ||
                this.state.edit_type !== this.props.subtask_type) &&
            this.state.option === ""
        ) {
            this.props.editsubtask(
                this.props.id,
                this.state.edit_name,
                this.state.edit_type,
                this.state.edit_option
            );
            this.setState({ edit_flag: 0 });
        } else if (this.state.option !== "") {
            let option = this.state.edit_option;
            option.push(this.state.option);
            this.setState({ option: "" });
            this.setState({ edit_option: option });
        }
    };
    handleOptionDelete = (i) => {
        let option = this.state.edit_option;
        option.splice(i, 1);
        //console.log(option, i);
        this.setState({ edit_option: option });
    }
    handleOptionAdd = () => {
        let option = this.state.edit_option;
        option.push(this.state.option);

        this.setState({ edit_option: option });
    }
    createnextsubtask = () => {
        this.props.createnexttask(this.props.subtask_number);
    };
    handleChange = event => {
        //this.setState({ edit_option: [] });
        // options = [];
        this.setState({ edit_type: event.target.value });
    };
    showspec = () => {
        this.props.showspec(this.props.subtask_number);
    };
    render() {
        const { classes } = this.props;
        let subtask, subtasktype;
        let button;
        let option1 = [];
        let inputbox, inputlabel;
        let label1, label2, input1, radio;

        if (this.state.edit_flag === 1) {
            let button1;
            if (
                this.state.edit_type === "Dropdown" ||
                this.state.edit_type === "Checkbox"
            ) {
                for (let i = 0; i < this.state.edit_option.length; i++) {
                    option1.push(
                        <FormLabel key={i} className={classes.group}>
                            Option {i + 1}: {this.state.edit_option[i]}<Button onClick={() => { this.handleOptionDelete(i) }}>
                                <CloseIcon />
                            </Button>
                        </FormLabel>
                    );
                }
                inputlabel = (
                    <FormLabel className={classes.bootstrapFormLabel}>
                        Specification Options{" "}
                    </FormLabel>
                );
                inputbox = (
                    <InputBase
                        id="subtasknameiuiu"
                        placeholder="Enter a Options....."
                        value={this.state.option}
                        onChange={this.setoption}
                        classes={{
                            root: classes.bootstrapRoot
                        }}
                    />
                );
            }
            if (
                this.state.edit_name === this.props.subtask_name &&
                this.state.edit_type === this.props.subtask_type &&
                this.state.option === ""
            ) {
                button1 = (
                    <div>
                        <Button onClick={this.closebox} color='primary' variant='outlined'>
                            <CloseIcon />
                        </Button>
                    </div>
                );
            } else {
                button1 = (
                    <div>

                        <Button onClick={this.editsubtask} color='primary' variant='outlined'>
                            <DoneIcon />
                        </Button>
                    </div>
                );
            }
            subtask = (

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1% 0', width: "100%", }}>
                    <div style={{ flex: 1, alignItems: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                        <div>
                            Specification-Name
                </div>
                        <div>

                            <InputBase
                                id="productname"
                                placeholder="Enter a Specification name....."
                                value={this.state.edit_name}
                                onChange={this.setsubtaskname}
                                classes={{
                                    root: classes.bootstrapRoot,

                                }}
                            />
                        </div>
                    </div>
                    <div style={{ flex: 1, alignItems: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                        <div >Specification Type</div>
                        <div>

                            <Select
                                value={this.state.edit_type}
                                onChange={this.handleChange}
                                input={<Input name="age" id="age-helper" />}
                            >
                                <MenuItem value="Textfield">Textfield</MenuItem>
                                <MenuItem value="Number">Number</MenuItem>
                                <MenuItem value="Date">Date</MenuItem>
                                <MenuItem value="Dropdown">Dropdown</MenuItem>
                                <MenuItem value="Checkbox">Checkbox</MenuItem>

                            </Select>
                        </div>
                        {/* <RadioGroup
                        aria-label="Spectype"
                        name="spec"
                        className={classes.group}
                        value={this.state.subtask_type}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel
                            value="Textfield"
                            control={<Radio />}
                            label="Textfield"
                        />
                        <FormControlLabel value="Number" control={<Radio />} label="Number" />
                        <FormControlLabel value="Date" control={<Radio />} label="Date" />
                        <FormControlLabel value="Dropdown" control={<Radio />} label="Dropdown" />
                        <FormControlLabel value="Checkbox" control={<Radio />} label="Checkbox" />
                    </RadioGroup> */}
                    </div>
                    <div style={{ flex: 1, alignItems: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                        {inputlabel}
                        {option1}
                        {inputbox}
                    </div>
                    <div style={{ flex: 1, alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                        {button1}
                    </div>
                </div>

            );
        } else {
            subtask = (
                <div style={{ flex: 1, textAlign: "center" }}>
                    {this.props.subtask_name}
                </div>
            );
            subtasktype = (
                <Hidden only={["xs"]}>
                    <div style={{ flex: 1, textAlign: "center" }}>
                        {this.props.subtask_type}
                    </div>
                </Hidden>
            );
            let add;
            if (this.props.add === 1) {
                add = (
                    <Tooltip title='Add Specification'>
                        <Button color='primary' variant='outlined' style={{ margin: '1% 1%' }}
                            onClick={() => this.props.openallsubtask(this.props.subtask_number)}
                        >
                            <AddIcon />
                        </Button>
                    </Tooltip>
                );
            }
            button = (
                <div style={{ flex: 1 }}>
                    <Tooltip title='Specification Details'>
                        <Button onClick={this.handleOpen} color='primary' variant='outlined' style={{ margin: '1% 1%' }}>
                            <Listicon />
                        </Button>
                    </Tooltip>
                    {add}
                    <Tooltip title='Delete Specifiaction'>
                        <Button onClick={this.modalopen} color='primary' variant='outlined' style={{ margin: '1% 1%' }}>
                            <Deleteicon />
                        </Button>
                    </Tooltip>
                    <Tooltip title='Edit Specification'>
                        <Button onClick={this.seteditflag} color='primary' variant='outlined' style={{ margin: '1% 1%' }}>
                            <Editicon />
                        </Button>
                    </Tooltip>
                </div>
            );
        }
        if (this.state.spec === -1) {
        } else {

        }
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Showspec open={this.state.openSpec} handleClose={this.handleOpen} subtask_name={this.props.subtask_name} subtask_type={this.props.subtask_type} subtask_option={this.props.subtask_option} />
                <Modal
                    name={this.props.subtask_name}
                    handleYes={this.deletesubtask}
                    handleNo={this.modalclose}
                    open={this.state.open}
                />
                {subtask}
                {subtasktype}
                {button}
            </div>
        );
    }
}

Subtask.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Subtask);
