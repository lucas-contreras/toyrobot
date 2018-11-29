import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Container from "./src/screens/home/container";
import { store } from "./src/store";

const Enhanced = () => (
	<Provider store={store}>
		<Container />
	</Provider>
);

ReactDOM.render(<Enhanced />, document.getElementById("root"));
