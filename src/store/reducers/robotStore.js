import { ActionConstants } from "../../screens/home/actions/homeActions";

const initialState = {
	positionX: 0,
	positionY: 0,
	currentFacing: 0
};

export default function robotStore(state = initialState, action) {
	switch (action.type) {
		case ActionConstants.CHANGE_FACING_ROBOT: {
			return { ...state };
		}
		default: {
			return state;
		}
	}
}
