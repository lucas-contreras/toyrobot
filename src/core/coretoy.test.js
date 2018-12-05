import {
    Methods,
    Constants
} from "./coretoy"

describe("Test no async action", () => {
    it("Trying to move the robot 1 step to right", () => {
        const robot = { position: { x: 0, y: 0 }, facing: Constants.FACING_EAST_VALUE };
        const size = { x: 5, y: 5 };

        const expectedValue = { position: { x: 1, y: 0 }, facing: Constants.FACING_EAST_VALUE, wasMoved: true };

        expect(Methods.calculateMovement(robot, size)).toEqual(expectedValue);
    });

    it("Trying to move the robot 1 step over the table facing north", () => {
        const robot = { position: { x: 4, y: 4 }, facing: Constants.FACING_NORTH_VALUE };
        const size = { x: 5, y: 5 };

        const expectedValue = { position: { x: 4, y: 4 }, facing: Constants.FACING_NORTH_VALUE, wasMoved: false };

        expect(Methods.calculateMovement(robot, size)).toEqual(expectedValue);
    });

    it("Move left facing", () => {
        expect(Methods.calculateLeft(Constants.FACING_SOUTH_VALUE)).toEqual(Constants.FACING_WEST_VALUE);
    });

    it("Move right facing", () => {
        expect(Methods.calculateRight(Constants.FACING_SOUTH_VALUE)).toEqual(Constants.FACING_EAST_VALUE);
    });

    it("Getting Codes by Values", () => {
        expect(Methods.getFacingCodeByValue(Constants.FACING_NORTH_VALUE)).toEqual(Constants.FACING_NORTH_CODE);
    });

    it("Getting Values by Codes", () => {
        expect(Methods.getFacingValueByCode(Constants.FACING_NORTH_CODE)).toEqual(Constants.FACING_NORTH_VALUE);
    });

    it("Getting Values by Codes", () => {
        const robot = { position: { x: 0, y: 0 }, facing: Constants.FACING_EAST_VALUE };
        const size = { x: 5, y: 5 };

        const evaluateExpression = Methods.calculateRandomPosition(robot, size);

        expect(evaluateExpression.result).not.toEqual({});
    });

    it("Printing Report", () => {
        const robot = { position: { x: 0, y: 0 }, facing: Constants.FACING_EAST_VALUE };
        const size = { x: 5, y: 5 };

        const evaluateExpression = Methods.getReport(0, 1, Constants.FACING_NORTH_CODE);
        const expectedValue = "Output: 0, 1, NORTH"

        expect(evaluateExpression).toEqual(expectedValue);
    });
});