import React from "react";
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

		for (let y = 0; y < size.y; y++) {
			for (let x = 0; x < size.x; x++) {
				const existRobot = (robot && (robot.positionX == x && robot.positionY == y));

				squares.push(
					<Square
						key={`${y}-${x}`}
						position={{ x, y }}>
						{existRobot && <Robot robot={robot} />}
					</Square>
				);
			}
			squares.push(<Line key={y} />);
		}

		return squares;
	}
}
