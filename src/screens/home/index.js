import React from "react";
import TableBoard from "../../components/tableboard";

export default class Home extends React.Component {
	render() {
		return (
			<div>
				<TableBoard size={{ x: 2, y: 2 }} />
			</div>
		);
	}
}
