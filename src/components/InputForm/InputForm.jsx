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

  componentWillReceiveProps() {
    // this.setState({
    //   title: this.props.editingStatus.title,
    //   description: ...
    // });
  }

  render() {
    const currentMode = this.props.editingStatus ? "Edit Task" : "Add Task";
    const currentForm = this.props.editingStatus ? (
      <div className="container my-5">
        <h2>{currentMode}</h2>
        <form
          onSubmit={async event => {
            event.preventDefault();
            await this.props.updateTask(this.props.currentTask);
            await this.props.cancelEdit();
          }}
        >
          <div className="form-group mt-4">
            <label>Task Title</label>

            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter task title"
              onChange={event => this.props.changeDetails(event)}
              value={this.props.currentTask.title}
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
              onChange={event => this.props.changeDetails(event)}
              value={this.props.currentTask.description}
              autoComplete="off"
            />
          </div>
          <button className="btn btn-success">Update Task</button>
          <button className="btn btn-info ml-3" onClick={this.props.cancelEdit}>
            Cancel
          </button>
        </form>
      </div>
    ) : (
      <div className="container my-5">
        <h2>{currentMode}</h2>
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
    return <div>{currentForm}</div>;
  }
}

const mapStateToProps = state => {
  return {
    editingStatus: state.isEditing,
    taskList: state.todoArray,
    currentTask: state.currentObject
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: content => dispatch({ type: actionsType.ADD_TASK, task: content }),
    cancelEdit: _ => dispatch({ type: actionsType.CANCEL_EDIT }),
    updateTask: updatedContent =>
      dispatch({
        type: actionsType.UPDATE_TASK,
        updatedContent: updatedContent
      }),
    changeDetails: event =>
      dispatch({ type: actionsType.EDIT_DETAILS, eventObject: event })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
