import React, { Component } from "react";

class Danfo extends Component {
	page = {
		title: "Danfo 2.0",
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
						src="/Images/project/danfo_001.png"
						alt="image_image"
					/>
					<br />
					<br />
					<video controls>
						<source
							src="/Images/project/danfo_001.mp4"
							type="video/mp4"
						/>
					</video>
					<br />
					<br />
					<a
						href="assets/Images/project/danfo_001.pdf"
						className="btn"
						target="_blank"
					>
						Manual
					</a>
				</div>
			</div>
		);
	}
}

export default Danfo;
