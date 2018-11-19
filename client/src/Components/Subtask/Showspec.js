import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContent } from "@material-ui/core";

class DialogModal extends React.Component {
    state = {
        open: false
    };

    handleClose = () => {
        this.props.handleClose();
    };
    ;
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Specification Details
                    </DialogTitle>
                    <DialogContent>
                        Specification name: {this.props.subtask_name}
                    </DialogContent>
                    <DialogContent>
                        Specification type: {this.props.subtask_type}
                    </DialogContent>
                    <DialogContent>
                        Specification Option: {this.props.subtask_option.map((option, i) => {
                            return (<div>Option {i + 1} : {option}</div>)
                        })}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
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