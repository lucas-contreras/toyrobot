import React from "react";
import PropTypes from "prop-types";

import Robot from "../robot"
import Square from "./square";
import Line from "./line";

import "./tableboard.css";

export default class TableBoard extends React.Component {
	render() {
		const { size } = this.props;

		return <div>{this.renderBoard(size)}</div>;
	}

	renderBoard(size) {
		const { robot } = this.props;
		const squares = [];

		for (let y = (size.y - 1); y >= 0; y--) {
			for (let x = 0; x < size.x; x++) {
				const existRobot = (robot && (robot.position.x == x && robot.position.y == y));

				squares.push(
					<Square key={`${y}-${x}`}>
						{existRobot && <Robot robot={robot} />}
					</Square>
				);
			}
			squares.push(<Line key={y} />);
		}

		return squares;
	}
}

TableBoard.propTypes = {
    size: PropTypes.object.isRequired
}
