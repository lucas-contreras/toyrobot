export const MOVE_NORTH = "MOVE_NORTH";
export const MOVE_WEST = "MOVE_WEST";
export const MOVE_EAST = "MOVE_EAST";
export const MOVE_SOUTH = "MOVE_SOUTH";

export const FACING_LEFT_VALUE = 0;
export const FACING_BACK_VALUE = 90;
export const FACING_RIGHT_VALUE = 180;
export const FACING_FRONT_VALUE = 270;

export const ROBOT_DIRECTION_LEFT = 0;
export const ROBOT_DIRECTION_RIGTH = 1;

export const CHANGE_SIZE_TABLEBOARD = "CHANGE_SIZE_TABLEBOARD";
export const CHANGE_FACING_ROBOT = "CHANGE_FACING_ROBOT";

export function moveFoward() {
	return (dispatch) => {};
}

export function moveToRight(degreePosition) {
	return (dispatch) => {};
}

export function moveToLeft(degreePosition) {
	return (dispatch) => {};
}

export const ActionMethods = { moveFoward, moveToRight, moveToLeft };
export const ActionConstants = {
	MOVE_NORTH,
	MOVE_WEST,
	MOVE_EAST,
	MOVE_SOUTH,
	FACING_LEFT_VALUE,
	FACING_BACK_VALUE,
	FACING_RIGHT_VALUE,
	FACING_FRONT_VALUE,
	CHANGE_SIZE_TABLEBOARD,
	CHANGE_FACING_ROBOT
};
