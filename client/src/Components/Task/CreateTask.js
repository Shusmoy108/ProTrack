import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip'
import styles from './taskstyle';
import Button from "@material-ui/core/Button"
import DoneIcon from "@material-ui/icons/Done"
import CloseIcon from "@material-ui/icons/Close"
class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task_name: ""
        };
    }
    setcreateflag = () => {
        if (this.state.task_name)
            this.props.createtask(this.state.task_name);
        this.props.show();
    };
    closebox = () => {
        this.props.show();
    };
    settaskname = (e) => {
        this.setState({ task_name: e.target.value });
    };
    render() {
        const { classes } = this.props;
        let button;
        if (this.state.task_name === "")
            button = <Tooltip title='Close'>
                <Button style={{ margin: '1% 3%' }}
                    variant='outlined'
                    color='primary'
                    onClick={this.closebox}

                ><CloseIcon /></Button>
            </Tooltip>
        else
            button = <Tooltip title='Create Step'>
                <Button style={{ margin: '1% 3%' }}
                    variant='outlined'
                    color='primary'
                    onClick={this.setcreateflag}
                    style={{ paddingLeft: 15, paddingTop: 5 }}
                ><DoneIcon /></Button>
            </Tooltip>
        return (
            <div style={{ display: 'flex', width: "100%", alignItems: 'center', justifyContent: 'center' }} >
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <InputBase
                        label="Step-Name"
                        placeholder="Enter a Step name....."
                        value={this.state.task_name}
                        onChange={this.settaskname}
                        classes={{
                            root: classes.bootstrapRoot,
                            input: classes.bootstrapInput,
                        }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Button disabled >{" "}</Button>

                    {button}
                </div>

            </div>
        );
    }
}

CreateTask.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateTask);
