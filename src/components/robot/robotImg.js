import React from "react";

const RobotImg = (props) => {
    const { facing } = props;
    let src = "";

    switch (facing) {
        case 270: {
            src = "rsouth.png";
            break;
        }
        case 90: {
            src = "rnorth.png";
            break;
        }
        case 0: {
            src = "reast.png";
            break;
        }
        case 180: {
            src = "rwest.png";
            break;
        }
    }

    return (
        <img src={`../../../assest/robot/${src}`} height={100} width={100} />
    )
}

export default RobotImg;