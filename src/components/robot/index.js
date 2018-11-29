import React from "react";
import RobotImg from "./robotImg";

/**
 * Component that represent the robot itselft
 * @param {*} props 
 */
const Robot = (props) => (<div><RobotImg facing={props.robot.facing} /></div>)

export default Robot;