export const FACING_LEFT_VALUE = 0;
export const FACING_BACK_VALUE = 90;
export const FACING_RIGHT_VALUE = 180;
export const FACING_FRONT_VALUE = 270;

export const ROBOT_DIRECTION_LEFT = 0;
export const ROBOT_DIRECTION_RIGTH = 1;
export const ROBOT_MOVEMENT = "ROBOT_MOVEMENT";

export const CHANGE_SIZE_TABLEBOARD = "CHANGE_SIZE_TABLEBOARD";
export const CHANGE_FACING_ROBOT = "CHANGE_FACING_ROBOT";
export const COMMAND_ERROR = "COMMAND_ERROR";

export const COMMAND_MOVE = "MOVE";
export const COMMAND_LEFT = "LEFT";
export const COMMAND_RIGHT = "RIGHT";
export const COMMAND_REPORT = "REPORT";

export function sendCommand(command = "") {
	return (dispatch, getState) => {
		const newCommand = command.replace(/\s/, "").toUpperCase();

		const state = getState();
		const { robotStore } = state;

		let error = false;
		let typeDispatch = [
			{ type: COMMAND_ERROR, error: "" }
		];

		switch (newCommand) {
			case COMMAND_MOVE: {
				break;
			}
			case COMMAND_LEFT: {
				typeDispatch.push({ type: CHANGE_FACING_ROBOT, value: calculateLeft(robotStore.currentFacing) });
				break;
			}
			case COMMAND_RIGHT: {
				typeDispatch.push({ type: CHANGE_FACING_ROBOT, value: calculateRight(robotStore.currentFacing) });
				break;
			}
			case COMMAND_REPORT: {
				break;
			}
			default: {
				error = true;
				break;
			}
		}
		if (error) {
			dispatch({ type: COMMAND_ERROR, error: "there was an error to process the command" });
		} else {
			dispatch(typeDispatch);
		}
	}
}

export function moveFoward() {
	return (dispatch) => { };
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

export const Methods = { sendCommand };
export const Constants = {
	FACING_LEFT_VALUE,
	FACING_BACK_VALUE,
	FACING_RIGHT_VALUE,
	FACING_FRONT_VALUE,
	ROBOT_DIRECTION_LEFT,
	ROBOT_DIRECTION_RIGTH,
	ROBOT_MOVEMENT,
	CHANGE_SIZE_TABLEBOARD,
	CHANGE_FACING_ROBOT,
	COMMAND_ERROR
};
