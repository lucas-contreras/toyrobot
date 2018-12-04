import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import multi from "redux-multi";

import appStore from "./appStore";

const composeEnhancer =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

export const store = createStore(appStore, composeEnhancer(applyMiddleware(thunk, multi)));
