import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import NotFound from "./Components/NotFound";
import ProductBody from "./Components/Product/ProductBody";
import TaskBody from "./Components/Task/TaskBody";
import SubtaskBody from "./Components/Subtask/SubtaskBody";
import CreatePage from "./Components/projectn/CreateProject";
import ShowProject from "./Components/projectn/ShowProject";
import Project from "./Components/projectn/Project";
import UserPage from "./Components/User/Userpage";
import ProfilePage from "./Components/User/Profile";
import CreateUserPage from "./Components/User/CreateUser";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0288d1"
        },
        secondary: {
            main: "#fcb316"
        },
        ternary: {
            main: "#ef3836"
        },
        writing: {
            main: "#757576"
        },
        solid: {
            main: "#e0e0e0"
        }
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: "'Cinzel'",
        useNextVariants: true
    }
})
const Main = () => (
    <main>
        <MuiThemeProvider theme={theme}>
            <Switch>
                <Route exact path="/" component={Layout} />
                <Route exact path="/usermanagement" component={UserPage} />
                <Route exact path="/profile" component={ProfilePage} />
                <Route exact path="/createuser" component={CreateUserPage} />
                <Route path="/product" component={ProductBody} />
                <Route path="/step" component={TaskBody} />
                <Route path="/specification" component={SubtaskBody} />
                <Route path="/createproject" component={CreatePage} />
                <Route path="/project/:project_status" component={ShowProject} />
                <Route path="/projectshow/:id" component={Project} />
                <Route path="*" component={NotFound} />
            </Switch>
        </MuiThemeProvider>
    </main>
);

export default Main;
