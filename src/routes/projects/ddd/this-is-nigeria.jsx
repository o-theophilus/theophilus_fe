import React, { Component } from "react";

class TIN extends Component {
	page = {
		title: "This is Nigeria",
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
						src="/Images/project/tin_001.png"
						alt="image_image"
					/>
					<br />
					<br />
					<video controls>
						<source
							src="/Images/project/tin_001.mp4"
							type="video/mp4"
						/>
					</video>
				</div>
			</div>
		);
	}
}

export default TIN;
