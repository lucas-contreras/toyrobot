import React from "react";
import TableBoard from "../../components/tableboard";
import Robot from "../../components/robot";

export default class Home extends React.Component {
	render() {
		const { tableboard, robot } = this.props;

		return (
			<div>
				<TableBoard size={tableboard.size} robot={robot}>
					<Robot robot={robot} />
				</TableBoard>
			</div>
		);
	}
}

//
