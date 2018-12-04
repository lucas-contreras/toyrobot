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

	freeRoadAround() {
		if (!this.intervalId) {
			this.intervalId = setInterval(() => {
				this.props.freeRoadAround();
			}, 1000);
		}
	}

	onResetState() {
		clearInterval(this.intervalId);
		this.intervalId = null;

		this.props.resetState();
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
									onClick={() => this.props.sendCommand(this.props.commands)}
								>
									Execute command
								</button>
								<button
									type="button"
									className="btn btn-primary margin-right-xxxs"
									disabled={this.intervalId != null}
									onClick={() => this.freeRoadAround()}
								>
									Free Roam Around
								</button>
								<button
									type="button"
									className="btn btn-primary margin-right-xxxs"
									onClick={() => this.onResetState()}
								>
									Reset All
								</button>
							</div>
							<div className="col-12">
								{this.intervalId != null ? (
									<div className="alert alert-danger" role="alert">
										Freewill has been activated
									</div>
								) : (
									<textarea
										rows={10}
										cols={55}
										value={this.props.commands}
										onChange={(evt) => this.onActionChange(evt)}
									/>
								)}
							</div>
							<div className="col-12">
								<label title="Output result">{this.props.reportMessage}</label>
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
