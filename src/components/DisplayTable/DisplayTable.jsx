import React from "react";
import * as actionsType from "../../redux/actions/actionConstants";
import { connect } from "react-redux";

const DisplayTable = props => {
  return (
    <table className="table mt-4 container">
      <thead>
        <tr>
          <th scope="col">S.No</th>
          <th scope="col">Task Title</th>
          <th scope="col">Task Desc.</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.taskList.length > 0 ? (
          props.taskList.map((task, index) => {
            return (
              <tr key={task.id}>
                <th scope="row">{index + 1}</th>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <button
                    className="btn btn-danger ml-3"
                    onClick={() => props.deleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning ml-3"
                    onClick={() => props.editTask(task)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>No Task</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    editingStatus: state.isEditing,
    taskList: state.todoArray
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editTask: currentTask =>
      dispatch({ type: actionsType.EDIT_TASK, currenttask: currentTask }),
    deleteTask: currentId =>
      dispatch({ type: actionsType.DELETE_TASK, taskId: currentId })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTable);
