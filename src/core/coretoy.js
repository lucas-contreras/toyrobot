export const FACING_EAST_VALUE = 0;
export const FACING_NORTH_VALUE = 90;
export const FACING_WEST_VALUE = 180;
export const FACING_SOUTH_VALUE = 270;

export const FACING_EAST_CODE = "EAST";
export const FACING_NORTH_CODE = "NORTH";
export const FACING_WEST_CODE = "WEST";
export const FACING_SOUTH_CODE = "SOUTH";

export const COMMAND_PLACE = "PLACE";
export const COMMAND_MOVE = "MOVE";
export const COMMAND_LEFT = "LEFT";
export const COMMAND_RIGHT = "RIGHT";
export const COMMAND_REPORT = "REPORT";

/**
 * Returns the final position of robot
 * @param {*} command array of string with the commands
 * @param {*} robot robot object {position: {x: number, y:number}, facing: number}
 * @param {*} maxSizeAllowed size of the tableboard {x: number, y: number}
 */
export function processCommand(command = "", robot, maxSizeAllowed) {
    const newCommands = [];
    const commandsNotFound = [];

    let error = false;
    let printReport = false;
    let robotConfig = { ...robot };
    let resultPlaceCommand = null;

    command.split(/\n/).forEach(c => {
        if (c !== "") {
            newCommands.push(c.toUpperCase());
        }
    });

    resultPlaceCommand = validatePlaceCommand(newCommands[0], maxSizeAllowed);

    if (resultPlaceCommand.error) {
        return resultPlaceCommand;
    } else {
        newCommands.forEach(nc => {
            const initPlaceCmdObj = validatePlaceCommand(nc, maxSizeAllowed);
            
            if (initPlaceCmdObj.result){
                switch (nc.replace(/\s/, "")) {
                    /*cal*/
                    case COMMAND_PLACE: {
                        break;
                    }
                    case COMMAND_MOVE: {
                        robotConfig = calulateMovement(robotConfig, maxSizeAllowed);
                        break;
                    }
                    case COMMAND_LEFT: {
                        robotConfig.facing = calculateLeft(robotConfig.facing);
                        break;
                    }
                    case COMMAND_RIGHT: {
                        robotConfig.facing = calculateRight(robotConfig.facing);
                        break;
                    }
                    case COMMAND_REPORT: {
                        printReport = true;
                        break;
                    }
                    default: {
                        error = true;
                        commandsNotFound.push(nc);
                        break;
                    }
                }
            }
        });
    }

    if (error) {
        return {
            error,
            message: "Syntax error: " + commandsNotFound.join(", ") + " one or more commands/parameters are incorrect",
            result: {}
        }
    } else {
        return {
            error,
            message: "",
            result: resultPlaceCommand.result
        }
    }
}
/**
 * Returns a robot object with randoms coordinates in the tableboard
 * @param {*} robot robot object {position: {x: number, y:number}, facing: number}
 * @param {*} maxSizeAllowed size of the tableboard {x: number, y: number}
 */
export function calculateRandomPosition(robot, maxSizeAllowed) {
    let moveFoward = (Math.floor(Math.random() * 20) > 5);
    let newRobot = null;

    if (moveFoward) {
        const result = calculateMovement(robot, maxSizeAllowed);

        if (result.wasMoved == false) {
            moveFoward = false;
        } else {
            newRobot = {
                position: result.position,
                facing: result.facing
            }
        }
    }

    if (moveFoward == false) {
        const moveLeft = (Math.floor(Math.random() * 20) > 10);
        let facing = 0;

        if (moveLeft) {
            facing = calculateLeft(robot.facing);
        } else {
            facing = calculateRight(robot.facing);
        }

        newRobot = { ...robot, facing }
    }

    return newRobot
}
/**
 * Returns an robot object with the new coordinates in the tableboard
 * @param {*} robot robot object {position: {x: number, y:number}, facing: number}
 * @param {*} maxSizeAllowed size of the tableboard {x: number, y: number}
 */
export function calculateMovement(robot, maxSizeAllowed) {
    /*destructuring variable robot, i get position and facing props*/
    const { position, facing } = robot;
    const newPosition = { x: position.x, y: position.y, };

    let wasMoved = false;

    switch (facing) {
        case FACING_WEST_VALUE: {
            if (newPosition.x <= maxSizeAllowed.x && newPosition.x > 0) {
                newPosition.x--;
                wasMoved = true;
            }
            break;
        }
        case FACING_EAST_VALUE: {
            if ((newPosition.x + 1) < maxSizeAllowed.x) {
                newPosition.x++;
                wasMoved = true;
            }
            break;
        }
        case FACING_SOUTH_VALUE: {
            if ((newPosition.y + 1) < maxSizeAllowed.y) {
                newPosition.y++;
                wasMoved = true;
            }
            break;
        }
        case FACING_NORTH_VALUE: {
            if (newPosition.y <= maxSizeAllowed.y && newPosition.y > 0) {
                newPosition.y--;
                wasMoved = true;
            }
            break;
        }
    }

    return {
        position: newPosition,
        facing,
        wasMoved
    };
}
/**
 * Returns the robot position adding 90
 * @param {*} currentPosition number
 */
export function calculateRight(currentPosition) {
	/*if the result is more or equal than 360 it means two things, 
		first, the robot has gave a completed a lap 
		second one, the last position was facing to left and its current position is 360
	in both cases the next position must be 0 in order to facing front back*/
    let result = currentPosition + 90;

    if (result >= 360) {
        result = 0;
    }

    return result;
}
/**
 * Returns the robot position subtracting 90
 * @param {*} currentPosition number
 */
export function calculateLeft(currentPosition) {
	/*if the result is less than 0 it means two things, 
		first, the robot has gave a completed a lap 
		second one, the last position was facing to right and its current position is 0 so is negative
	in both cases the next position must be 270 in order to facing front part*/
    let result = currentPosition - 90;

    if (result < 0) {
        result = 270;
    }

    return result;
}
/**
 * Returns a code facing depending of a value
 * @param {*} value number - value position (can be 0, 90, 180 or 270)
 */
export function getFacingCodeByValue(value = 0) {
    switch (value) {
        case FACING_EAST_VALUE: {
            return FACING_EAST_CODE;
        }
        case FACING_NORTH_VALUE: {
            return FACING_NORTH_CODE;
        }
        case FACING_WEST_VALUE: {
            return FACING_WEST_CODE;
        }
        case FACING_SOUTH_VALUE: {
            return FACING_SOUTH_CODE;
        }
        default: {
            return null;
        }
    }
}
/**
 * Returns a value facing depeding of a code
 * @param {*} value code - code position (can be north, west, east or south)
 */
export function getFacingValueByCode(code = "") {
    switch (code.replace(/\s/, "").toUpperCase()) {
        case FACING_EAST_CODE: {
            return FACING_EAST_VALUE;
        }
        case FACING_NORTH_CODE: {
            return FACING_NORTH_VALUE;
        }
        case FACING_WEST_CODE: {
            return FACING_WEST_VALUE;
        }
        case FACING_SOUTH_CODE: {
            return FACING_SOUTH_VALUE;
        }
        default: {
            return null;
        }
    }
}
/**
 * 
 * @param {*} command place command
 */
function validatePlaceCommand(command = "", maxSizeAllowed) {
    const result = {
        error: false,
        message: "",
        result: undefined
    }

    if (command.startsWith(COMMAND_PLACE)) {
        const firstPart = command.substring(0, COMMAND_PLACE.length + 1);
        const secondPart = command.substring(COMMAND_PLACE.length, command.length).split(",");

        if (firstPart !== COMMAND_PLACE + " " || secondPart.length != 3) {
            result.error = true;
            result.message = "PLACE COMMAND HAS AN SYNTAX ERROR"
        } else {
            const isNotValidP1 = isNaN(parseInt(secondPart[0]));
            const isNotValidP2 = isNaN(parseInt(secondPart[1]));

            if (isNotValidP1 || isNotValidP2) {
                result.error = true;
                result.message = "THERE IS ONE OR MORE ERRORS IN PLACE COMMAND PARAMS"
            } else {
                const robotConfig = {
                    position: {
                        x: parseInt(secondPart[0]),
                        y: parseInt(secondPart[1])
                    },
                    facing: undefined
                }
                /*needs checking if the positions are correct regarding table size*/
                if (robotConfig.position.x > maxSizeAllowed.x) {
                    robotConfig.position.x = maxSizeAllowed.x - 1;
                }

                if (robotConfig.position.y > maxSizeAllowed.y) {
                    robotConfig.position.y = maxSizeAllowed.y - 1;
                }

                robotConfig.facing = getFacingValueByCode(secondPart[2]);

                if (robotConfig.facing == null) {
                    result.error = true;
                    result.message = "IT SEEMS THE LAST PARAM IS NOT RECOGNIZED"
                } else {
                    result.result = { ...robotConfig };
                }
            }
        }
    } else {
        result.error = true;
        result.message = "PLACE COMMAND MUST BE THE FIRST ONE";
    }

    return result;
}

export default {
    processCommand,
    calculateRandomPosition,
    calculateMovement,
    calculateRight,
    calculateLeft,
    getFacingCodeByValue,
    getFacingValueByCode
}