import { connect } from "react-redux";

import Index from "./index";
import { Methods } from "./actions/homeActions";

const mapStateToProps = (state) => {
	return {
		...state
	};
};

const mapDispatchToProps = (dispatch) => {
	return ({
		sendCommand: (command) => {
			dispatch(Methods.sendCommand(command));
		},
		freeRoadAround: (option = true) => {
			dispatch(Methods.freeRoadAround(option))
		},
		resetState: () => {
			dispatch(Methods.resetState())
		},
		changeCommands: (commands) => {
			dispatch(Methods.changeCommands(commands));
		}
	});
};

/**
 * HOC Index
 */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
