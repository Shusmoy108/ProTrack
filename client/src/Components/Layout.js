import React, { Component } from 'react';
import LoginPage from './LoginPage';


import Axios from 'Utils/Axios';
import Loader from './Loader/Loader'
import Userpage from './User/Profile';
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: 'login',

            usertype: '',
            username: '',
        };

    }

    loggedIn = (data) => {
        this.props.history.push('/project/ongoing');
    };

    handleLogout = (e) => {
        let that = this;
        Axios.logout(function () {
            that.setState({ logged: 'login', name: '', username: '' })
            that.props.history.push('/');
        })
    };


    componentDidMount() {
        let that = this;
        Axios.getProfile(function (err, data) {
            if (err) {
                console.log(err);
                console.log("helloerr");
                that.setState({ logged: 'login', name: '', username: '' });
            }
            else {
                console.log("hello", data);
                that.setState({ usertype: data.usertype, username: data.username, name: data.name }, () => {
                    that.setState({ logged: 'loggedin' })
                });
            }
        });
    }

    render() {
        let template = <Loader />;
        console.log("hello");
        if (this.state.logged === 'loggedin') {
            template = <Userpage {...this.props}
                usertype={this.state.usertype} username={this.state.username} name={this.state.name} />
        }
        else if (this.state.logged === 'login') {
            template = <LoginPage loggedIn={this.loggedIn} />
        }
        return (
            <div style={{ height: '100%' }}>
                {template}
            </div>
        );
    }
}

export default (Layout);
