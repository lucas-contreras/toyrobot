import React from "react";
import TableBoard from "../../components/tableboard";
import Robot from "../../components/robot";

export default class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			action: ""
		}
	}

	onActionChange(evt) {
		this.setState({ action: evt.target.value });
	}

	render() {
		console.log("index is rendering...");
		const { tableboard, robot } = this.props;

		return (
			<div>
				<div>
					<input
						type="text"
						value={this.state.action}
						onChange={(evt) => this.onActionChange(evt)} />
					<button
						type="button"
						onClick={() => this.props.sendCommand(this.state.action)}>send command</button>
				</div>
				<div>
					{this.props.app.errorMessage}
				</div>
				<TableBoard size={tableboard.size} robot={robot} />
			</div>
		);
	}
}