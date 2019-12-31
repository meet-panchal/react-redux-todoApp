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
        ...initialState,
        todoArray: state.todoArray.concat({
          id: uid,
          title: action.task.title,
          description: action.task.description
        })
      };
    }

    default:
      return state;
  }
};

export default reducer;
