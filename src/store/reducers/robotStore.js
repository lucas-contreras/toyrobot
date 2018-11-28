const initialState = {
	positionX: 0,
	positionY: 0,
	currentFacing: 270
};

export default function robotStore(state = initialState, action) {
	switch (action.type) {
		case "": {
			return { ...state };
		}
		default: {
			return state;
		}
	}
}
