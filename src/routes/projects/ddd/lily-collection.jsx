import React, { Component } from "react";

class Lily extends Component {
	page = {
		title: "Lily Collection",
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
						src="/Images/project/lilyCollection_001.png"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/lilyCollection_002.png"
						alt="image_image"
					/>
				</div>
			</div>
		);
	}
}

export default Lily;
