import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import InputBase from "@material-ui/core/TextField";
import styles from "./productstyle";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: ""
        };
    }

    setcreateflag = () => {
        if (this.state.product_name)
            this.props.createproduct(this.state.product_name);
        this.props.show();
    };

    setproductname = e => {
        this.setState({ product_name: e.target.value });
    };

    render() {
        //const { classes } = this.props;
        let button;
        if (this.state.product_name === "")
            button = (
                <Tooltip title='Close'>

                    <Button onClick={this.setcreateflag} variant='outlined' color='primary' style={{ margin: '1% 1%' }}>
                        <CloseIcon />
                    </Button>
                </Tooltip>
            );
        else
            button = (
                <Tooltip title='Create New Product'>

                    <Button onClick={this.setcreateflag} variant='outlined' color='primary' style={{ margin: '1% 1%' }}>
                        <DoneIcon />
                    </Button>
                </Tooltip>
            );
        return (
            <div style={{ display: 'flex', width: "100%", alignItems: 'center', justifyContent: 'center' }} >
                <div style={{ flex: 1, textAlign: "center" }}>
                    <InputBase
                        label="Product-Name"
                        id="productname"
                        placeholder="Enter a productname....."
                        value={this.state.product_name}
                        onChange={this.setproductname}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Button disabled style={{ margin: '1% 1%' }} />
                    {button}
                </div>

            </div>
        );
    }
}

CreateProduct.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateProduct);
