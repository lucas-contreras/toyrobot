import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import multi from "redux-multi"
import appStore from "./reducers/appStore";
import robotStore from "./reducers/robotStore";
import tableboardStore from "./reducers/tableboardStore";

const reducers = combineReducers({
	appStore,
	robotStore,
	tableboardStore
});

export const store = createStore(reducers, applyMiddleware(thunk, multi));
