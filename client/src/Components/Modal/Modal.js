import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

class DialogModal extends React.Component {
    state = {
        open: false
    };

    handleNo = () => {
        this.props.handleNo();
    };
    handleYes = () => {
        this.props.handleYes();
    };
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleNo}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Are you sure you want to delete {this.props.name}?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleYes} color="primary">
                            Yes
                        </Button>
                        <Button
                            onClick={this.handleNo}
                            color="primary"
                            autoFocus
                        >
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
DialogModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleYes: PropTypes.func.isRequired,
    handleNo: PropTypes.func.isRequired
};
export default DialogModal;
