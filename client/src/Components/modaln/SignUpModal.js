import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockIcon from '@material-ui/icons/LockRounded'
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from '@material-ui/core/TextField';
import SignUp from '@material-ui/icons/PlayForWork'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from "@material-ui/core/InputAdornment";

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from "@material-ui/core";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        flexBasis: 200,
    },
});
function Transition(props) {
    return <Slide direction="down" {...props} />;
}
class SignUpModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_number: "",
            password: "",
            name: "",
            confirm: "",
            showPassword: false,
            confirmPassword: false,
            remember: false
        };
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    handleClickConfirmPassword = () => {
        this.setState(state => ({ confirmPassword: !state.confirmPassword }));
    };

    isSelected = () => {
        this.setState({ remember: !this.state.remember });
    };

    render() {

        const { classes } = this.props;
        console.log('Login')
        return (

            <Dialog
                fullWidth={true}
                maxWidth={"xs"}
                open={this.props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Science Patshala
                    </DialogTitle>


                <DialogContent>
                    <TextField
                        id="outlined-adornment-password"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        type='text'
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChange('name')}

                    />
                    <TextField
                        id="outlined-adornment-password"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        type='text'
                        label="Phone Number"
                        value={this.state.phone_number}
                        onChange={this.handleChange('phone_number')}

                    />
                    <TextField
                        id="outlined-adornment-password"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        type={this.state.showPassword ? 'text' : 'password'}
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="outlined-adornment-password"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        type={this.state.confirmPassword ? 'text' : 'password'}
                        label="Confirm Password"
                        value={this.state.confirm}
                        onChange={this.handleChange('confirm')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickConfirmPassword}
                                    >
                                        {this.state.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <DialogContentText id="alert-dialog-slide-description">
                        <Checkbox
                            checked={this.state.remember}
                            onChange={this.isSelected}
                        />
                        <InputLabel
                            htmlFor="adornment-amount"
                            style={{ marginRight: 10 }}
                        >
                            Remember Me
                            </InputLabel>
                    </DialogContentText>
                </DialogContent>

                <DialogActions style={{ flexDirection: 'column' }}>
                    <Button onClick={this.handleClose} color="secondary" variant='contained' style={{ margin: '3% 0' }}>
                        Sign Up <SignUp />
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }
}
SignUpModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired
};

export default withStyles(styles)(SignUpModal);
