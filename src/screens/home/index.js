import React from "react";
import TableBoard from "../../components/tableboard";

export default class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = { action: "" }
		this.intervalId = null;
	}

	onActionChange(evt) {
		this.setState({ action: evt.target.value });
	}

	onEnableFreewill() {
		if (!this.intervalId) {
			this.intervalId = setInterval(() => {
				this.props.enableFreewill()
			}, 1000);
		}
	}

	onTurnOffFreewill() {
		clearInterval(this.intervalId);
	}

	render() {
		console.log("index was rendered");
		const { tableboard, robot } = this.props;

		return (
			<div>
				<div>
					<textarea rows={10} cols={50} value={this.state.value} onChange={(evt) => this.onActionChange(evt)}></textarea>
					<button
						type="button"
						onClick={() => this.props.sendCommand(this.state.action)}>send command</button>
					<button
						type="button"
						onClick={() => this.onEnableFreewill()}>enable freewill</button>
					<button
						type="button"
						onClick={() => this.onTurnOffFreewill()}>turn off freewill</button>
				</div>
				<div>{this.props.errorMessage}</div>
				<TableBoard size={tableboard.size} robot={robot} />
			</div>
		);
	}
}