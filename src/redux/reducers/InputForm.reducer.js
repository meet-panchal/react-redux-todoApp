import * as actionTypes from "../actions/actionConstants";
const uuidv4 = require("uuid/v4");

const initialState = {
  todoArray: [],
  isEditing: false,
  currentObject: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK: {
      let uid = uuidv4();
      return {
        ...state,
        todoArray: state.todoArray.concat({
          id: uid,
          title: action.task.title,
          description: action.task.description
        })
      };
    }

    case actionTypes.EDIT_TASK: {
      return {
        ...state,
        isEditing: true,
        currentObject: action.currenttask
      };
    }

    case actionTypes.CANCEL_EDIT: {
      return {
        ...state,
        currentObject: {},
        isEditing: false
      };
    }

    case actionTypes.EDIT_DETAILS: {
      return {
        ...state,
        currentObject: {
          ...state.currentObject,
          [action.eventObject.target.name]: action.eventObject.target.value
        }
      };
    }

    case actionTypes.UPDATE_TASK: {
      return {
        ...state,
        todoArray: state.todoArray.map(task =>
          task.id === action.updatedContent.id &&
          action.updatedContent.title &&
          action.updatedContent.description
            ? state.currentObject
            : task
        )
      };
    }
    case actionTypes.DELETE_TASK: {
      return {
        ...state,
        todoArray: state.todoArray.filter(task => task.id !== action.taskId)
      };
    }

    default:
      return state;
  }
};

export default reducer;
