import React, { Component } from 'react';
import Header from './Header/Header'
import Body from './Body/Body'
import Axios from 'Utils/Axios';
import Userpage from './User/Userpage';
class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showpage: "project",
            data: []
        };
    }

    setpage = (e) => {
        console.log("here" +
            e);
        let that = this;
        Axios.showproduct(function (err, data) {
            console.log(data.products + "body");
            that.setState({ data: data.products });

        });
        this.setState(state => ({ showpage: e }));
    };
    render() {
        return (
            <div>
                <Header {...this.props} />
                <Userpage {...this.props} />
            </div>
        );
    }
}

export default (LandingPage);
