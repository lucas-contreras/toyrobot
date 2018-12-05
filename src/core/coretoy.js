import { removeAllSpaces } from "../utils/utils";

export const FACING_EAST_VALUE = 0;
export const FACING_NORTH_VALUE = 90;
export const FACING_WEST_VALUE = 180;
export const FACING_SOUTH_VALUE = 270;

export const FACING_EAST_CODE = "EAST";
export const FACING_NORTH_CODE = "NORTH";
export const FACING_WEST_CODE = "WEST";
export const FACING_SOUTH_CODE = "SOUTH";

export const COMMAND_PLACE = "PLACE";
export const COMMAND_MOVE = "MOVE";
export const COMMAND_LEFT = "LEFT";
export const COMMAND_RIGHT = "RIGHT";
export const COMMAND_REPORT = "REPORT";

/**
 * Returns the final position of robot
 * @param {*} command array of string with the commands
 * @param {*} maxSizeAllowed size of the tableboard {x: number, y: number}
 */
export function processCommand(command = "", maxSizeAllowed) {
	const newCommands = [];
	const commandsNotFound = [];

	let error = false;
	let errorMessage = "";
	let printReport = false;
	let initPlaceCmdObj = null;

	command.split(/\n/).forEach((c) => {
		if (c !== "") {
			newCommands.push(c.toUpperCase());
		}
	});

	if (newCommands.length == 0) {
		error = true;
		errorMessage = "NO COMMANDS WERE FOUND";
	} else {
		newCommands.forEach((nc, index, self) => {
			/* first intruction MUST BE ALWAYS A PLACE COMMAND */
			if (index == 0) {
				initPlaceCmdObj = validatePlaceCommand(nc, maxSizeAllowed);
			}
			/* IF THERE WAS NOT AN ERROR COULD EXECUTE */
			if (initPlaceCmdObj.error == false && index > 0) {
				switch (removeAllSpaces(nc)) {
					case COMMAND_PLACE: {
						/* another place command was found it, the application ignored it */
						break;
					}
					case COMMAND_MOVE: {
						initPlaceCmdObj.result = calculateMovement(
							initPlaceCmdObj.result,
							maxSizeAllowed
						);
						break;
					}
					case COMMAND_LEFT: {
						initPlaceCmdObj.result.facing = calculateLeft(
							initPlaceCmdObj.result.facing
						);
						break;
					}
					case COMMAND_RIGHT: {
						initPlaceCmdObj.result.facing = calculateRight(
							initPlaceCmdObj.result.facing
						);
						break;
					}
					case COMMAND_REPORT: {
						printReport = true;
						break;
					}
					default: {
						error = true;
						/* create an stack with commands that were not found */
						commandsNotFound.push(nc);
						break;
					}
				}
			} else {
				error = initPlaceCmdObj.error;
				errorMessage = initPlaceCmdObj.message;
			}
		});
	}

	if (commandsNotFound.length > 0) {
		error = true;
		errorMessage =
			"Syntax error: " + commandsNotFound.join(", ") + " one or more commands are incorrect";
	}

	if (error) {
		return { error, message: errorMessage, printReport, result: undefined };
	} else {
		let outputMessage = "";

		if (printReport) {
			const { position, facing } = initPlaceCmdObj.result;
			outputMessage = getReport(position.x, position.y, getFacingCodeByValue(facing));
		}

		return {
			error: false,
			message: "",
			outputMessage,
			result: initPlaceCmdObj.result
		};
	}
}
/**
 * Returns a robot object with randoms coordinates in the tableboard
 * @param {*} robot robot object {position: {x: number, y:number}, facing: number}
 * @param {*} maxSizeAllowed size of the tableboard {x: number, y: number}
 */
export function calculateRandomPosition(robot, maxSizeAllowed) {
	let moveFoward = Math.floor(Math.random() * 20) > 10;
	let newRobot = null;

	if (moveFoward) {
		const result = calculateMovement(robot, maxSizeAllowed);

		if (result.wasMoved == false) {
			moveFoward = false;
		} else {
			newRobot = {
				position: result.position,
				facing: result.facing
			};
		}
	}

	if (moveFoward == false) {
		const moveLeft = Math.floor(Math.random() * 20) > 10;
		let facing = 0;

		if (moveLeft) {
			facing = calculateLeft(robot.facing);
		} else {
			facing = calculateRight(robot.facing);
		}

		newRobot = { ...robot, facing };
	}

	return {
		result: newRobot,
		outputMessage: getReport(
			newRobot.position.x,
			newRobot.position.y,
			getFacingCodeByValue(newRobot.facing)
		)
	};
}
/**
 * Returns an robot object with the new coordinates in the tableboard
 * @param {*} robot robot object {position: {x: number, y:number}, facing: number}
 * @param {*} maxSizeAllowed size of the tableboard {x: number, y: number}
 */
export function calculateMovement(robot, maxSizeAllowed) {
	/*destructuring variable robot, i get position and facing props*/
	const { position, facing } = robot;
	const newPosition = { x: position.x, y: position.y };

	let wasMoved = false;

	switch (facing) {
		case FACING_WEST_VALUE: {
			if (newPosition.x <= maxSizeAllowed.x && newPosition.x > 0) {
				newPosition.x--;
				wasMoved = true;
			}
			break;
		}
		case FACING_EAST_VALUE: {
			if (newPosition.x + 1 < maxSizeAllowed.x) {
				newPosition.x++;
				wasMoved = true;
			}
			break;
		}
		case FACING_SOUTH_VALUE: {
			if (newPosition.y <= maxSizeAllowed.y && newPosition.y > 0) {
				newPosition.y--;
				wasMoved = true;
			}
			break;
		}
		case FACING_NORTH_VALUE: {
			if (newPosition.y + 1 < maxSizeAllowed.y) {
				newPosition.y++;
				wasMoved = true;
			}
			break;
		}
	}

	return {
		position: newPosition,
		facing,
		wasMoved
	};
}
/**
 * Returns the robot position adding 90
 * @param {*} currentPosition number
 */
export function calculateRight(currentPosition) {
	/*if the result is more or equal than 360 it means two things, 
		first, the robot has gave a completed a lap 
		second one, the last position was facing to left and its current position is 360
	in both cases the next position must be 0 in order to facing front back*/
	let result = currentPosition + 90;

	if (result >= 360) {
		result = 0;
	}

	return result;
}
/**
 * Returns the robot position subtracting 90
 * @param {*} currentPosition number
 */
export function calculateLeft(currentPosition) {
	/*if the result is less than 0 it means two things, 
		first, the robot has gave a completed a lap 
		second one, the last position was facing to right and its current position is 0 so is negative
	in both cases the next position must be 270 in order to facing front part*/
	let result = currentPosition - 90;

	if (result < 0) {
		result = 270;
	}

	return result;
}
/**
 * Returns a code facing depending of a value
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
 * Returns a value facing depeding of a code
 * @param {*} value code - code position (can be north, west, east or south)
 */
export function getFacingValueByCode(code = "") {
	switch (removeAllSpaces(code).toUpperCase()) {
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
 * Returns a string with the ouput robot position
 * @param {*} x position X
 * @param {*} y position y
 * @param {*} facingCode facing code
 */
export function getReport(x, y, facingCode) {
	return `Output: ${x}, ${y}, ${facingCode}`;
}
/**
 * Returns a robot object if the command is PLACE
 * @param {*} command command as string
 * @param {*} maxSizeAllowed size of the tableboard {x: number, y: number}
 */
export function validatePlaceCommand(command = "", maxSizeAllowed) {
	const result = {
		error: false,
		message: "",
		result: undefined
	};

	if (command.startsWith(COMMAND_PLACE)) {
		const firstPart = command.substring(0, COMMAND_PLACE.length + 1);
		const secondPart = command.substring(COMMAND_PLACE.length, command.length).split(",");

		if (firstPart !== COMMAND_PLACE + " " || secondPart.length != 3) {
			result.error = true;
			result.message = "PLACE COMMAND HAS AN SYNTAX ERROR";
		} else {
			const isNotValidP1 = isNaN(parseInt(secondPart[0]));
			const isNotValidP2 = isNaN(parseInt(secondPart[1]));

			if (isNotValidP1 || isNotValidP2) {
				result.error = true;
				result.message = "ONE OR MORE ERRORS IN PLACE COMMAND PARAMS";
			} else {
				const robotConfig = {
					position: {
						x: parseInt(secondPart[0]),
						y: parseInt(secondPart[1])
					},
					facing: undefined
				};
				/*needs checking if the positions are correct regarding table size*/
				if (robotConfig.position.x > maxSizeAllowed.x) {
					robotConfig.position.x = maxSizeAllowed.x - 1;
				}

				if (robotConfig.position.y > maxSizeAllowed.y) {
					robotConfig.position.y = maxSizeAllowed.y - 1;
				}

				robotConfig.facing = getFacingValueByCode(secondPart[2]);

				if (robotConfig.facing == null) {
					result.error = true;
					result.message = "LAST PARAM IS NOT RECOGNIZED";
				} else {
					result.result = { ...robotConfig };
				}
			}
		}
	} else {
		result.error = true;
		result.message = "PLACE COMMAND MUST BE THE FIRST INSTRUCTION";
	}

	return result;
}

export const Methods = {
	processCommand,
	calculateRandomPosition,
	calculateMovement,
	calculateRight,
	calculateLeft,
	getFacingCodeByValue,
	getFacingValueByCode,
	getReport
}

export const Constants = {
	FACING_EAST_VALUE,
	FACING_NORTH_VALUE,
	FACING_WEST_VALUE,
	FACING_SOUTH_VALUE,

	FACING_EAST_CODE,
	FACING_NORTH_CODE,
	FACING_WEST_CODE,
	FACING_SOUTH_CODE,

	COMMAND_PLACE,
	COMMAND_MOVE,
	COMMAND_LEFT,
	COMMAND_RIGHT,
	COMMAND_REPORT
}