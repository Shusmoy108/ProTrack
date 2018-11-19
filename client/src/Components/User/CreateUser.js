import React, { Component } from "react";
import Header from "../Header/Header";
import Axios from "../../Utils/Axios";

//import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
import { userInput } from "../../Validator/userValidator";
import FormHelperText from "@material-ui/core/FormHelperText";
import styles from './userStyle'
import { withStyles } from "@material-ui/core";
class CreateUser extends Component {
    state = {
        username: "",
        name: "",
        newusername: "",
        newname: "",
        password: "",
        glbErr: "",
        usertype: "",
        newusertype: "",
        showPassword: false,
        errors: {}
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    componentDidMount() {
        let that = this;
        Axios.getProfile(function (err, data) {
            if (!err) {
                that.setState(
                    {
                        usertype: data.usertype,
                        username: data.username,
                        id: data._id,
                        name: data.name
                    }
                );
            } else {
                that.history.push("/");
            }
        });
    }
    handleAdd = () => {
        let data = {
            name: this.state.newname,
            username: this.state.newusername,
            usertype: this.state.newusertype,
            password: this.state.password
        };

        const { errors, isValid } = userInput(data);
        if (!isValid) {
            this.setState({ errors: errors });
        } else {
            this.props.add(data.name, data.username, data.password, data.usertype);
        }
    };
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    render() {
        const {classes}= this.props;
        return (
            <div>
            <Header
                history={this.props.history}
                username={this.state.username}
                usertype={this.state.usertype}
            />
            <div
                className={classes.border}
            >
                <div style={{ margin: '1% 5%' }}>
                    Create User
                    </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:'center',
                    alignItems:'center'
                }}
            >
                <FormHelperText id="component-error-text" style={{ color: "red" }}>
                    {this.props.glbErr}
                </FormHelperText>
                <div>
                    <TextField
                        label="User-Name"
                        value={this.state.newusername}
                        onChange={this.handleChange("newusername")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle />
                                </InputAdornment>
                            )
                        }}
                    />
                    <FormHelperText id="component-error-text" style={{ color: "red" }}>
                        {this.state.errors.username}
                    </FormHelperText>
                </div>
                <div>
                    <TextField
                        label="Name"
                        value={this.state.newname}
                        onChange={this.handleChange("newname")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle />
                                </InputAdornment>
                            )
                        }}
                    />
                    <FormHelperText id="component-error-text" style={{ color: "red" }}>
                        {this.state.errors.name}
                    </FormHelperText>
                </div>
                <div>
                    <TextField
                        label="Password"
                        id="adornment-password"
                        type={this.state.showPassword ? "text" : "password"}
                        value={this.state.password}
                        onChange={this.handleChange("password")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                                <Visibility />
                                            )}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <FormHelperText id="component-error-text" style={{ color: "red" }}>
                        {this.state.errors.password}
                    </FormHelperText>
                </div>
                <div>
                    <InputLabel>User-Type</InputLabel>
                    <Radio
                        checked={this.state.newusertype === "Manager"}
                        onChange={this.handleChange("newusertype")}
                        value="Manager"
                        name="radio-button-demo"
                        aria-label="A"
                    />
                    Manager
          <Radio
                        checked={this.state.newusertype === "Admin"}
                        onChange={this.handleChange("newusertype")}
                        value="Admin"
                        name="radio-button-demo"
                        aria-label="B"
                    />
                    Admin
        </div>
                <FormHelperText id="component-error-text" style={{ color: "red" }}>
                    {this.state.errors.usertype}
                </FormHelperText>
                <div  style={{margin:'2% 0'}}>
                   

                        <Button onClick={this.handleAdd} variant='contained' color='primary'>
                            Create User
                        </Button>
                   
                </div>
            </div>
            </div>
        );
    }
}

export default withStyles(styles)( CreateUser);
