import { connect } from "react-redux";

import Index from "./index";

const mapStateToProps = (state) => {
	return {
		robot: state.robotStore,
		tableboard: state.tableboardStore
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
