import React from "react";
import TableBoard from "../../components/tableboard";
import "./home.css";

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
		this.intervalId = null;

		this.props.resetRobotState();
	}

	render() {
		console.log("index was rendered");
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
									onClick={() => this.props.sendCommand(this.state.action)}>Execute command</button>
								<button
									type="button"
									className="btn btn-primary margin-right-xxxs"
									onClick={() => this.onEnableFreewill()}>Active freewill</button>
								<button
									type="button"
									className="btn btn-primary margin-right-xxxs"
									onClick={() => this.onTurnOffFreewill()}>Disable freewill</button>
							</div>
							<div className="col-12">
								{this.intervalId != null ?
									<div className="alert alert-danger" role="alert">
										THE ROBOT HAS TAKEN CONTROL OF ITS MOVEMENTS
								  	</div> :
									<textarea rows={10} cols={55} value={this.state.value} onChange={(evt) => this.onActionChange(evt)}></textarea>
								}

							</div>
							<div className="col-12">
								<label>Output</label>
							</div>
							<div className="col-12">
								<input type="textbox" style={{ color: "red" }} value={this.props.reportMessage} readOnly />
							</div>
							<div className="col-12">
								<label>{this.props.errorMessage}</label>
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