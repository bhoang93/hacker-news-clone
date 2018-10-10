import { createStore } from "redux";
import reducer from "./reducer";
import middleware from "./middleware";

const configureStore = intialState => {
  const store = createStore(reducer, intialState, middleware);
  return store;
};

export default configureStore;
