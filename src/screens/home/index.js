import React from "react";
import TableBoard from "../../components/tableboard";
import "./home.css";

export default class Home extends React.Component {
	constructor(props) {
		super(props);

		this.intervalId = null;
	}

	onActionChange(evt) {
		this.props.changeCommands(evt.target.value);
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
		this.intervalId = null;

		this.props.resetRobotState();
	}

	render() {
		const { tableboard, robot } = this.props;

		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1>Toy Robot</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-12 col-lg-6">
						<div className="row">
							<div className="col-12">
								<label>Commands</label>
							</div>
							<div className="col-12 margin-bottom-xxxs">
								<button
									type="button"
									className="btn btn-primary margin-right-xxxs"
									disabled={this.intervalId != null}
									onClick={() => this.props.sendCommand(this.props.commands)}>Execute command</button>
								<button
									type="button"
									className="btn btn-primary margin-right-xxxs"
									disabled={this.intervalId != null}
									onClick={() => this.onEnableFreewill()}>Active freewill</button>
								<button
									type="button"
									className="btn btn-primary margin-right-xxxs"
									onClick={() => this.onTurnOffFreewill()}>Reset All</button>
							</div>
							<div className="col-12">
								{this.intervalId != null
									? <div className="alert alert-danger" role="alert">Freewill has been activated</div>
									: <textarea rows={10} cols={55} value={this.props.commands} onChange={(evt) => this.onActionChange(evt)}></textarea>
								}

							</div>
							<div className="col-12">
								<label>Output</label>
							</div>
							<div className="col-12">
								<input type="textbox" value={this.props.reportMessage} readOnly title="Here you will see output result when you input REPORT in above input" />
							</div>
							<div className="col-12">
								<label style={{ color: "red" }}>{this.props.errorMessage}</label>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-12 col-lg-6">
						<TableBoard size={tableboard.size} robot={robot} />
					</div>
				</div>
			</div>
		);
	}
}