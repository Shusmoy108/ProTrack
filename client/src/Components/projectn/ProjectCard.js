
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from '@material-ui/core/Button'
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import red from "@material-ui/core/colors/red";
import Production from "@material-ui/icons/OpenInBrowser";
import DoneAll from "@material-ui/icons/DoneAll";
import Redo from "@material-ui/icons/Redo";
import Listicon from "@material-ui/icons/List";
import Deleteicon from "@material-ui/icons/Close";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './projectcardStyle';

class ProjectCard extends React.Component {
    state = {
        expanded: false
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes } = this.props;
        let value =
            (this.props.project.completed_task / this.props.project.total_task) * 100;
        let icon;
        if (this.props.project.project_status === "pending") {
            icon = <Tooltip title="Go to Production">
                <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    onClick={() => {
                        this.props.updateStatus(this.props.project.project_id);
                    }}
                >
                    <Production />
                </Button>
            </Tooltip>
        }
        if (
            this.props.project.project_status === "ongoing" ||
            this.props.project.project_status === "redo"
        ) {
            icon = <Tooltip title="Project Done">
                <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    onClick={() => {
                        this.props.updateStatus(this.props.project.project_id);
                    }}
                >
                    <DoneAll />
                </Button>
            </Tooltip>;
        }
        if (this.props.project.project_status === "history") {
            icon = <Tooltip title="Project Correction">
                <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    onClick={() => {
                        this.props.updateStatus(this.props.project.project_id);
                    }}
                >
                    <Redo />
                </Button>
            </Tooltip>;
        }
        let title =
            this.props.project.project_status.charAt(0).toUpperCase() +
            this.props.project.project_status.substr(1) +
            " Project";
        let subheader = parseFloat(value).toFixed(2) + " %";
        let total_task = this.props.project.total_task;
        let completed_task = this.props.project.completed_task;
        let percentage = parseFloat(value).toFixed(2)
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <div style={{ width: '60px' }}>
                            <CircularProgressbar percentage={percentage} text={`${completed_task}/${total_task}`} styles={{ text: { fontSize: '30px' }, }} />
                        </div>
                    }
                    title={title}
                    subheader={subheader}
                    action={
                        <Tooltip title="Delete Project">
                            <IconButton onClick={() => {
                                this.props.delete(this.props.project.project_id);
                            }}>
                                <Deleteicon />
                            </IconButton>
                        </Tooltip>
                    }
                />

                <CardContent
                >
                    <div style={{ display: 'flex' }}>

                        <div className={classes.labelRoot}>
                            <div className={classes.gap}>
                                Project ID
                </div>
                            <div className={classes.gap}>
                                Product Name
                </div>
                            <div className={classes.gap}>
                                Client Name
                </div>
                            <div className={classes.gap}>
                                DeadLine
                </div>
                            <div className={classes.gap}>
                                Quantity
                </div>
                            <div className={classes.gap}>
                                Current Step
                </div>
                            <div className={classes.gap}>
                                Next Step
                </div>

                        </div>
                        <div className={classes.labelRoot}>
                            <div className={classes.gap1}>
                                : {this.props.project.project_id}
                            </div>
                            <div className={classes.gap1}>
                                : {this.props.project.product_name}
                            </div>
                            <div className={classes.gap1}>
                                : {this.props.project.client_name}
                            </div>
                            <div className={classes.gap1}>
                                : {new Date(this.props.project.deadline).toLocaleDateString()},{new Date(this.props.project.deadline).toLocaleTimeString()}
                            </div>
                            <div className={classes.gap1}>
                                : {this.props.project.quantity}
                            </div>
                            <div className={classes.gap1}>
                                : {this.props.project.current_position}
                            </div>
                            <div className={classes.gap1}>
                                : {this.props.project.next_position}
                            </div>

                        </div>
                    </div>

                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <Tooltip title="Project Details">
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            onClick={() => {
                                this.props.showProject(this.props.project.project_id);
                            }}
                        >
                            <Listicon />
                        </Button>
                    </Tooltip>
                    {icon}

                </CardActions>
            </Card>
        );
    }
}

ProjectCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectCard);
