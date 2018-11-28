import { Constants } from "../../screens/home/actions/homeActions";

const initialState = {
    errorMessage: "",
}

export default function appStore(state = initialState, action) {
    switch (action.type) {
        case Constants.COMMAND_ERROR: {
            return {
                ...state,
                errorMessage: action.error
            }
        }
        default: {
            return state;
        }
    }
}