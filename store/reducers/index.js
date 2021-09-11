import { combineReducers } from "redux";
import requestsReducer from "./requests";
import transactionsReducer from "./transactions";

export default combineReducers({
  user: requestsReducer,
  posts: transactionsReducer,
});