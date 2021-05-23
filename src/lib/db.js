export let posts = [
	{
		name: 'How I met Svelte',
		slug: 'how_i_met_svelte',
		date: '18 May 2021',
		category: 'Programming',
		img: 'svelte_01.jpg',
		summary: 'The new reactive component based approach to web design',
		type: 'md',
		content: `
Web designing can be a tedious, repeative and uninteresting process, especially now that it is an ever-evolving. You decide to learn a technology by the time you are done learning, it is already obsolete and there is a new tool replacing it.

I have been in search for better approach to web development as most of the methods were not intuitive.

I found many temples engine – Wix, Webflow DreamWeaver, Blue Griffon, WordPress - and libraries - Angular, react jQuery mobile/ desktop, C# with razor. Most of which will get the job done. But you will always run into issues when trying to fix a small bug or modify / add a custom feature. The source code is usually bloated and filled unnecessary and unused codes. This will be a nightmare.

I came across a [blog](https://www.simform.com/best-frontend-frameworks/#section9)  titled *Best Frontend Frameworks of 2021 for Web Development*. The blog listed the the top 9 frontend frameworks according to various features, that was the first time I ever came across Svelte. Guess what? Svelte was not among the top 5 on the list. Inface it was last. But the outlined features caught my attention. Especially for that fact that it the newest on the list, lightweight.

I did a little search and found the maker of Svelte was one ordinary looking dude, Rich Harris was a graphics editor for New York Time.

Really! A graphic designer. Well, I could relate because at the moment I also work as a graphic designer, but I know deep down that I should be programming big time.

I was still sceptical but after watching [this great talk](https://www.youtube.com/watch?v=AdNJ3fydeao) from Rich Harris about rethinking how we build frontend Javascript frameworks and I was sold. If you have half an hour to kill and haven't seen it, check it out. I promise it is better than any content you will find on my blog.

Svelte is a new reactive component-based approach to web design. Svelte works differently by putting the work into a compile step instead of putting them in the browser, unlike frameworks like React and Vue. It does many other things easily and improves most of the bottlenecks of using other frameworks.

Visiting the official website if Svelte and Svelte kit I saw they were well documented and had good examples

At this point my palms are sweaty, knees weak, arms are heavy, I was ready to get my hands wet dive in head first and hope for the best.

I lunched VS Code the one IDE to rule then all, opened the node terminal and with 3 lines of code in less than 1 min I was able to get my web app up and running. My mind was blown, this must be sorcery. Never seen anything like it.


![If you are reading this it was made with Svelte](/images/svelte_02.jpg)

And the rest is history.

I would recommend Svelte if you are:

1. new in web development, lucky you. You will not have to unlearn react😊
2. a veteran in web development, you'll realize how easy life can be
`
	}
];

export let _posts = [
	{
		name: 'Arduino Smart Car',
		slug: 'arduino',
		date: '01 Jan 2021',
		category: 'Electronics',
		img: 'arduino_001.jpg',
		summary: '',
		type: 'html',
		content: `
			<img class="noDesign" src="/images/arduino_001.jpg" alt="image_image" />
			<p>
				Arduino smart little turtle car is a MCU learning application development system. The arduino
				microcontroller series Atmega-328 as the core. This kits include a large of interesting code
				and extensible external circuit module. Thus increase more function.
			</p>
			<br />
			<h3>Features</h3>
			<ul>
				<li>Path Tracking </li>
				<li>Ultrasonic obstacle avoidance</li>
				<li>Infrared remote control</li>
				<li>Bluetooth android mobile control</li>
			</ul>
			<br />
			<h3>Components</h3>
			<img class="noDesign" src="/images/arduino_002.jpg" alt="image_image" />
			<ol>
				<li>Metal gear motor x2</li>
				<li>Wheel x2</li>
				<li>Motor fixed part x2</li>
				<li>Universal wheel x1</li>
				<li>Chassis x2</li>
				<li>L298N motor driver module x1</li>
				<li>Arduino UNO controller x1</li>
				<li>Arduino sensor shield x1</li>
				<li>PTZ x1</li>
				<li>Servo motor x1</li>
				<li>Ultrasonic module x1</li>
				<li>Three channels tracking module x1</li>
				<li>Infrared receive sensor x1</li>
				<li>Remote control x1</li>
				<li>2000MA 18650 battery x2</li>
				<li>18650 battery box x1</li>
				<li>18650 battery charger x1</li>
				<li>Dupont line 1P x40</li>
				<li>M3*35mm copper cylinder x4</li>
				<li>M3*10mm copper cylinder x2</li>
				<li>M3 screw and nut</li>
			</ol>
			<br />
			<h3>Installation</h3>
			<img class="noDesign" src="/images/arduino_003.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_004.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_005.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_006.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_007.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_008.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_009.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_010.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_011.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_012.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_013.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_014.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_015.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_016.jpg" alt="image_image" />
			<img class="noDesign" src="/images/arduino_001.jpg" alt="image_image" />
		`
	},
	{
		name: 'Marked Blog',
		slug: 'test_md_blog',
		date: '15 May 2021',
		category: 'Programming',
		img: 'arduino_001.jpg',
		summary: 'This is an example of a marked blog',
		type: 'md',
		content: undefined
	}
];

export let projects = [
	{
		name: 'Charms Interior Design',
		slug: 'charms',
		date: '01 Jan 2021',
		category: 'Models, Visualisation and Animation',
		img: 'charms_01_01.jpg',
		summary: '',
		type: 'html',
		content: `
			<img class="noDesign" src="/images/charms_01_01.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_01_02.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_01_03.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_01_04.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_01_05.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_01_06.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_01_07.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_01_08.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_01_09.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_01_10.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_02_01.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_02_02.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_02_03.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_02_04.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_02_05.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_02_06.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_02_07.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_02_08.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_02_09.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_02_10.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_03_01.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_03_02.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_03_03.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_03_04.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_03_05.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_03_06.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_03_07.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_03_08.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_03_09.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/charms_03_01.jpg" alt="image_image" />
		`
	},

	{
		name: 'Akropol',
		slug: 'akropol',
		date: '01 Jan 2021',
		category: 'Models, Visualisation and Animation',
		img: 'akropol_001.jpeg',
		summary: '',
		type: 'html',
		content: `
			<img class="noDesign" src="/images/akropol_001.jpeg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/akropol_002.jpg" alt="image_image" />
			<br />
			<br />
			<video controls>
				<source src="/videos/akropol_001.mp4" type="video/mp4" />
			</video>
		`
	},

	{
		name: 'This is Nigeria ft. Falz',
		slug: 'tin',
		date: '01 Jan 2021',
		category: 'Models, Visualisation and Animation',
		img: 'tin_001.jpg',
		summary: 'Fan art',
		type: 'html',
		content: `
			<div class="unit">
				<img class="noDesign" src="/images/tin_001.jpg" alt="image_image" />
				<br />
				<br />
				<video controls>
					<source src="/videos/tin_001.mp4" type="video/mp4" />
				</video>
			</div>
		`
	},
	{
		name: 'Product Viewer - Hummer H3',
		slug: 'mv_hummer_h3',
		date: '21 May 2021',
		category: 'Models, Visualisation and Animation',
		img: 'mv_hummer_h3.jpg',
		summary: '3D model visualization demo. powered by WebGL',
		type: 'html',
		content: `
		<iframe
		style="width: 100%;
		height: 500px;"
		src="/project/mv_Hummer-H3/index.html"
		frameborder="0"
		title="container"
	></iframe>
<p>
This is a 3D model visualization demo. It aims to illustrate how WebGL offer new ways to showcase and interacting with products on the Web.
<br><br>
 Since it's running in real-time 3D, you are able to inspect the model from every angle, and even interact with various parts.
<br><br>
Modeling, texturing, lightening, rigging and animation was done in Blender. Exporting to WebGL and interaction was done using Verge3D. UI was created using HTML and CSS.
<br><br>
Interested in hiring me to build something awesome? <a href="/contact" >Get in touch</a>.
<br><br>
Here is a link to the <a href="/project/L322">first version of this project</a> that was made using Unity3D
</p>
		`
	}
];

export let _projects = [
	{
		name: 'Connekt',
		slug: 'connekt',
		date: '01 Jan 2021',
		category: 'web',
		img: 'connekt_001.jpg',
		summary:
			'Connekt is a social sharing application that enable users to easily find and connect with other users that are interested in the Products or Services which are being Offered or Requested.',
		type: 'link',
		content: 'http://www.connekt.website'
	},
	{
		name: 'Lily Collection',
		slug: 'lily',
		date: '01 Jan 2021',
		category: 'Logos and Banners',
		img: 'lilyCollection_001.jpg',
		summary: '',
		type: 'html',
		content: `
			<img class="noDesign" src="/images/lilyCollection_001.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/lilyCollection_002.jpg" alt="image_image" />
		`
	},
	{
		name: 'Flipaxis Logo',
		slug: 'flipaxis',
		date: '01 Jan 2021',
		category: 'Logos and Banners',
		img: 'flipaxis_001.jpg',
		summary: '',
		type: 'html',
		content: `
			<img class="noDesign" src="/images/flipaxis_001.jpg" alt="image_image" />
		`
	},
	{
		name: 'Model Viewer - S3V Range Rover L322',
		slug: 'L322',
		date: '01 Jan 2021',
		category: 'Models, Visualisation and Animation',
		img: 'mvS3V.jpg',
		summary: 'hhas ijhashah ajhasha jkajhsaj asjjakjs ',
		type: 'html',
		content: `
			<iframe
			title="iframe"
			src="/project/mvS3V/index.html"
			style=" width: 100%; height: 500px; "
			ref="iFrame"/>
		`
	},
	{
		name: 'Beads',
		slug: 'bead',
		date: '01 Jan 2021',
		category: 'Models, Visualisation and Animation',
		img: 'bead_003.jpeg',
		summary: '',
		type: 'html',
		content: `
			<img class="noDesign" src="/images/bead_001.jpeg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/bead_010.jpeg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/bead_004.jpeg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/bead_005.jpeg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/bead_006.jpeg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/bead_007.jpeg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/bead_008.jpeg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/bead_009.jpeg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/bead_002.jpeg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/bead_003.jpeg" alt="image_image" />
		`
	},
	{
		name: 'Ankara with Marvealous Designer',
		slug: 'ankara',
		date: '01 Jan 2021',
		category: 'Models, Visualisation and Animation',
		img: 'ankara_001.jpg',
		summary: '',
		type: 'html',
		content: `
			<img class="noDesign" src="/images/ankara_001.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/ankara_002.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/ankara_003.jpg" alt="image_image" />
		`
	},
	{
		name: 'Bliss',
		slug: 'bliss',
		date: '01 Jan 2021',
		category: 'Models, Visualisation and Animation',
		img: 'faceoff_003.jpg',
		summary: '',
		type: 'html',
		content: `
			<img class="noDesign" src="/images/faceoff_002.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/faceoff_009.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/faceoff_001.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/faceoff_004.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/faceoff_005.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/faceoff_006.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/faceoff_010.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/faceoff_011.jpg" alt="image_image" />
			<br />
			<br />
			<img class="noDesign" src="/images/faceoff_003.jpg" alt="image_image" />
		`
	},
	{
		name: 'Interrogation Room',
		slug: 'interrogation_room',
		date: '01 Jan 2021',
		category: 'Models, Visualisation and Animation',
		img: 'interrogationRoom_005.jpg',
		summary: '',
		type: 'html',
		content: `
			<div class="unit">
				<img class="noDesign" src="/images/interrogationRoom_014.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_015.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_016.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_010.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_011.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_008.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_012.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_009.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_013.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_001.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_002.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_003.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_004.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_005.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_006.jpg" alt="image_image" />
				<br />
				<br />
				<img class="noDesign" src="/images/interrogationRoom_007.jpg" alt="image_image" />
			</div>
		`
	},
	{
		name: 'National Identity Management Commission',
		slug: 'nimc',
		date: '01 Jan 2021',
		category: 'Models, Visualisation and Animation',
		img: 'nimc_001.jpg',
		summary: '',
		type: 'html',
		content: `
			<video controls>
				<source src="/videos/nimc_001.mp4" type="video/mp4" />
			</video>
		`
	},
	{
		name: 'Danfo 2.0',
		slug: 'danfo',
		date: '01 Jan 2021',
		category: 'Models, Visualisation and Animation',
		img: 'danfo_001.jpg',
		summary: 'How to rig a Vehicle tutorial.',
		type: 'html',
		content: `
			<div>
				<img class="noDesign" src="/images/danfo_001.jpg" alt="image_image" />
				<br />
				<br />
				<video controls>
					<source src="/videos/danfo_001.mp4" type="video/mp4" />
				</video>
				<br />
				<br />
				<a href="/docs/danfo_001.pdf" class="btn" target="blank">
					Manual
				</a>
			</div>
		`
	},
	{
		name: 'Costar Brochure',
		slug: 'costar',
		date: '01 Jan 2021',
		category: 'Others',
		img: 'costar_001.jpg',
		summary: '',
		type: 'doc',
		content: 'costar_001.pdf'
	},
	{
		name: 'Aris Brochure',
		slug: 'aris',
		date: '01 Jan 2021',
		category: 'Others',
		img: 'aris_001.jpg',
		summary: '',
		type: 'doc',
		content: 'aris_001.pdf'
	}
];
