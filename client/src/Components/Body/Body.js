import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';


import Product from '../Product/ProductBody'



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: "column",
    padding: "16px 20%",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 12px",
    }
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  btn: {
    [theme.breakpoints.down("sm")]: {
      padding: 8, minWidth: 36
    }
  },
  button: {
    marginBottom: 16
  },
  label: {
    fontSize: 30,
    color: "#263238",
    position: 'relative'
  }
});

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
        product:[]
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  }


  render() {
    let body;

    if(this.props.showpage==="product") {
        body = <Product {...this.props} productlist={this.props.data}/>;
    }

    return (
        <div>
            {body}
            <h1>hello</h1>
        </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Body);