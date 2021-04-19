import React, { Component } from "react";

class Flipaxis extends Component {
	page = {
		title: "Flipaxis Logo",
		description: "",
		tab: "Projects"
	};

	componentDidMount() {
		this.props.pageProperties(this.page);
	}

	render() {
		return (
			<div className="grp">
				<div className="unit">
					<img
						className="noDesign"
						src="/Images/project/flipaxis_001.png"
						alt="image_image"
					/>
				</div>
			</div>
		);
	}
}

export default Flipaxis;
