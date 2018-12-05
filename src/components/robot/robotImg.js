import React from "react";
import PropTypes from "prop-types";
import {
	FACING_SOUTH_VALUE,
	FACING_NORTH_VALUE,
	FACING_EAST_VALUE,
	FACING_WEST_VALUE
} from "../../core/coretoy";

/**
 * Component that represents image robot
 * @param {*} props
 */
const RobotImg = (props) => {
	const { facing } = props;
	let src = "";

	switch (facing) {
		case FACING_SOUTH_VALUE: {
			src = "rsouth.png";
			break;
		}
		case FACING_NORTH_VALUE: {
			src = "rnorth.png";
			break;
		}
		case FACING_EAST_VALUE: {
			src = "reast.png";
			break;
		}
		case FACING_WEST_VALUE: {
			src = "rwest.png";
			break;
		}
	}

	return <img src={`../../../assets/robot/${src}`} height={70} width={70} />;
};

RobotImg.propTypes = {
	facing: PropTypes.number.isRequired
};

export default RobotImg;
