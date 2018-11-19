import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import FileIcon from "@material-ui/icons/Work";
import UserIcon from "@material-ui/icons/Person";
import Axios from "Utils/Axios";
import Hidden from "@material-ui/core/Hidden";
import styles from "./headerStyle";
import { Popover } from "@material-ui/core";
import UserModule from './UserModule';
import HeaderDesktop from "./HeaderDesktop";

class MenuAppBar extends React.Component {
    state = {
        anchorEl: null,
        project: null
    };
    handleLogout = () => {
        let that = this;
        Axios.logout(function () {
            //that.setState({logged: 'login', name: '', username: ''})
            that.props.history.push("/");
        });
        //this.setState({ anchorEl: null });
    };

    handleProfile = () => {
        this.props.history.push("/user");
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
        const { classes } = this.props;
        let button = (
            <Button color="inherit" className={classes.elementStyle}>
                ProTrack
      </Button>
        );

        let head = "",
            menu = "";

        if (this.props.usertype === "Admin") {
            head = (
                <Button
                    aria-owns={anchorEl ? "simple-menu" : null}
                    aria-haspopup="true"
                    color="inherit"
                    onClick={this.handleMenu}
                >
                    <MenuIcon />
                </Button>
            );
            menu = (
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
                    <Button onClick={() => this.handleMenuChange("product")}>
                        Products
          </Button>
                    <Button onClick={() => this.handleMenuChange("step")}>
                        Steps
          </Button>
                    <Button onClick={() => this.handleMenuChange("specification")}>
                        Specifications
          </Button>
                </Popover>
            );
        }
        return (
            <div>
                <HeaderDesktop {...this.props} />
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
