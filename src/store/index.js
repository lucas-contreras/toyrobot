import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import multi from "redux-multi"

import appStore from "./appStore";

export const store = createStore(appStore, applyMiddleware(thunk, multi));
