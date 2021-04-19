import React, { Component } from "react";

class Ankara extends Component {
	page = {
		title: "Ankara with Marvealous Designer",
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
						src="/Images/project/ankara_001.png"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/ankara_002.png"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/ankara_003.png"
						alt="image_image"
					/>
				</div>
			</div>
		);
	}
}

export default Ankara;
