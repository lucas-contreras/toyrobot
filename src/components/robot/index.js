import React from "react";

export default class Robot extends React.Component {
	render() {
		return (
			<div>
				{this.renderRobotPosition()}
			</div>
		)
	}

	renderRobotPosition() {
		const { robot } = this.props;
		switch (robot.currentFacing) {
			case 270: {
				return <div>
					front
				</div>
			}
			case 90: {
				return <div>
					back
				</div>
			}
			case 0: {
				return <div>
					right
				</div>
			}
			case 180: {
				return <div>
					left
				</div>
			}
			default: {
				return <div>never must be here!</div>
			}
		}
	}
}
