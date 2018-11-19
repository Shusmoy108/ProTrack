import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Button from "@material-ui/core/Button"
import Down from '@material-ui/icons/ArrowDropDown'
import Paper from '@material-ui/core/Paper';

import Popover from '@material-ui/core/Popover'
import { TextField } from '@material-ui/core';

class SimpleSelect extends React.Component {
    state = {
        open: false,
        anchorOriginVertical: 'top',
        anchorOriginHorizontal: 'left',
        transformOriginVertical: 'top',
        transformOriginHorizontal: 'left',
        positionTop: 200, // Just so the popover can be spotted more easily
        positionLeft: 400, // Same as above
        anchorReference: 'anchorEl',
    };
    handleClickButton = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClick = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };

    handleClickAway = () => {
        this.setState({
            open: false,
        });
    };
    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div style={{ display: "flex", margin: '0 20px' }}>
                <div style={{ borderBottom: 'ridge' }}>
                    {this.props.value}
                </div>

                <Button
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    color='primary'
                    style={{ padding: 0, minHeight: 0, minWidth: 0 }}
                    onClick={this.props.handleOpen}
                ><Down />

                </Button>
                <Popover
                    open={this.props.open}
                    anchorEl={this.anchorEl}
                    onClose={this.props.handleOpen}
                    className={classes.profile}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Paper elevation={3} style={{ width: 150 }}>
                        {this.props.options.map((option, i) => {
                            return (<Button size="large" key={i}
                                mini
                                fullWidth onClick={() => this.props.change(option)}>{option}</Button>)
                        })}
                    </Paper>
                </Popover>
            </div>
        );
    }


}


export default withStyles()(SimpleSelect);