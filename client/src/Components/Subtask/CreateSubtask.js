import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input/Input'
import InputBase from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip'
import styles from './subtaskstyle';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button"
import DoneIcon from "@material-ui/icons/Done"
import CloseIcon from "@material-ui/icons/Close"

let options = [];
class CreateSubtask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subtask_name: "",
            subtask_type: "Textfield",
            subtask_option: [],
            option: ""
        };
    }

    setcreateflag = () => {
        if (this.state.subtask_name && this.state.option === "") {
            this.props.createsubtask(this.state.subtask_name, this.state.subtask_type, this.state.subtask_option);
            this.props.show();
        }
        else if (this.state.option !== "") {
            options.push(this.state.option);
            this.setState({ option: "" });
            this.setState({ subtask_option: options });
        } else {
        }
    };
    handleOptionDelete = (i) => {
        let option = this.state.subtask_option;
        option.splice(i, 1);
        //console.log(option, i);
        this.setState({ edit_option: option });
    }
    closebox = () => {
        this.props.show();
    };
    handleChange = (event) => {
        //this.setState({ subtask_option: [] });
        //options = [];
        this.setState({ subtask_type: event.target.value });
    };
    setsubtaskname = (e) => {
        this.setState({ subtask_name: e.target.value });
    };
    setoption = (e) => {
        this.setState({ option: e.target.value });
    };
    render() {

        const { classes } = this.props;
        let button;
        let option1 = [];
        let inputbox, inputlabel;

        if ((this.state.subtask_type === "Dropdown" || this.state.subtask_type === "Checkbox")) {
            for (let i = 0; i < this.state.subtask_option.length; i++) {
                option1.push(<div key={i}>Option {i + 1}:  {this.state.subtask_option[i]}<Button onClick={() => { this.handleOptionDelete(i) }}><CloseIcon /></Button></div>);
            }
            inputlabel = <div>Specification Options </div>;
            inputbox = <div>
                <InputBase
                    id="subtasknameiuiu"
                    placeholder="Enter a Options....."
                    value={this.state.option}
                    onChange={this.setoption}
                    classes={{
                        root: classes.bootstrapRoot,

                    }}
                />
            </div>
        }
        if (this.state.subtask_name === "" && this.state.option === "")
            button = <Tooltip title='Close'>
                <Button color='primary' variant='outlined'
                    onClick={this.closebox}
                ><CloseIcon /></Button>
            </Tooltip>
        else
            button = <Tooltip title='Add Specification'>
                <Button color='primary' variant='outlined'
                    onClick={this.setcreateflag}
                ><DoneIcon /></Button>
            </Tooltip>
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1% 0', width: "100%", }}>
                <div style={{ flex: 1, alignItems: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                    <div>
                        Specification-Name
                </div>
                    <div>

                        <InputBase
                            id="productname"
                            placeholder="Enter a Specification name....."
                            value={this.state.subtask_name}
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
                            value={this.state.subtask_type}
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
                    {button}
                </div>


            </div>
        );
    }
}

CreateSubtask.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateSubtask);
