import core from "coretoy"

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
export const CHANGE_COMMANDS = "CHANGE_COMMANDS";
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
		debugger;
		const { robot, tableboard } = getState();
		const result = core.processCommand(command, robot, tableboard.size);

		if (result.error) {
			dispatch({ type: ERROR_MESSAGE, error: result.message });
		} else {

		}
	}
}
/**
 * Gives the robot feel free to do whatever he wants.
 * @param {*} option boolean
 */
export function enableFreewill(option) {
	return (dispatch, getState) => {
		const { robot, tableboard } = getState();
		const result = core.calculateRandomPosition(robot, tableboard.size);

		dispatch({ type: ROBOT_MOVEMENT, robot: result });
	}
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
 * 
 * @param {*} commands 
 */
export function changeCommands(commands) {
	return (dispatch) => {
		dispatch({ type: CHANGE_COMMANDS, value: commands });
	}
}

export const Methods = {
	sendCommand,
	enableFreewill,
	resetRobotState,
	changeCommands
};
export const Constants = {
	FACING_WEST_VALUE,
	FACING_NORTH_VALUE,
	FACING_EAST_VALUE,
	FACING_SOUTH_VALUE,
	FACING_EAST_CODE,
	FACING_NORTH_CODE,
	FACING_WEST_CODE,
	FACING_SOUTH_CODE,
	ROBOT_MOVEMENT,
	CHANGE_SIZE_TABLEBOARD,
	CHANGE_FACING_ROBOT,
	CHANGE_COMMANDS,
	ERROR_MESSAGE,
	SHOW_REPORT,
	RESET_ROBOT_STATE
};