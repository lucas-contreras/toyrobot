const initialState = {
	size: {
		x: 5,
		y: 5
	}
};

export default function tableboardStore(state = initialState, action) {
	switch (action.type) {
		case "": {
			return { ...state };
		}
		default: {
			return state;
		}
	}
}
