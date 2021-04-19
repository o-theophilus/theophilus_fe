import React, { Component } from "react";

class Mvsuv extends Component {

	page = {
		title: "Model Viewer - S3V Range Rover L322",
		description: "",
		tab: "Projects"
	};

	componentDidMount() {
		this.props.pageProperties(this.page);
	}

	// getHeight = () => {
	// 	const width = this.refs.iFrame.getBoundingClientRect().width;
	// 	// return (width / 4) * 3 + 40 + "px";
	// 	console.log(width);
	// 	return width + "px";
	// };

	render() {
		return (
			<div className="unit">
				<iframe
					title="iframe"
					src="/Images/project/mvS3V/index.html"
					style={{ width: "100%", height: "500px" }}
					ref="iFrame"
				></iframe>
			</div>
		);
	}
}

export default Mvsuv;
