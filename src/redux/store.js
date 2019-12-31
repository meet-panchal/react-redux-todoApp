import { createStore } from "redux";
import formReducer from "./reducers/InputForm.reducer";

export const store = createStore(formReducer);
