import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Header from "../Header/Header";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CreateUser from "./CreateUser";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import {
    insertUser,
    getUsers,
    editUser,
    deleteUser
} from "../../Utils/userAxios";
import Axios from "../../Utils/Axios";
import UserCard from "./UserCard";
import Tooltip from "@material-ui/core/Tooltip";
import LogoutIcon from "@material-ui/icons/Launch";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
import { usereditInput } from "../../Validator/userValidator";
import FormHelperText from "@material-ui/core/FormHelperText";
import styles from './userStyle'

class UserPage extends Component {
    state = {
        create: false,
        glbErr: "",
        editErr: [],
        userList: [],
        edit: false,
        errors: {},
        id: null,
        proErr: ""
    };
    handleAdd = () => {
        this.setState({ create: !this.state.create, glbErr: "" });
    };
    handlecreate = (name, username, password, usertype) => {
        let that = this;
        insertUser(name, username, password, usertype, (err, data) => {
            if (data.success) {
                let userList = that.state.userList;
                userList.push(data.newUser);
                that.setState({
                    create: !this.state.create,
                    userList: userList,
                    glbErr: ""
                });
            } else {
                that.setState({ glbErr: data.err.msg });
            }
        });
    };
    handleEdit = (i, id, name, username, usertype, cb) => {
        let that = this;
        editUser(id, name, username, usertype, (err, data) => {
            if (data.success) {
                let userList = this.state.userList;
                let index = userList.findIndex(el => el._id === id);
                userList[index] = data.user;
                that.setState({ userList: userList });
                cb(null, true);
            } else {
                let editErr = this.state.editErr;
                editErr[i] = data.err.msg;
                cb(null, false);
                that.setState({ editErr: editErr });
            }
        });
    };
    handleDelete = (i, id, cb) => {
        let that = this;
        deleteUser(id, (err, data) => {
            if (data.success) {
                let userList = this.state.userList;
                userList.splice(i, 1);
                that.setState({ userList: userList });
                cb(null, true);
            }
        });
    };
    handleEditBool = () => {
        this.setState({ edit: !this.state.edit });
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
                    },
                    () => {
                        if (that.state.usertype === "Admin") {
                            getUsers((err, data) => {
                                if (!err) {
                                    if (data.success) {
                                        let userList = data.users;
                                        userList = userList.filter(
                                            el => el.username !== that.state.username
                                        );
                                        that.setState({ userList: userList });
                                    }
                                }
                            });
                        }
                    }
                );
            } else {
                that.history.push("/");
            }
        });
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    handleEditProfile = () => {
        let data = {
            name: this.state.name,
            username: this.state.username,
            usertype: this.state.usertype
        };

        const { errors, isValid } = usereditInput(data);
        if (!isValid) {
            this.setState({ errors: errors });
        } else {
            this.setState({ errors: errors });
            let that = this;
            editUser(
                this.state.id,
                this.state.name,
                this.state.username,
                this.state.usertype,
                (err, data) => {
                    if (data.success) {
                        that.setState(
                            {
                                username: data.user.username,
                                usertype: data.user.usertype,
                                name: data.user.name,
                                proErr: "",
                                edit: false
                            },
                            () => { }
                        );
                    } else {
                        that.setState({ proErr: data.err.msg });
                    }
                }
            );
        }
    };
    render() {
        const { classes } = this.props;
        let user = (
            <div>
                <p>User - Name : {this.state.username}</p>
                <p>Name : {this.state.name}</p>
                <p> User Type: {this.state.usertype}</p>
            </div>
        );
        if (this.state.edit) {
            user = (
                <div>
                    <FormHelperText
                        id="component-error-text"
                        style={{ color: "red", textAlign: "center" }}
                    >
                        {this.state.proErr}
                    </FormHelperText>
                    <div>
                        <TextField
                            label="User-Name"
                            value={this.state.username}
                            onChange={this.handleChange("username")}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormHelperText
                            id="component-error-text"
                            style={{ color: "red", textAlign: "center" }}
                        >
                            {this.state.errors.username}
                        </FormHelperText>
                    </div>
                    <div>
                        <TextField
                            label="Name"
                            value={this.state.name}
                            onChange={this.handleChange("name")}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormHelperText
                            id="component-error-text"
                            style={{ color: "red", textAlign: "center" }}
                        >
                            {this.state.errors.name}
                        </FormHelperText>
                    </div>
                    <Tooltip title='Done Editing'>
                        <Button onClick={this.handleEditProfile}>
                            <DoneIcon />
                        </Button>
                    </Tooltip>
                </div>
            );
        }
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
                        User Management
                        </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    {this.state.userList.map((user, i) => {
                        return (
                            <div style={{ margin: 10 }}>
                                <UserCard
                                    key={i}
                                    i={i}
                                    user={user}
                                    glbErr={this.state.editErr[i]}
                                    edit={this.handleEdit}
                                    delete={this.handleDelete}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(UserPage);
