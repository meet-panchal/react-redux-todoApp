import React, { Component } from "react";
import * as actionsType from "../../redux/actions/actionConstants";
import { connect } from "react-redux";

class InputForm extends Component {
  state = {
    title: "",
    description: ""
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  resetHandler = _ => {
    this.setState({
      title: "",
      description: ""
    });
  };

  render() {
    const currentMode = "Add Task";
    return (
      <div className="container my-5">
        <h2>{this.props.editingStatus ? "Edit Task" : currentMode}</h2>
        <form
          onSubmit={event => {
            event.preventDefault();
            if (!this.state.title || !this.state.description) return;
            this.props.addTask(this.state);
            this.setState({
              title: "",
              description: ""
            });
          }}
        >
          <div className="form-group mt-4">
            <label>Task Title</label>

            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter task title"
              onChange={this.changeHandler}
              value={this.state.title}
              autoComplete="off"
            />
          </div>
          <div className="form-group mt-4">
            <label>Task Description</label>

            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter task description"
              onChange={this.changeHandler}
              value={this.state.description}
              autoComplete="off"
            />
          </div>
          <button className="btn btn-success">Add Task</button>
          <button className="btn btn-info ml-3" onClick={this.resetHandler}>
            Reset
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editingStatus: state.isEditing,
    taskList: state.todoArray
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: content => dispatch({ type: actionsType.ADD_TASK, task: content })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
