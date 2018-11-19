import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import red from "@material-ui/core/colors/red";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
//import Deleteicon from "@material-ui/icons/Delete";
//import LinearProgress from "@material-ui/core/LinearProgress";
const styles = theme => ({
    card: {
        maxWidth: 400
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    actions: {
        display: "flex"
    },
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        }),
        marginLeft: "auto",
        [theme.breakpoints.up("sm")]: {
            marginRight: -8
        }
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: red[500]
    }
});

class TaskInputCard extends React.Component {
    render() {
        const { classes } = this.props;
        let subtasks = [];
        this.props.task.subtask.forEach((subtask, j) => {
            //console.log(subtask);
            if (subtask.subtask_type === "Textfield") {
                subtasks.push(
                    <div>
                        <InputLabel
                            htmlFor="adornment-amount"
                            style={{ marginRight: 10 }}
                        >
                            {subtask.subtask_name}
                        </InputLabel>
                        <TextField
                            value={
                                this.props.taskinput.subtask[j].subtask_value
                            }
                            onChange={this.props.handleSpecChange(
                                this.props.i,
                                j
                            )}
                            margin="normal"
                            variant="outlined"
                        />
                        <FormHelperText
                            id="component-error-text"
                            style={{ color: "red" }}
                        >
                            {this.props.taskError.subtask[j].subtask_err}
                        </FormHelperText>
                    </div>
                );
            } else if (subtask.subtask_type === "Number") {
                subtasks.push(
                    <div>
                        <InputLabel
                            htmlFor="adornment-amount"
                            style={{ marginRight: 10 }}
                        >
                            {subtask.subtask_name}
                        </InputLabel>
                        <TextField
                            value={
                                this.props.taskinput.subtask[j].subtask_value
                            }
                            onChange={this.props.handleSpecChange(
                                this.props.i,
                                j
                            )}
                            margin="normal"
                            variant="outlined"
                        />
                        <FormHelperText
                            id="component-error-text"
                            style={{ color: "red" }}
                        >
                            {this.props.taskError.subtask[j].subtask_err}
                        </FormHelperText>
                    </div>
                );
            } else if (subtask.subtask_type === "Date") {
                subtasks.push(
                    <div>
                        <InputLabel
                            htmlFor="adornment-amount"
                            style={{ marginRight: 10 }}
                        >
                            {subtask.subtask_name}
                        </InputLabel>
                        <Input
                            type="datetime-local"
                            id="standard-required"
                            value={
                                this.props.taskinput.subtask[j].subtask_value
                            }
                            onChange={this.props.handleSpecChange(
                                this.props.i,
                                j
                            )}
                        />

                        <FormHelperText
                            id="component-error-text"
                            style={{ color: "red" }}
                        >
                            {this.props.taskError.subtask[j].subtask_err}
                        </FormHelperText>
                    </div>
                );
            } else if (subtask.subtask_type === "Dropdown") {
                let values = [];
                for (let k = 0; k < subtask.subtask_option.length; k++) {
                    values.push(
                        <MenuItem key={k} value={subtask.subtask_option[k]}>
                            {subtask.subtask_option[k]}
                        </MenuItem>
                    );
                }
                subtasks.push(
                    <div>
                        <InputLabel
                            htmlFor="adornment-amount"
                            style={{ marginRight: 10 }}
                        >
                            {subtask.subtask_name}
                        </InputLabel>
                        <Select
                            value={
                                this.props.taskinput.subtask[j].subtask_value
                            }
                            onChange={this.props.handleSpecChange(
                                this.props.i,
                                j
                            )}
                            input={<Input name="age" id="age-helper" />}
                        >
                            {values}
                        </Select>
                    </div>
                );
            } else if (subtask.subtask_type === "Checkbox") {
                let value = [];
                subtask.subtask_option.map((f, k) => {
                    value.push(
                        <div style={{ display: "inline-flex" }}>
                            <Checkbox
                                checked={
                                    this.props.taskinput.subtask[j]
                                        .subtask_check[k]
                                }
                                onChange={() =>
                                    this.props.handleCheckChange(
                                        this.props.i,
                                        j,
                                        k,
                                        f
                                    )
                                }
                                color="primary"
                            />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                {f}
                            </div>
                        </div>
                    );
                });
                subtasks.push(
                    <div>
                        <InputLabel
                            htmlFor="adornment-amount"
                            style={{ marginRight: 10 }}
                        >
                            {subtask.subtask_name}
                        </InputLabel>
                        <div>{value}</div>
                    </div>
                );
            }
        });
        return (
            <Card className={classes.card}>
                <CardHeader title={this.props.task.task_name} />

                <CardContent>{subtasks}</CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    {!this.props.next && (<Tooltip title='Next Step'>

                        <IconButton

                            onClick={this.props.handleNext}
                        >
                            <DoneIcon />
                        </IconButton>
                    </Tooltip>)}
                </CardActions>
            </Card>
        );
    }
}

TaskInputCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskInputCard);
