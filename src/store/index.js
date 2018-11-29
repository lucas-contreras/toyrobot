import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import multi from "redux-multi"

import { Constants } from "../screens/home/actions/homeActions";

const initialState = {
	errorMessage: "",
	reportMessage: "",
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
}

export default function appStore(state = initialState, action) {
	switch (action.type) {
		case Constants.ERROR_MESSAGE: {
			return {
				...state,
				errorMessage: action.error
			}
		}
		case Constants.CHANGE_FACING_ROBOT: {
			return {
				...state,
				robot: {
					...state.robot,
					facing: action.value
				}
			};
		}
		case Constants.ROBOT_MOVEMENT: {
			const hasValue = (action.facing != undefined);

			return {
				...state,
				robot: {
					...state.robot,
					position: {
						...state.robot.position,
						x: action.position.x,
						y: action.position.y
					},
					facing: hasValue ? action.facing : state.robot.facing
				}
			}
		}
		default: {
			return state;
		}
	}
}

export const store = createStore(appStore, applyMiddleware(thunk, multi));
