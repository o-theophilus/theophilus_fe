import React, { Component } from "react";

class NIMC extends Component {
	page = {
		title: "National Identity Management Commission",
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
					<video controls>
						<source
							src="/Images/project/nimc_001.mp4"
							type="video/mp4"
						/>
					</video>
				</div>
			</div>
		);
	}
}

export default NIMC;
