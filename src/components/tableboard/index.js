import React from "react";
import Square from "./square";
import Line from "./line";

import "./tableboard.css";

export default class TableBoard extends React.Component {
	render() {
		const { size } = this.props;

		return <div>{this.renderBoard(size)}</div>;
	}

	renderBoard(size) {
		debugger;
		let existRobot = this.props.children != undefined;
		let robotComponent = existRobot ? this.props.children : null;

		const { robot } = this.props;

		if (robot) {
			
		}

		const squares = [];

		for (let y = 0; y < size.y; y++) {
			for (let x = 0; x < size.x; x++) {
				squares.push(<Square position={{ x, y }}>{robotComponent}</Square>);
			}
			squares.push(<Line />);
		}

		return squares;
	}
}
