import configureMockStore from "redux-mock-store";

import thunk from "redux-thunk"
import multi from "redux-multi"

import { Methods, Constants } from "./home/actions/homeActions";

const appStore = {
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

describe('Actions', () => {
    const middlewares = [thunk]; // add your middlewares like `redux-thunk`
    const mockStore = configureMockStore(middlewares);

    it('should dispatch action', () => {
        const action = Methods.changeCommands("MOVE");
        const expectedActions = [action];

        const store = mockStore(appStore, expectedActions);
        store.dispatch(action);
    })
})