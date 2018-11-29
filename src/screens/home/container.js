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
		enableFreewill: (option = true) => {
			dispatch(Methods.enableFreewill(option))
		}
	});
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
