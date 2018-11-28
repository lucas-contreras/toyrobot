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
		const squares = [];

		for (let y = 0; y < size.y; y++) {
			for (let x = 0; x < size.x; x++) {
				squares.push(<Square />);
			}
			squares.push(<Line />);
		}

		return squares;
	}
}
