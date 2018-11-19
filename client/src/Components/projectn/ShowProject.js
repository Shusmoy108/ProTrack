import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "../Modal/Modal";
import {
    getProjects,
    deleteProject,
    updateProject
} from "../../Utils/projectAxios";
import Header from "../Header/Header";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip'
import ProjectCard from "./ProjectCard";
import StatusModal from "../Modal/StatusModal";
import styles from "./showprojectStyle";
import Checkbox from '@material-ui/core/Checkbox';
import SearchEngine from '../Search/SearchEngine';
import DropDown from '../dropDownn/DropDown'
import LModal from '../modaln/SignUpModal'

class ShowProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            usertype: "",
            username: "",
            projects: [],
            allprojects: [],
            projectoptions: [],
            deleteopen: false,
            project_id: "",
            page: "",
            nextstatus: "",
            statusOpen: false,
            sortValue: "Project ID",
            sortType: "Ascending",
            refresh: false,
            openValue: false,
            openType: false,
        };
    }
    handleOpen = () => {
        this.setState({ open: !this.state.open })
    }
    handleRefresh = () => {
        this.setState({ refresh: !this.state.refresh });
    }
    handleOpenValue = () => {
        this.setState({ openValue: !this.state.openValue });
    }
    handleOpenType = () => {
        this.setState({ openType: !this.state.openType });
    }
    deleteProject = id => {
        let that = this;
        deleteProject(that.state.project_id, (err, data) => {
            if (data.success) {
                let projects = that.state.projects;
                projects = projects.filter(
                    project => project.project_id !== that.state.project_id
                );
                that.setState({ projects: projects, deleteopen: false });
            }
        });
    };
    showProject = e => {
        this.props.history.push("/projectshow/" + e);
    };
    search = (e) => {
        if (e !== "") {
            let projects = this.state.allprojects;
            let y = projects.find(project => project.project_id === e)
            if (y) {
                let x = []
                x.push(y);
                this.setState({ projects: x });
            }
        }
        else {
            this.setState({ projects: this.state.allprojects });
        }
    }
    handleSortValue = e => {
        let that = this;
        this.setState({ sortValue: e, openValue: false }, () => {
            let projects = that.state.projects;
            if (that.state.sortValue === "Client Name") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.client_name > b.client_name
                            ? -1
                            : a.client_name < b.client_name
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.client_name < b.client_name
                            ? -1
                            : a.client_name > b.client_name
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Project ID") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.project_id > b.project_id
                            ? -1
                            : a.project_id < b.project_id
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.project_id < b.project_id
                            ? -1
                            : a.project_id > b.project_id
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Product Name") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.product_name > b.product_name
                            ? -1
                            : a.product_name < b.product_name
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.product_name < b.product_name
                            ? -1
                            : a.product_name > b.product_name
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Quantity") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.quantity > b.quantity
                            ? -1
                            : a.quantity < b.quantity
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.quantity < b.product_name
                            ? -1
                            : a.quantity > b.quantity
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Current Step") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.current_position > b.current_position
                            ? -1
                            : a.current_position < b.current_position
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.current_position < b.current_position
                            ? -1
                            : a.current_position > b.current_position
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Next Step") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.next_position > b.next_position
                            ? -1
                            : a.next_position < b.next_position
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.next_position < b.next_position
                            ? -1
                            : a.next_position > b.next_position
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Next Step") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.next_position > b.next_position
                            ? -1
                            : a.next_position < b.next_position
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.next_position < b.next_position
                            ? -1
                            : a.next_position > b.next_position
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            }
            if (that.state.sortValue === "Progress") {
                projects.sort(function (a, b) {
                    let x = a.completed_task / a.total_task;
                    let y = b.completed_task / b.total_task;
                    if (that.state.sortType === "Ascending") {
                        return x > y ? -1 : x < y ? 1 : 0;
                    }
                    if (that.state.sortType === "Descending") {
                        return x < y ? -1 : x > y ? 1 : 0;
                    }
                });
                that.setState({ projects: projects });
            }
            if (that.state.sortValue === "Deadline") {
                projects.sort(function (a, b) {
                    let x = new Date(a.deadline);
                    let y = new Date(b.deadline);
                    if (that.state.sortType === "Ascending") {
                        return x > y ? -1 : x < y ? 1 : 0;
                    }
                    if (that.state.sortType === "Descending") {
                        return x < y ? -1 : x > y ? 1 : 0;
                    }
                });
                that.setState({ projects: projects });
            }
        });
    };
    handleSortType = e => {
        let that = this;
        this.setState({ sortType: e, openType: false }, () => {
            let projects = that.state.projects;
            if (that.state.sortValue === "Client Name") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.client_name > b.client_name
                            ? -1
                            : a.client_name < b.client_name
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.client_name < b.client_name
                            ? -1
                            : a.client_name > b.client_name
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Project ID") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.project_id > b.project_id
                            ? -1
                            : a.project_id < b.project_id
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.project_id < b.project_id
                            ? -1
                            : a.project_id > b.project_id
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Product Name") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.product_name > b.product_name
                            ? -1
                            : a.product_name < b.product_name
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.product_name < b.product_name
                            ? -1
                            : a.product_name > b.product_name
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Quantity") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.quantity > b.quantity
                            ? -1
                            : a.quantity < b.quantity
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.quantity < b.product_name
                            ? -1
                            : a.quantity > b.quantity
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Current Step") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.current_position > b.current_position
                            ? -1
                            : a.current_position < b.current_position
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.current_position < b.current_position
                            ? -1
                            : a.current_position > b.current_position
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Next Step") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.next_position > b.next_position
                            ? -1
                            : a.next_position < b.next_position
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.next_position < b.next_position
                            ? -1
                            : a.next_position > b.next_position
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            } else if (that.state.sortValue === "Next Step") {
                projects.sort(function (a, b) {
                    if (that.state.sortType === "Ascending") {
                        return a.next_position > b.next_position
                            ? -1
                            : a.next_position < b.next_position
                                ? 1
                                : 0;
                    } else if (that.state.sortType === "Descending") {
                        return a.next_position < b.next_position
                            ? -1
                            : a.next_position > b.next_position
                                ? 1
                                : 0;
                    }
                });
                that.setState({ projects: projects });
            }
            if (that.state.sortValue === "Progress") {
                projects.sort(function (a, b) {
                    let x = a.completed_task / a.total_task;
                    let y = b.completed_task / b.total_task;
                    if (that.state.sortType === "Ascending") {
                        return x > y ? -1 : x < y ? 1 : 0;
                    }
                    if (that.state.sortType === "Descending") {
                        return x < y ? -1 : x > y ? 1 : 0;
                    }
                });
                that.setState({ projects: projects });
            }
            if (that.state.sortValue === "Deadline") {
                projects.sort(function (a, b) {
                    let x = new Date(a.deadline);
                    let y = new Date(b.deadline);
                    if (that.state.sortType === "Ascending") {
                        return x > y ? -1 : x < y ? 1 : 0;
                    }
                    if (that.state.sortType === "Descending") {
                        return x < y ? -1 : x > y ? 1 : 0;
                    }
                });
                that.setState({ projects: projects });
            }
        });
    };
    updateProject = id => {
        let status;
        let projects = this.state.projects;
        let project = projects.find(
            project => project.project_id === this.state.project_id
        );

        if (
            (this.state.page === "ongoing" || this.state.page === "redo") &&
            project.completed_task / project.total_task === 1
        ) {
            status = "history";
            let that = this;
            updateProject(id, status, (err, data) => {
                if (data.success) {
                    let projects = that.state.projects;
                    projects = projects.filter(
                        project => project.project_id !== this.state.project_id
                    );
                    that.setState({ projects: projects, statusOpen: false });
                }
            });
        }
        if (this.state.page === "pending") {
            status = "ongoing";
            let that = this;
            updateProject(id, status, (err, data) => {
                if (data.success) {
                    let projects = that.state.projects;
                    projects = projects.filter(
                        project => project.project_id !== this.state.project_id
                    );
                    that.setState({ projects: projects, statusOpen: false });
                }
            });
        }
        if (this.state.page === "history") {
            status = "redo";
            let that = this;
            updateProject(id, status, (err, data) => {
                if (data.success) {
                    let projects = that.state.projects;
                    projects = projects.filter(
                        project => project.project_id !== this.state.project_id
                    );
                    that.setState({ projects: projects, statusOpen: false });
                }
            });
        }
        this.setState({ statusOpen: false });
    };
    closeDelete = () => {
        this.setState({ deleteopen: false });
    };
    openDelete = e => {
        this.setState({ deleteopen: true, project_id: e });
    };
    closeStatus = () => {
        this.setState({ statusOpen: false });
    };
    openStatus = e => {
        this.setState({ statusOpen: true, project_id: e });
    };
    getProjects = () => {
        let that = this;

        getProjects(this.props.match.params.project_status, (err, data) => {
            if (err) {
                that.props.history.push("/");
            } else {
                that.setState(
                    {
                        usertype: data.user.usertype,
                        username: data.user.username,
                        projects: data.projects,
                        allprojects: data.projects,
                        page: that.props.match.params.project_status
                    },
                    () => {
                        let status;

                        if (
                            that.state.page === "ongoing" ||
                            that.state.page === "redo"
                        ) {
                            status = "history";
                        }
                        if (that.state.page === "pending") {
                            status = "ongoing";
                        }
                        if (that.state.page === "history") {
                            status = "redo";
                        }
                        that.setState({ nextstatus: status });
                    }
                );
            }
        });
    }
    componentDidMount() {
        this.getProjects()
        let that = this;
        setInterval(() => {
            if (that.state.refresh) {
                that.getProjects();
                this.handleSortValue();
                this.handleSortType();
            }
        }, 30000)
    }
    componentWillReceiveProps(nextProps) {
        if (
            nextProps.match.params.project_status !==
            this.props.match.params.project_status
        ) {
            let that = this;

            getProjects(nextProps.match.params.project_status, (err, data) => {
                that.setState(
                    {
                        usertype: data.user.usertype,
                        username: data.user.username,
                        projects: data.projects,
                        allprojects: data.projects,
                        page: that.props.match.params.project_status
                    },
                    () => {
                        let status;
                        if (
                            that.state.page === "ongoing" ||
                            that.state.page === "redo"
                        ) {
                            status = "history";
                        }
                        if (that.state.page === "pending") {
                            status = "ongoing";
                        }
                        if (that.state.page === "history") {
                            status = "redo";
                        }
                        that.setState({ nextstatus: status });
                    }
                );
            });
        }
    }
    render() {
        let addbutton;
        let sortValues = ["Project ID", "Product Name", "Client Name", "Progress", "Deadline", "Quantity", "Current Step", "Next Step"];
        let sortTypes = ["Ascending", "Descending"];
        const {classes}= this.props;
        if (this.state.page === "pending") {
            addbutton = (
                <Tooltip title="Add Project">

                    <Button
                    variant='contained'
                    color='primary'
                        onClick={() => {
                            this.props.history.push("/createproject");
                        }}
                       // onClick={this.handleOpen}
                    >
                       Add Project
                    </Button>
                </Tooltip>
            );
        }
        return (
            <div>
                <LModal open={this.state.open} handleClose={this.handleOpen}/>
                <Header
                page={this.state.page}
                    history={this.props.history}
                    username={this.state.username}
                    usertype={this.state.usertype}
                />
                <Modal
                    name={this.state.project_id}
                    handleYes={this.deleteProject}
                    handleNo={this.closeDelete}
                    open={this.state.deleteopen}
                />
                <StatusModal
                    name={this.state.project_id}
                    status={this.state.nextstatus}
                    handleYes={this.updateProject}
                    handleNo={this.closeStatus}
                    open={this.state.statusOpen}
                />
                <div className={classes.headerRoot}>
                    <div
                        className={classes.border}
                    >
                        Sort
                        <DropDown open={this.state.openValue} handleOpen={this.handleOpenValue} value={this.state.sortValue} options={sortValues} change={this.handleSortValue} />
                        <DropDown open={this.state.openType} handleOpen={this.handleOpenType} value={this.state.sortType} options={sortTypes} change={this.handleSortType} />
                        
                        <SearchEngine
                            options={this.state.allprojects.map(project => ({
                                label: project.project_id
                            }))}

                            search={this.search}
                            searchField={"Project"}
                        />
                        <Checkbox
                            checked={this.state.refresh}
                            onChange={this.handleRefresh}
                            color='primary'
                        /> 
                            Auto Refresh
                            
                      
                    </div>
                </div>
                <div className={classes.addbutton}>
            {addbutton}

                </div>
                <div className={classes.cards}>
                
                        {this.state.projects.map((project, i) => {
                            return (

                                <div style={{ margin: 10 }}>
                                    <ProjectCard
                                        project={project}
                                        delete={this.openDelete}
                                        updateStatus={this.openStatus}
                                        showProject={this.showProject}
                                    />
                                </div>

                            );
                        })}
                    </div>

                    {!this.state.projects.length && (
                        <div
                            style={{
                                fontSize: "30px",
                                margin: "2% 3%"
                            }}
                        >
                            {" "}
                            No Projects Available
                        </div>
                    )}
                </div>
          
        );
    }
}

ShowProject.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShowProject);
