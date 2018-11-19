import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Header from "../Header/Header";
import { Checkbox, InputLabel, Button } from "@material-ui/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Tooltip from '@material-ui/core/Tooltip'
import { updateProjectProgress } from "../../Utils/projectAxios";
import PrintIcon from "@material-ui/icons/Print";
import { findProject, printProject } from "../../Utils/projectAxios";
import styles from './projectStyle';
import EditProject from "./EditProject";
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
        const input = document.getElementById("divToPrint");
        console.log(input)
        printProject(this.state.project, (err, data) => {

            console.log('pdf');

        })
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
                        {!this.state.edit && (<div
                            className={classes.topBorder}
                        >
                            <div style={{ margin: '1% 5%', flex: 1 }}>
                                Project Deatils
                        </div>
                            <div className={classes.print}>


                                <Tooltip title='Print Project'>

                                    <Button
                                        // onClick={() => {
                                        //     window.print();
                                        // }}
                                        color='primary'
                                        variant='outlined'
                                        onClick={this.printDocument}
                                        style={{ marginLeft: "5%" }}
                                    >
                                        <PrintIcon />
                                    </Button>
                                </Tooltip>

                            </div>
                        </div>)}

                        {!this.state.edit && (
                            <div>
                                <div
                                    id="divToPrint"
                                    style={{
                                        marginTop: "1%"
                                    }}
                                >
                                    <div className={classes.border}>

                                        <div className={classes.dektopColumn}>
                                            < div className={classes.label}> Project ID </div>
                                            <div className={classes.label}> Product Name </div>
                                            <div className={classes.label}> Quantity  </div>
                                        </div>
                                        <div className={classes.dektopInput}>
                                            <div className={classes.input}> {this.state.project.project_id}</div>
                                            <div className={classes.input}> {this.state.project.product_name} </div>
                                            <div className={classes.input}> {this.state.project.quantity}  </div>
                                        </div>


                                        <div className={classes.dektopColumn}>

                                            <div className={classes.label}> Client Name </div>
                                            <div className={classes.label}> Deadline  </div>
                                        </div>
                                        <div className={classes.dektopInput}>

                                            <div className={classes.input}> {this.state.project.client_name} </div>
                                            <div className={classes.input}> {new Date(this.state.project.deadline).toLocaleDateString()} , {new Date(this.state.project.deadline).toLocaleTimeString()}  </div>
                                        </div>

                                    </div>
                                    <div className={classes.borderMobile}>
                                        <div> Project ID : {this.state.project.project_id} </div>
                                        <div> Product Name : {this.state.project.product_name} </div>
                                        <div > Quantity : {this.state.project.quantity}  </div>
                                        <div > Client Name : {this.state.project.client_name} </div>
                                        <div > Deadline : {new Date(this.state.project.deadline).toLocaleDateString()} , {new Date(this.state.project.deadline).toLocaleTimeString()}  </div>
                                    </div>

                                    <div className={classes.stepStyle}>

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
                                                                Step Name - {i + 1} :{" "}
                                                                {
                                                                    task.task_name
                                                                }
                                                            </Typography>
                                                            {task.subtask.map(
                                                                (
                                                                    subtask,
                                                                    j
                                                                ) => {
                                                                    let x;
                                                                    console.log(subtask.subtask_type, subtask.subtask_name, subtask.subtask_value);
                                                                    if (subtask.subtask_type === 'Date') {

                                                                        x = new Date(subtask.subtask_value.split('.')[0]).toLocaleDateString() + " , " + new Date(subtask.subtask_value.split('.')[0]).toLocaleTimeString()
                                                                    }
                                                                    else if (subtask.subtask_type === 'Checkbox') {
                                                                        x = "";
                                                                        subtask.subtask_value.forEach((value, k) => {
                                                                            x = x + value;
                                                                            if (k !== subtask.subtask_value.length - 1)
                                                                                x = x + " , "
                                                                        })
                                                                    }
                                                                    else {
                                                                        x = subtask.subtask_value
                                                                    }
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
                                                                                    x
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
                                <div className={classes.button}>
                                    <Tooltip title='Edit Project'>
                                        <Button
                                            // onClick={() => {
                                            //   window.print();
                                            // }}
                                            variant='contained'
                                            color='primary'
                                            onClick={this.editProject}
                                        >
                                            Edit
                                        </Button>
                                    </Tooltip>
                                </div>
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
