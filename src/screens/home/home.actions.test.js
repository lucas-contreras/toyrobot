import { Constants, Methods } from "./actions/homeActions";

describe("Test no async action", () => {
    it("Calculating movement facing 270", () => {
        const robot = { position: { x: 0, y: 0 }, facing: 270 };
        const size = { x: 5, y: 5 };

        const expectedValue = { position: { x: 0, y: 1 }, facing: 270, wasMoved: true };

        expect(Methods.calulateMovement(robot, size)).toEqual(expectedValue);
    });

    it("Calculating movement facing 270 at the bottom right corner", () => {
        const robot = { position: { x: 4, y: 4 }, facing: 270 };
        const size = { x: 5, y: 5 };

        const expectedValue = { position: { x: 4, y: 4 }, facing: 270, wasMoved: false };

        expect(Methods.calulateMovement(robot, size)).toEqual(expectedValue);
    });

    it("Move left facing", () => {
        expect(Methods.calculateLeft(270)).toEqual(180);
    });

    it("Move right facing", () => {
        expect(Methods.calculateRight(270)).toEqual(0);
    });

    it("Getting Codes by Values", () => {
        expect(Methods.getFacingCodeByValue(Constants.FACING_NORTH_VALUE)).toEqual(Constants.FACING_NORTH_CODE);
    });

    it("Getting Values by Codes", () => {
        expect(Methods.getFacingValueByCode(Constants.FACING_NORTH_CODE)).toEqual(Constants.FACING_NORTH_VALUE);
    });
});