import { combineReducers } from "redux";
import app from "./app/reducers";
import story from "./story/reducers";

const rootReducer = combineReducers({
  app,
  story
});

export default rootReducer;
