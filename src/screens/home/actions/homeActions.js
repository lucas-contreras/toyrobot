export const FACING_EAST_VALUE = 0;
export const FACING_NORTH_VALUE = 90;
export const FACING_WEST_VALUE = 180;
export const FACING_SOUTH_VALUE = 270;

export const ROBOT_MOVEMENT = "ROBOT_MOVEMENT";

export const CHANGE_SIZE_TABLEBOARD = "CHANGE_SIZE_TABLEBOARD";
export const CHANGE_FACING_ROBOT = "CHANGE_FACING_ROBOT";
export const ERROR_MESSAGE = "ERROR_MESSAGE";

export const COMMAND_PLACE = "PLACE";
export const COMMAND_MOVE = "MOVE";
export const COMMAND_LEFT = "LEFT";
export const COMMAND_RIGHT = "RIGHT";
export const COMMAND_REPORT = "REPORT";

export function sendCommand(command = "") {
	return (dispatch, getState) => {
		//debugger;
		const newCommands = [];
		const commandErrorList = [];
		const { robot, tableboard } = getState();

		let error = false;
		let typeDispatch = [{ type: ERROR_MESSAGE, error: "" }];
		let robotSetup = { ...robot };

		command.split(/\n/).forEach(c => {
			if (c !== "") {
				newCommands.push(c.toUpperCase());
			}
		});

		newCommands.forEach(nc => {
			debugger;

			switch (nc.replace(/\s/, "")) {
				case COMMAND_MOVE: {
					const result = calulateMovement(robotSetup, tableboard.size);

					robotSetup = { ...robotSetup, position: { ...result } }

					typeDispatch.push({ type: ROBOT_MOVEMENT, position: robotSetup })
					break;
				}
				case COMMAND_LEFT: {
					typeDispatch.push({ type: CHANGE_FACING_ROBOT, value: calculateLeft(robot.facing) });
					break;
				}
				case COMMAND_RIGHT: {
					typeDispatch.push({ type: CHANGE_FACING_ROBOT, value: calculateRight(robot.facing) });
					break;
				}
				case COMMAND_REPORT: {

					break;
				}
				default: {
					debugger;
					if (nc.startsWith(COMMAND_PLACE)) {
						const firstPart = nc.substring(0, COMMAND_PLACE.length + 1);
						const secondPart = nc.substring(COMMAND_PLACE.length, nc.length).split(",");

						if (firstPart !== COMMAND_PLACE + " " || secondPart.length != 3) {
							error = true;
							commandErrorList.push(nc);
						} else {

						}
					} else {
						error = true;
						commandErrorList.push(nc);
					}
					break;
				}
			}
		});

		if (error) {
			dispatch({ type: ERROR_MESSAGE, error: "Syntax error: " + commandErrorList.join(", ") + " probably you have wrote a typo" });
		} else {

			dispatch(typeDispatch);
		}

		// switch (newCommand) {
		// 	case COMMAND_PLACE: {

		// 		break;
		// 	}
		// 	case COMMAND_MOVE: {
		// 		const result = calulateMovement(robot, tableboard.size);
		// 		delete result.wasMoved;

		// 		typeDispatch.push({ type: ROBOT_MOVEMENT, position: result });
		// 		break;
		// 	}
		// 	case COMMAND_LEFT: {
		// 		typeDispatch.push({ type: CHANGE_FACING_ROBOT, value: calculateLeft(robot.facing) });
		// 		break;
		// 	}
		// 	case COMMAND_RIGHT: {
		// 		typeDispatch.push({ type: CHANGE_FACING_ROBOT, value: calculateRight(robot.facing) });
		// 		break;
		// 	}
		// 	case COMMAND_REPORT: {
		// 		break;
		// 	}
		// 	default: {
		// 		error = true;
		// 		break;
		// 	}
		// }
	}
}

export function enableFreewill(option) {
	return (dispatch, getState) => {
		const state = getState();
		const { robot, tableboard } = state;

		let isMoveFoward = (Math.floor(Math.random() * 20) > 5);
		let facing = robot.facing;
		let resultRobot = {};

		if (isMoveFoward) {
			const result = calulateMovement(robot, tableboard.size);

			if (result.wasMoved == false) {
				isMoveFoward = false;
			} else {
				resultRobot = calulateMovement(robot, tableboard.size);
			}
		}

		if (isMoveFoward == false) {
			const isTurnLeft = (Math.floor(Math.random() * 20) > 10);

			if (isTurnLeft) {
				facing = calculateLeft(robot.facing);
			} else {
				facing = calculateRight(robot.facing);
			}

			const { x, y } = robot.position;
			resultRobot = { x, y, facing }
		}

		dispatch({ type: ROBOT_MOVEMENT, position: resultRobot, facing });
	}
}

function calulateMovement(robot, maxSizeAllowed) {
	let wasMoved = false;

	const newPosition = {
		x: robot.position.x,
		y: robot.position.y
	};

	switch (robot.facing) {
		case FACING_WEST_VALUE: {
			if (newPosition.x <= maxSizeAllowed.x && newPosition.x > 0) {
				newPosition.x--;
				wasMoved = true;
			}
			break;
		}
		case FACING_EAST_VALUE: {
			if ((newPosition.x + 1) < maxSizeAllowed.x) {
				newPosition.x++;
				wasMoved = true;
			}
			break;
		}
		case FACING_SOUTH_VALUE: {
			if ((newPosition.y + 1) < maxSizeAllowed.y) {
				newPosition.y++;
				wasMoved = true;
			}
			break;
		}
		case FACING_NORTH_VALUE: {
			if (newPosition.y <= maxSizeAllowed.y && newPosition.y > 0) {
				newPosition.y--;
				wasMoved = true;
			}
			break;
		}
	}

	return {
		...newPosition,
		wasMoved
	};
}

function calculateRight(degreePosition) {
	/*if the result is more or equal than 360 it means two things, 
		first, the robot has gave a completed a lap 
		second one, the last position was facing to left and its current position is 360
	in both cases the next position must be 0 in order to facing front back*/
	let result = degreePosition + 90;

	if (result >= 360) {
		result = 0;
	}

	return result;
}

function calculateLeft(degreePosition) {
	/*if the result is less than 0 it means two things, 
		first, the robot has gave a completed a lap 
		second one, the last position was facing to right and its current position is 0 so is negative
	in both cases the next position must be 270 in order to facing front part*/
	let result = degreePosition - 90;

	if (result < 0) {
		result = 270;
	}

	return result;
}

export const Methods = { sendCommand, enableFreewill };
export const Constants = {
	FACING_WEST_VALUE,
	FACING_NORTH_VALUE,
	FACING_EAST_VALUE,
	FACING_SOUTH_VALUE,
	ROBOT_MOVEMENT,
	CHANGE_SIZE_TABLEBOARD,
	CHANGE_FACING_ROBOT,
	ERROR_MESSAGE
};
