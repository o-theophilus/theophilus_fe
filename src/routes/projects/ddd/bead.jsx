import React, { Component } from "react";

class Bead extends Component {
	page = {
		title: "Bead",
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
						src="/Images/project/bead_001.jpeg"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/bead_010.jpeg"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/bead_004.jpeg"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/bead_005.jpeg"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/bead_006.jpeg"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/bead_007.jpeg"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/bead_008.jpeg"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/bead_009.jpeg"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/bead_002.jpeg"
						alt="image_image"
					/>
					<br />
					<br />
					<img
						className="noDesign"
						src="/Images/project/bead_003.jpeg"
						alt="image_image"
					/>
				</div>
			</div>
		);
	}
}

export default Bead;
