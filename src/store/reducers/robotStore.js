import { Constants } from "../../screens/home/actions/homeActions";

const initialState = {
	positionX: 0,
	positionY: 0,
	currentFacing: 270
};

export default function robotStore(state = initialState, action) {
	switch (action.type) {
		case Constants.CHANGE_FACING_ROBOT: {
			return {
				...state,
				currentFacing: action.value
			};
		}
		case Constants.ROBOT_MOVEMENT: {
			return {
				...state
			}
		}
		default: {
			return state;
		}
	}
}
