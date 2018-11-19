import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input/Input'
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button"
import DoneIcon from "@material-ui/icons/Done"
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import styles from './dropdownStyle'
class SimpleSelect extends React.Component {
    state = {
        age: '',
        name: 'hai',
        labelWidth: 0,
    };
    handleChange = event => {
        this.props.handleChange(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    };
    handleNew = () => {
        this.props.newcreate();
    }
    render() {
        let values = [];
        const { classes } = this.props
        for (let i = 0; i < this.props.values.length; i++) {
            values.push(<MenuItem key={i} value={this.props.values[i]}>{this.props.values[i]}</MenuItem>)
        }
        return (

            <div className={classes.root}>
                <div style={{ flex: 1, textAlign: 'center' }}>

                    <InputLabel shrink htmlFor="productname" style={{ fontSize: 15, marginRight: 10 }}>
                        {this.props.inputfield}
                    </InputLabel>
                    <Select
                        value={this.props.value}
                        onChange={this.handleChange}
                        input={<Input name="age" id="age-helper" />}
                    >
                        {values}
                    </Select>
                </div>
                <div style={{ flex: 1 }}>

                    <Button
                        onClick={this.props.createtask}
                        style={{ margin: '1% 1%' }}
                        variant='contained'
                        color='primary'
                    >Add</Button>

                    <Button
                        onClick={this.handleNew}
                        style={{ margin: '1% 1%' }}
                        variant='contained'
                        color='primary'
                    >New</Button>


                    <Button
                        style={{ margin: '1% 1%' }}
                        variant='contained'
                        color='primary'
                        onClick={this.props.close}
                    >Close</Button>

                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SimpleSelect);