import React from "react";
import "./tableboard.css";

export default class Square extends React.Component {
	static getDerivedStateFromProps(props, state) {
		console.log("getDerivedStateFromProps - Square", props, state);
	}

	render() {
		return <div className="square">{this.props.children}</div>;
	}
}
