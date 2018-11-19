import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/MoreVertTwoTone";
import Axios from "Utils/Axios";
import Logo from "../../Assets/ProTrack.png"
import styles from "./headerStyle";
import { Popover } from "@material-ui/core";
import UserModule from "./UserModule";
import SendIcon from '@material-ui/icons/Send'
class MenuAppBar extends React.Component {
    state = {
        anchorEl: null,
        project: null
    };
    handleLogout = () => {
        let that = this;
        Axios.logout(function () {
            that.props.history.push("/");
        });

    };

    handleUserManagement = () => {
        this.props.history.push("/usermanagement");
    };
    handleCreateUser = () => {
        this.props.history.push("/createuser");
    };
    handleProfile = () => {
        this.props.history.push("/profile");
    };
    handleClose = () => {
        this.setState({ anchorEl: null, project: null });
    };
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleProject = event => {
        this.setState({ project: event.currentTarget });
    };
    handleMenuChange = e => {
        this.props.history.push("/" + e);
        this.setState({ anchorEl: null });
    };
    handleProjectChange = e => {
        this.props.history.push("/project/" + e);
        this.setState({ project: null });
    };
    render() {
        const { anchorEl, project } = this.state;
        const { classes, theme } = this.props;
        let style = [];
        if (this.props.page === 'ongoing') {
            style[0] = { color: theme.palette.primary.main }
        }
        else if (this.props.page === 'pending') {
            style[1] = { color: theme.palette.primary.main }
        }
        else if (this.props.page === 'history') {
            style[2] = { color: theme.palette.primary.main }
        }
        else if (this.props.page === 'menu') {
            style[3] = { color: theme.palette.primary.main }
            if (this.props.item === 'product') {
                style[5] = { color: theme.palette.primary.main }
            }
            else if (this.props.item === 'step') {
                style[6] = { color: theme.palette.primary.main }
            }
            else if (this.props.item === 'spec') {
                style[7] = { color: theme.palette.primary.main }
            }
        }
        else if (this.props.page === 'user') {
            style[4] = { color: theme.palette.primary.main }
        }
        let button = { color: theme.palette.primary.main }
        return (
            <div >
                <AppBar position="static" color='white'>
                    <Toolbar className={classes.toolbar} >
                        <div className={classes.root}>
                            <a className={classes.logo} href='/'>

                                <img
                                    src={Logo}
                                    alt="logo"
                                    className={classes.image}
                                />

                            </a>

                            <Button

                                className={classes.button}
                                onClick={() => this.handleProjectChange("ongoing")}
                            >
                                <div style={style[0]}>
                                    Running Project
                                   </div>
                            </Button>
                            <Button
                                color="inherit"
                                className={classes.button}
                                style={style[1]}
                                onClick={() => this.handleProjectChange("pending")}
                            >
                                Pending Project
                                 </Button>
                            <Button
                                color="inherit"
                                className={classes.button}
                                style={style[2]}
                                onClick={() => this.handleProjectChange("history")}
                            >
                                Project History
                                </Button>

                            {this.props.usertype === 'Admin' && (
                                <div className={classes.button} >
                                    <Button
                                        aria-owns={anchorEl ? "simple-menu" : null}
                                        aria-haspopup="true"
                                        //color="primary"
                                        style={style[3]}
                                        className={classes.button}
                                        onClick={this.handleMenu}
                                    >
                                        <MenuIcon />
                                    </Button>
                                    <Popover
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                        transformOrigin={{
                                            horizontal: "center",
                                            vertical: "top"
                                        }}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem style={style[5]} onClick={() => this.handleMenuChange("product")}>
                                            <SendIcon />{" "} Products</MenuItem>
                                        <MenuItem style={style[6]} onClick={() => this.handleMenuChange("step")}>
                                            <SendIcon />{" "} Steps</MenuItem>
                                        <MenuItem style={style[7]} onClick={() => this.handleMenuChange("specification")}>
                                            <SendIcon /> {" "}Specifications</MenuItem>
                                    </Popover>
                                </div>
                            )}

                        </div>
                        <div className={classes.userModule}>
                            <UserModule logout={this.handleLogout} style={style[4]} handleCreateUser={this.handleCreateUser} usertype={this.props.usertype} handleProfile={this.handleProfile} handleUserManagement={this.handleUserManagement} username={this.props.username} />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MenuAppBar);
