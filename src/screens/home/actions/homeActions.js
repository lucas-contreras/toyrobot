export const FACING_EAST_VALUE = 0;
export const FACING_NORTH_VALUE = 90;
export const FACING_WEST_VALUE = 180;
export const FACING_SOUTH_VALUE = 270;

export const FACING_EAST_CODE = "EAST";
export const FACING_NORTH_CODE = "NORTH";
export const FACING_WEST_CODE = "WEST";
export const FACING_SOUTH_CODE = "SOUTH";

export const ROBOT_MOVEMENT = "ROBOT_MOVEMENT";

export const CHANGE_SIZE_TABLEBOARD = "CHANGE_SIZE_TABLEBOARD";
export const CHANGE_FACING_ROBOT = "CHANGE_FACING_ROBOT";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const SHOW_REPORT = "SHOW_REPORT";
export const RESET_ROBOT_STATE = "RESET_ROBOT_STATE";

export const COMMAND_PLACE = "PLACE";
export const COMMAND_MOVE = "MOVE";
export const COMMAND_LEFT = "LEFT";
export const COMMAND_RIGHT = "RIGHT";
export const COMMAND_REPORT = "REPORT";

/**
 * Executes the commands passed through params
 * @param {*} command array of string about commands availables
 */
export function sendCommand(command = "") {
	return (dispatch, getState) => {
		const newCommands = [];
		const commandErrorList = [];
		const { robot, tableboard } = getState();

		let error = false;
		let printAtEnd = false;
		let robotSetup = { ...robot };

		command.split(/\n/).forEach(c => {
			if (c !== "") {
				newCommands.push(c.toUpperCase());
			}
		});

		newCommands.forEach(nc => {
			switch (nc.replace(/\s/, "")) {
				case COMMAND_MOVE: {
					robotSetup = calulateMovement(robotSetup, tableboard.size);
					break;
				}
				case COMMAND_LEFT: {
					robotSetup.facing = calculateLeft(robotSetup.facing);
					break;
				}
				case COMMAND_RIGHT: {
					robotSetup.facing = calculateRight(robotSetup.facing);
					break;
				}
				case COMMAND_REPORT: {
					printAtEnd = true;
					break;
				}
				default: {
					if (nc.startsWith(COMMAND_PLACE)) {
						const firstPart = nc.substring(0, COMMAND_PLACE.length + 1);
						const secondPart = nc.substring(COMMAND_PLACE.length, nc.length).split(",");

						if (firstPart !== COMMAND_PLACE + " " || secondPart.length != 3) {
							error = true;
							commandErrorList.push(nc);
						} else {
							const isNotValidP1 = isNaN(parseInt(secondPart[0]));
							const isNotValidP2 = isNaN(parseInt(secondPart[1]));

							if (isNotValidP1 || isNotValidP2) {
								error = true;
								commandErrorList.push(secondPart[0], secondPart[1]);
							} else {
								robotSetup = {
									position: {
										x: parseInt(secondPart[0]),
										y: parseInt(secondPart[1])
									},
									facing: undefined
								}

								if (robotSetup.position.x > tableboard.size.x) {
									robotSetup.position.x = tableboard.size.x - 1;
								}

								if (robotSetup.position.y > tableboard.size.y) {
									robotSetup.position.y = tableboard.size.y - 1;
								}

								robotSetup.facing = getFacingValueByCode(secondPart[2]);

								if (robotSetup.facing == null) {
									error = true;
									commandErrorList.push(secondPart[2]);
								}
							}
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
			dispatch({ type: ERROR_MESSAGE, error: "Syntax error: " + commandErrorList.join(", ") + " one or more commands/parameters are incorrect" });
		} else {
			const typesToDispatch = [
				{ type: ERROR_MESSAGE, error: "" },
				{ type: ROBOT_MOVEMENT, robot: robotSetup }
			];

			if (printAtEnd) {
				const facingCode = getFacingCodeByValue(robotSetup.facing);
				typesToDispatch.push({ type: SHOW_REPORT, robot: robotSetup, facingCode })
			}

			dispatch(typesToDispatch);
		}
	}
}
/**
 * Gives the robot feel free to do whatever he wants.
 * @param {*} option boolean
 */
export function enableFreewill(option) {
	return (dispatch, getState) => {
		const state = getState();
		const { robot, tableboard } = state;

		let isMoveFoward = (Math.floor(Math.random() * 20) > 5);
		let resultRobot = null;

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
			let facing = 0;

			if (isTurnLeft) {
				facing = calculateLeft(robot.facing);
			} else {
				facing = calculateRight(robot.facing);
			}

			resultRobot = { ...robot, facing }
		}

		dispatch({ type: ROBOT_MOVEMENT, robot: resultRobot });
	}
}
/**
 * Returns an robot object with the new position in the tableboard
 * @param {*} robot robot object
 * @param {*} maxSizeAllowed size of the tableboard {x: number, y: number}
 */
export function calulateMovement(robot, maxSizeAllowed) {
	const newPosition = {
		x: robot.position.x,
		y: robot.position.y
	};

	let wasMoved = false;

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
		position: { ...newPosition },
		facing: robot.facing,
		wasMoved
	};
}
/**
 * Resets the robot state
 */
export function resetRobotState() {
	return (dispatch) => {
		dispatch({ type: RESET_ROBOT_STATE });
	}
}
/**
 * Returns a code facing using a value
 * @param {*} value number - value position (can be 0, 90, 180 or 270)
 */
export function getFacingCodeByValue(value = 0) {
	switch (value) {
		case FACING_EAST_VALUE: {
			return FACING_EAST_CODE;
		}
		case FACING_NORTH_VALUE: {
			return FACING_NORTH_CODE;
		}
		case FACING_WEST_VALUE: {
			return FACING_WEST_CODE;
		}
		case FACING_SOUTH_VALUE: {
			return FACING_SOUTH_CODE;
		}
		default: {
			return null;
		}
	}
}
/**
 * Returns a value facing using a code
 * @param {*} value code - code position (can be north, west, east or south)
 */
export function getFacingValueByCode(code = "") {
	switch (code.replace(/\s/, "").toUpperCase()) {
		case FACING_EAST_CODE: {
			return FACING_EAST_VALUE;
		}
		case FACING_NORTH_CODE: {
			return FACING_NORTH_VALUE;
		}
		case FACING_WEST_CODE: {
			return FACING_WEST_VALUE;
		}
		case FACING_SOUTH_CODE: {
			return FACING_SOUTH_VALUE;
		}
		default: {
			return null;
		}
	}
}
/**
 * Returns the current position adding 90
 * @param {*} degreePosition number
 */
export function calculateRight(degreePosition) {
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
/**
 * Returns the current position subtracting 90
 * @param {*} degreePosition number
 */
export function calculateLeft(degreePosition) {
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

export const Methods = { sendCommand, enableFreewill, resetRobotState };
export const Constants = {
	FACING_WEST_VALUE,
	FACING_NORTH_VALUE,
	FACING_EAST_VALUE,
	FACING_SOUTH_VALUE,
	ROBOT_MOVEMENT,
	CHANGE_SIZE_TABLEBOARD,
	CHANGE_FACING_ROBOT,
	ERROR_MESSAGE,
	SHOW_REPORT,
	RESET_ROBOT_STATE
};
