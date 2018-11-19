import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Header from "../Header/Header";
import { Checkbox, InputLabel, Button } from "@material-ui/core";
//import html2canvas from "html2canvas";
//import jsPDF from "jspdf";
import Tooltip from '@material-ui/core/Tooltip'
import { updateProjectProgress } from "../../Utils/projectAxios";
import PrintIcon from "@material-ui/icons/Print";
import { findProject } from "../../Utils/projectAxios";
import EditIcon from "@material-ui/icons/Edit";
import EditProject from "../projectn/EditProject";
const styles = theme => ({
    itemClass: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    mainStyle: {
        margin: "0% 30%",
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing.unit * 2
        }
    }
});
class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usertype: "",
            username: "",
            project: {},
            edit: false
        };
    }
    printDocument = () => {
        //const input = document.getElementById("divToPrint");
        // html2canvas(input).then(canvas => {
        //   const imgData = canvas.toDataURL("image/png");
        //   const pdf = new jsPDF();
        //   pdf.addImage(imgData, "JPEG", 0, 0);
        //   // pdf.output('dataurlnewwindow');
        //   pdf.save("download.pdf");
        // });
    };
    editProject = () => {
        this.setState({ edit: !this.state.edit });
    };
    componentDidMount() {
        let that = this;
        findProject(this.props.match.params.id, (err, data) => {
            that.setState({
                usertype: data.user.usertype,
                username: data.user.username,
                project: data.project
            });
        });
    }
    handleEdit = e => {
        this.setState({ project: e }, () => {
            this.setState({ edit: false });
        });
    };
    handleCheckChange = i => {
        let project = this.state.project;
        let inc;
        if (project.task[i].task_status === "undone") {
            project.task[i].task_status = "done";
            inc = 1;
        } else if (project.task[i].task_status === "done") {
            project.task[i].task_status = "undone";
            inc = -1;
        }
        let current_task = project.task[project.task.length - 1].task_name;
        let next_task = project.task[project.task.length - 1].task_name;
        let f = 0;
        for (let i = 0; i < project.task.length; i++) {
            if (project.task[i].task_status === "undone" && f === 0) {
                current_task = project.task[i].task_name;
                f = 1;
            } else if (project.task[i].task_status === "undone" && f === 1) {
                next_task = project.task[i].task_name;
                f = -1;
            }
        }
        let that = this;
        updateProjectProgress(
            this.state.project.project_id,
            current_task,
            next_task,
            project.task,
            inc,
            (err, data) => {
                if (data.success) {
                    that.setState({ project: data.project });
                }
            }
        );
        // this.setState({ project: project });
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.project.task && (
                    <div>
                        <Header
                            history={this.props.history}
                            username={this.state.username}
                            usertype={this.state.usertype}
                        />
                        {!this.state.edit && (
                            <div>
                                <div
                                    id="divToPrint"
                                    style={{
                                        marginTop: "1%"
                                    }}
                                >
                                    <div className={classes.mainStyle}>
                                        <Typography
                                            variant="title"
                                            gutterBottom
                                        >
                                            Project ID :{" "}
                                            {this.state.project.project_id}
                                        </Typography>

                                        <Typography
                                            variant="title"
                                            gutterBottom
                                        >
                                            Product Name :{" "}
                                            {this.state.project.product_name}
                                        </Typography>

                                        <Typography
                                            variant="title"
                                            gutterBottom
                                        >
                                            Client Name :{" "}
                                            {this.state.project.client_name}
                                        </Typography>

                                        <Typography
                                            variant="title"
                                            gutterBottom
                                        >
                                            Quantity :{" "}
                                            {this.state.project.quantity}
                                        </Typography>

                                        <Typography
                                            variant="title"
                                            gutterBottom
                                        >
                                            Deadline :{" "}
                                            {new Date(
                                                this.state.project.deadline
                                            ).toLocaleString()}
                                        </Typography>
                                        <div
                                            style={{
                                                borderBottom: "2px solid"
                                            }}
                                        />
                                    </div>
                                    <div style={{ margin: "0 5%", display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>

                                        {this.state.project &&
                                            this.state.project.task.map(
                                                (task, i) => {
                                                    return (
                                                        <div style={{ margin: '10px' }} key={i}
                                                        >
                                                            <Typography
                                                                variant="subheading"
                                                                gutterBottom
                                                            >
                                                                Step Name :{" "}
                                                                {
                                                                    task.task_name
                                                                }
                                                            </Typography>
                                                            {task.subtask.map(
                                                                (
                                                                    subtask,
                                                                    j
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={j}
                                                                        >
                                                                            <Typography
                                                                                variant="subheading"
                                                                                gutterBottom
                                                                            >
                                                                                {
                                                                                    subtask.subtask_name
                                                                                }{" "}
                                                                                :{" "}
                                                                                {
                                                                                    subtask.subtask_value
                                                                                }
                                                                            </Typography>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                            {this.state.project.project_status === 'ongoing' && (
                                                                <div>
                                                                    {task.task_status ===
                                                                        "undone" && (
                                                                            <InputLabel>
                                                                                Undone{" "}
                                                                                <Checkbox
                                                                                    color="primary"
                                                                                    onChange={() => {
                                                                                        this.handleCheckChange(
                                                                                            i
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </InputLabel>
                                                                        )}
                                                                    {task.task_status ===
                                                                        "done" && (
                                                                            <InputLabel>
                                                                                Done{" "}
                                                                                <Checkbox
                                                                                    checked={
                                                                                        true
                                                                                    }
                                                                                    color="primary"
                                                                                    onChange={() => {
                                                                                        this.handleCheckChange(
                                                                                            i
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </InputLabel>
                                                                        )}
                                                                </div>
                                                            )}
                                                            {this.state.project.project_status === 'redo' && (
                                                                <div>
                                                                    {task.task_status ===
                                                                        "undone" && (
                                                                            <InputLabel>
                                                                                Undone{" "}
                                                                                <Checkbox
                                                                                    color="primary"
                                                                                    onChange={() => {
                                                                                        this.handleCheckChange(
                                                                                            i
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </InputLabel>
                                                                        )}
                                                                    {task.task_status ===
                                                                        "done" && (
                                                                            <InputLabel>
                                                                                Done{" "}
                                                                                <Checkbox
                                                                                    checked={
                                                                                        true
                                                                                    }
                                                                                    color="primary"
                                                                                    onChange={() => {
                                                                                        this.handleCheckChange(
                                                                                            i
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </InputLabel>
                                                                        )}
                                                                </div>
                                                            )}


                                                        </div>
                                                    );
                                                }
                                            )}

                                    </div>
                                </div>
                                <Tooltip title='Print Project'>

                                    <Button
                                        onClick={() => {
                                            window.print();
                                        }}
                                        // onClick={this.printDocument}
                                        style={{ marginLeft: "5%" }}
                                    >
                                        <PrintIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title='Edit Project'>
                                    <Button
                                        // onClick={() => {
                                        //   window.print();
                                        // }}
                                        onClick={this.editProject}
                                    >
                                        <EditIcon />
                                    </Button>
                                </Tooltip>
                            </div>
                        )}
                        {this.state.edit && (
                            <EditProject
                                project={this.state.project}
                                handleEdit={this.handleEdit}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
}

Project.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Project);
