import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import robotStore from "./reducers/robotStore";
import tableboardStore from "./reducers/tableboardStore";

const reducers = combineReducers({
	robotStore,
	tableboardStore
});

export const store = createStore(reducers, applyMiddleware(thunk));
