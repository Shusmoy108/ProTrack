import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import InputBase from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input/Input";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "../Product/productstyle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [
        {
          task_name: "",
          subtask: [
            {
              subtask_name: "",
              subtask_type: ""
            }
          ]
        }
      ]
    };
  }
  render() {
    const { classes } = this.props;
    let tasks = [];
    if (this.props.product) {
      this.props.product.task.map((taski, i) => {
        tasks.push(
          <div key={i} style={{ margin: "5% 0" }}>
            <InputLabel
              shrink
              htmlFor="productname"
              className={classes.bootstrapFormLabel}
            >
              Step Name : {taski.task_name}
            </InputLabel>
          </div>
        );
        let subtasks = [];
        taski.subtask.map((subtaskj, j) => {
          let subtaskname = (
            <InputLabel
              key={j}
              shrink
              htmlFor="productname"
              className={classes.bootstrapFormLabel}
            >
              {subtaskj.subtask_name}{" "}
            </InputLabel>
          );

          if (subtaskj.subtask_type === "Textfield") {
            subtasks.push(
              <Grid item sm={4} xs={6} style={{ marginRight: "2%" }}>
                <FormControl style={{ fullWidth: "true", width: "100%" }}>
                  <InputLabel
                    htmlFor="adornment-amount"
                    style={{ marginRight: 10 }}
                  >
                    {subtaskj.subtask_name}
                  </InputLabel>
                  <Input
                    id="standard-required"
                    value={this.props.task[i].subtask[j].subtask_value}
                    onChange={this.props.handleSpecChange(i, j)}
                  />
                </FormControl>
                <FormHelperText
                  id="component-error-text"
                  style={{ color: "red" }}
                >
                  {this.props.taskError[i].subtask[j].subtask_err}
                </FormHelperText>
              </Grid>
            );
          } else if (subtaskj.subtask_type === "Number") {
            subtasks.push(
              <Grid item sm={6} md={4} xs={6} style={{ marginRight: "2%" }}>
                <FormControl style={{ fullWidth: "true", width: "100%" }}>
                  <InputLabel
                    htmlFor="adornment-amount"
                    style={{ marginRight: 10 }}
                  >
                    {subtaskj.subtask_name}
                  </InputLabel>
                  <Input
                    id="standard-required"
                    value={this.props.task[i].subtask[j].subtask_value}
                    onChange={this.props.handleSpecChange(i, j)}
                  />
                </FormControl>
                <FormHelperText
                  id="component-error-text"
                  style={{ color: "red" }}
                >
                  {this.props.taskError[i].subtask[j].subtask_err}
                </FormHelperText>
              </Grid>
            );
          } else if (subtaskj.subtask_type === "Date") {
            subtasks.push(
              <Grid item sm={6} md={4} xs={6} style={{ marginRight: "2%" }}>
                <InputLabel
                  htmlFor="adornment-amount"
                  style={{ marginRight: 10 }}
                >
                  {subtaskj.subtask_name}
                </InputLabel>
                <Input
                  type="datetime-local"
                  id="standard-required"
                  value={this.props.task[i].subtask[j].subtask_value}
                  onChange={this.props.handleSpecChange(i, j)}
                />

                <FormHelperText
                  id="component-error-text"
                  style={{ color: "red" }}
                >
                  {this.props.taskError[i].subtask[j].subtask_err}
                </FormHelperText>
              </Grid>
            );
          } else if (subtaskj.subtask_type === "Dropdown") {
            let values = [];
            for (let k = 0; k < subtaskj.subtask_option.length; k++) {
              values.push(
                <MenuItem key={k} value={subtaskj.subtask_option[k]}>
                  {subtaskj.subtask_option[k]}
                </MenuItem>
              );
            }
            subtasks.push(
              <Grid
                item
                sm={6}
                md={4}
                xs={6}
                style={{ marginTop: "3%", marginRight: "2%" }}
              >
                {subtaskname}
                <Select
                  value={this.props.task[i].subtask[j].subtask_value}
                  onChange={this.props.handleSpecChange(i, j)}
                  input={<Input name="age" id="age-helper" />}
                >
                  {values}
                </Select>
              </Grid>
            );
          } else if (subtaskj.subtask_type === "Checkbox") {
            let value = [];
            subtaskj.subtask_option.map((f, k) => {
              value.push(
                <div style={{ display: "inline-flex" }}>
                  <Checkbox
                    checked={this.props.task[i].subtask[j].subtask_check[k]}
                    onChange={() => this.props.handleCheckChange(i, j, k, f)}
                    color="primary"
                  />
                  <div style={{ marginTop: "25%" }}>{f}</div>
                </div>
              );
            });
            subtasks.push(
              <Grid
                item
                sm={6}
                md={4}
                xs={6}
                style={{ display: "flex", marginTop: "2%", marginRight: "2%" }}
              >
                <div style={{ marginTop: "5%" }}>{subtaskname}</div>

                {value}
              </Grid>
            );
          }
        });
        tasks.push(<Grid container>{subtasks}</Grid>);
      });
    }
    return (
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        <div>{tasks}</div>
      </div>
    );
  }
}

export default withStyles(styles)(CreateProject);
