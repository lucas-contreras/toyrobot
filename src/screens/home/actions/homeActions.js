import core from "coretoy";

export const ROBOT_MOVEMENT = "ROBOT_MOVEMENT";

export const CHANGE_SIZE_TABLEBOARD = "CHANGE_SIZE_TABLEBOARD";
export const CHANGE_FACING_ROBOT = "CHANGE_FACING_ROBOT";
export const CHANGE_COMMANDS = "CHANGE_COMMANDS";
export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const SHOW_REPORT = "SHOW_REPORT";
export const RESET_ROBOT_STATE = "RESET_ROBOT_STATE";

/**
 * Executes the commands passed through params
 * @param {*} command array of string about commands availables
 */
export function sendCommand(command = "") {
	return (dispatch, getState) => {
		const { robot, tableboard } = getState();
		const operation = core.processCommand(command, tableboard.size);

		if (operation.error) {
			dispatch({ type: ERROR_MESSAGE, error: operation.message });
		} else {
			dispatch({
				type: ROBOT_MOVEMENT,
				robot: operation.result,
				outputMessage: operation.outputMessage
			});
		}
	};
}
/**
 * Gives the robot feel free to do whatever he wants.
 */
export function freeRoadAround() {
	return (dispatch, getState) => {
		const { robot, tableboard } = getState();
		const result = core.calculateRandomPosition(robot, tableboard.size);

		dispatch({ type: ROBOT_MOVEMENT, robot: result });
	};
}

/**
 * Resets the robot state
 */
export function resetState() {
	return (dispatch) => {
		dispatch({ type: RESET_ROBOT_STATE });
	};
}
/**
 *
 * @param {*} commands
 */
export function changeCommands(commands) {
	return (dispatch) => {
		dispatch({ type: CHANGE_COMMANDS, value: commands });
	};
}

export const Methods = {
	sendCommand,
	freeRoadAround,
	resetState,
	changeCommands
};
export const Constants = {
	ROBOT_MOVEMENT,
	CHANGE_SIZE_TABLEBOARD,
	CHANGE_FACING_ROBOT,
	CHANGE_COMMANDS,
	ERROR_MESSAGE,
	SHOW_REPORT,
	RESET_ROBOT_STATE
};
