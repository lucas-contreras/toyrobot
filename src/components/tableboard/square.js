import React from "react";
import "./tableboard.css";

export default class Square extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			positionX: props.position.x,
			positionY: props.position.y,
			robot: null
		};
	}

	// static getDerivedStateFromProps(props, state) {
	// 	console.log("getDerivedStateFromProps - Square", props, state);
	// 	return state;
	// }

	render() {
		
		return <div className="square">{this.props.children}</div>;
	}
}
