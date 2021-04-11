import React, { Component } from "react";
import ProjectGroup from "../../../old _ theophilus.website/theophilus.website/src2/component/projectGroup";
import "./projects.scss";

class Projects extends Component {
	myProjects = [
		[
			"Web",
			"web",
			[
				[
					"Connekt",
					"Connekt is a social sharing application that enable users to easily find and connect with other users that are interested in the Products or Services which are being Offered or Requested.",
					"connekt_001.png",
					"http://www.connekt.website",
					2,
				],
			],
		],
		[
			"Logos and Banners",
			"logo",
			[
				["Lily Collection", "", "lilyCollection_001.png", "lily", 0],
				["Flipaxis Logo", "", "flipaxis_001.png", "flipaxisLogo", 0],
			],
		],
		[
			"Models, Visualisation and Animation",
			"model",
			[
				[
					"Model Viewer - S3V Range Rover L322",
					"",
					"mvS3V/01.png",
					"s3v",
					0,
				],
				["Beads", "", "bead_003.jpeg", "bead", 0],
				["Charms Interior Design", "", "charms_01_01.png", "charms", 0],
				[
					"Ankara with Marvealous Designer",
					"",
					"ankara_001.png",
					"ankara",
					0,
				],
				["Bliss", "", "faceoff_003.png", "bliss", 0],
				[
					"Interrogation Room",
					"",
					"interrogationRoom_005.png",
					"interrogationRoom",
					0,
				],
				[
					"National Identity Management Commission",
					"",
					"nimc_001.png",
					"nimc",
					0,
				],
				["Akropol", "", "akropol_001.jpeg", "akropol", 0],
				[
					"This is Nigeria ft. Falz",
					"Fan art",
					"tin_001.png",
					"tin",
					0,
				],
				[
					"Danfo 2.0",
					"How to rig a Vehicle tutorial.",
					"danfo_001.png",
					"danfo",
					0,
				],
			],
		],
		[
			"Electronics",
			"elect",
			[
				[
					"Arduino Smart Car",
					"",
					"arduino_001.png",
					"arduinoSmartCar",
					0,
				],
			],
		],
		[
			"Others",
			"others",
			[
				["Costar Brochure", "", "costar_001.png", "costar_001.pdf", 1],
				["Aris Brochure", "", "aris_001.png", "aris_001.pdf", 1],
			],
		],
	];

	componentDidMount() {
		document.title = `Project | Theophilus`;
	}

	render() {
		return (
			<React.Fragment>
				{this.myProjects.map((group) => (
					<ProjectGroup
						key={group[1]}
						name={group[0]}
						section={group[1]}
						data={group[2]}
					/>
				))}
			</React.Fragment>
		);
	}
}

export default Projects;
