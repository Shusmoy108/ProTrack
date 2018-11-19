import React, { Component } from "react";

import { withStyles } from "@material-ui/core";
import styles from "./productstyle";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import InputBase from "@material-ui/core/Input/Input";
import Listicon from "@material-ui/icons/List";
import Editicon from "@material-ui/icons/Edit";
import Deleteicon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "../Modal/Modal";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_name: "",
            edit_flag: 0,
            open: false
        };
    }
    modalopen = () => {
        this.setState({ open: true });
    };
    modalclose = () => {
        this.setState({ open: false });
    };
    setproductname = e => {
        this.setState({ edit_name: e.target.value });
    };
    seteditflag = () => {
        this.setState({ edit_name: this.props.product_name });
        this.setState({ edit_flag: 1 });
    };
    deleteproduct = () => {
        this.props.deleteproduct(this.props.product_name);
        this.setState({ open: false });
    };
    editproduct = () => {
        if (this.state.edit_name !== this.props.product_name && this.state.edit_name !== "")
            this.props.editproduct(this.props.product_name, this.state.edit_name);
        this.setState({ edit_flag: 0 });
    };
    showtask = () => {
        this.props.showtask(this.props.product_number);
    };
    render() {
        const { classes } = this.props;
        let product;
        let button;

        if (this.state.edit_flag === 1) {
            product = (
                <div style={{ flex: 1, textAlign: "center" }}>
                    <InputBase
                        label="Step-Name"
                        placeholder="Enter a stepname....."
                        value={this.state.edit_name}
                        onChange={this.setproductname}

                    />
                </div>
            );
            if (this.state.edit_name === this.props.product_name || this.state.edit_name === "")
                button = (
                    <div style={{ flex: 1 }}>

                        <Button
                            onClick={this.editproduct}
                            style={{ margin: '1% 1%' }}
                            variant='outlined'
                            color='primary'
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                );
            else
                button = (
                    <div style={{ flex: 1 }}>

                        <Button onClick={this.editproduct} style={{ margin: '1% 1%' }} variant='outlined'
                            color='primary'>
                            <DoneIcon />
                        </Button>
                    </div>
                );
        } else {
            product = (
                <div style={{ flex: 1, textAlign: "center" }}>
                    {this.props.product_name}
                </div>
            );
            button = (
                <div style={{ flex: 1 }}>
                    <Tooltip title='Show Steps'>

                        <Button onClick={this.showtask} variant='outlined' color='primary' style={{ margin: '1% 1%' }}>
                            <Listicon />
                        </Button>
                    </Tooltip>
                    <Tooltip title='Delete Product'>

                        <Button onClick={this.modalopen} variant='outlined' color='primary' style={{ margin: '1% 1%' }}>
                            <Deleteicon />
                        </Button></Tooltip>
                    <Tooltip title='Edit Product'>

                        <Button onClick={this.seteditflag} variant='outlined' color='primary' style={{ margin: '1% 1%' }}>
                            <Editicon />
                        </Button>
                    </Tooltip>
                </div>
            );
        }

        return (
            <div style={{ display: 'flex', width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                <Modal
                    name={this.props.product_name}
                    handleYes={this.deleteproduct}
                    handleNo={this.modalclose}
                    open={this.state.open}
                />
                {product}
                {button}
            </div>
        );
    }
}

Product.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Product);
