import React from "react";
import PropTypes from "prop-types";
import "./tableboard.css";

/**
 * Represents an Square of tableboard
 * @param {*} props 
 */
const Square = (props) => (<div className="square">{props.children}</div>);

Square.propTypes = {
    children: PropTypes.element
}

export default Square;