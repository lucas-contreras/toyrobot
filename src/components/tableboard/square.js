import React from "react";
import PropTypes from "prop-types";
import { pure } from "recompose";

import "./tableboard.css";

/**
 * Represents an Square of tableboard
 * @param {*} props 
 */
const Square = pure((props) => (<div className="square">{props.children}</div>));

Square.propTypes = {
    children: PropTypes.node
}

export default Square;