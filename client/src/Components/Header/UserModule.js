import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import UserIcon from '@material-ui/icons/PersonPin'
import Popover from '@material-ui/core/Popover'
const styles = theme => ({
    root: {
        position: 'relative',
    },
    paper: {
        position: 'absolute',
    },
    profile: {
        display: "flex",
        flexDirection: "column",

    },
});

class ClickAway extends React.Component {
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
            <div className={classes.userRoot}>
                <Button
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    color='primary'
                    //style={{ height: "100%" }}
                    onClick={this.handleClickButton}
                >
                    <div className={classes.userName} >
                        <div>

                            <UserIcon />
                        </div>
                        <div>

                            {this.props.username}
                        </div>
                    </div>

                </Button>
                <Popover
                    open={open}
                    anchorEl={this.anchorEl}
                    onClose={this.handleClose}
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
                        <Button size="large"
                        onClick={this.props.handleProfile}
                            mini
                            fullWidth>Profile</Button>
                        {this.props.usertype === 'Admin' && (<Button size="large"
                            onClick={this.props.handleUserManagement}
                            mini
                            fullWidth>User Management</Button>)}
                        {this.props.usertype === 'Admin' && (<Button size="large"   onClick={this.props.handleCreateUser}
                            mini
                            fullWidth>Create User</Button>)}
                        <Button onClick={this.props.logout} size="large"
                            mini
                            fullWidth variant='contained' color='primary'>Log Out</Button>
                    </Paper>
                </Popover>
            </div>
        );
    }
}

ClickAway.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClickAway);