import { connect } from "react-redux";

import Index from "./index";
import { Methods } from "./actions/homeActions";

const mapStateToProps = (state) => {
	return {
		app: state.appStore,
		robot: state.robotStore,
		tableboard: state.tableboardStore
	};
};

const mapDispatchToProps = (dispatch) => {
	return ({
		sendCommand: (command) => {
			dispatch(Methods.sendCommand(command));
		}
	});
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
