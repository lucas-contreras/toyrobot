import React from "react";
import PropTypes from "prop-types";

import RobotImg from "./robotImg";

/**
 * Component that represent the robot itselft
 * @param {*} props 
 */
const Robot = (props) => (<div><RobotImg facing={props.robot.facing} /></div>)

Robot.propTypes = {
    robot: PropTypes.object.isRequired
}

export default Robot;