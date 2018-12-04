import { Constants } from "../screens/home/actions/homeActions";

const initialState = {
	errorMessage: "",
	reportMessage: "",
	commands: "",
	robot: {
		position: {
			x: 0,
			y: 0
		},
		facing: 270
	},
	tableboard: {
		size: {
			x: 5,
			y: 5
		}
	}
};

export default function appStore(state = initialState, action) {
	switch (action.type) {
		case Constants.ERROR_MESSAGE: {
			return {
				...state,
				errorMessage: action.error
			};
		}
		case Constants.CHANGE_FACING_ROBOT: {
			return {
				...state,
				isReset: false,
				robot: {
					...state.robot,
					facing: action.value
				}
			};
		}
		case Constants.ROBOT_MOVEMENT: {
			const { robot, outputMessage } = action;

			return {
				...state,
				errorMessage: "",
				reportMessage: outputMessage,
				isReset: false,
				robot: {
					position: robot.position,
					facing: robot.facing
				}
			};
		}
		case Constants.SHOW_REPORT: {
			const { position, facingCode } = action.robot;

			return {
				...state,
				reportMessage: getReport(position.x, position.y, facingCode)
			};
		}
		case Constants.RESET_ROBOT_STATE: {
			return initialState;
		}
		case Constants.CHANGE_COMMANDS: {
			return {
				...state,
				commands: action.value
			};
		}
		default: {
			return state;
		}
	}
}
