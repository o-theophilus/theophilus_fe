import React, { Component } from "react";

class Bliss extends Component {
	page = {
		title: "Bliss",
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
						src="/Images/project/faceoff_002.png"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/faceoff_009.png"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/faceoff_001.png"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/faceoff_004.png"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/faceoff_005.png"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/faceoff_006.png"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/faceoff_010.png"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/faceoff_011.png"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/faceoff_003.png"
						alt="image_image"
					/>
				</div>
			</div>
		);
	}
}

export default Bliss;
