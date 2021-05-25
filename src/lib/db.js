export let posts = [
	{
		name: 'How I met Svelte',
		slug: 'how-i-met-svelte',
		date: '18 May 2021',
		tags: 'Programming',
		img: 'how-i-met-svelte-01.jpg',
		summary: 'The new reactive component based approach to web design without a virtual DOM',
		type: 'md',
		content: `
Web designing can be a tedious, repeative and uninteresting process, especially for the fact that it is ever-evolving. A technology you decide to learn today might become obsolete tomorow with a better tool replacing it.

I have been in search for better approach to web development as existing methods are not intuitive, complex and have a steep learning curve. I found many temples engine – Wix, Webflow DreamWeaver, Blue Griffon, WordPress - and libraries - Angular, React, jQuery, C# with Razor. Most of which will get the job done. But you will always run into issues when trying to fix a small bug or modify / add a custom feature. The source code is usually filled unnecessary and unused codes which will definately be a nightmare to go through.

I came across this blog: [*Best Frontend Frameworks of 2021 for Web Development*](https://www.simform.com/best-frontend-frameworks/#section9). The blog listed the top 9 frontend frameworks according to various features; and that was the first time I ever came across Svelte. Guess what? Svelte was not among the top 5 frameworks on the list. Infact it was last. But the outlined features caught my attention. Especially for that fact that it the newest on the list at the time and lightweight.

I did a little research and found the maker of Svelte was an average looking man, Rich Harris, who was a graphics editor for New York Time.

Really! A graphic designer. Well, I could relate because at the moment I also work as a graphic designer, but I know deep down I should be programming big time.

I was still sceptical but after watching this great talk by Rich Harris about [rethinking how we build frontend Javascript frameworks](https://www.youtube.com/watch?v=AdNJ3fydeao), I was sold. If you have half an hour to kill and haven't seen it, please check it out. I promise it is better than any content you will find on my blog.

Svelte is a new reactive component-based approach to web design. Svelte works differently by putting the work into a compile step instead of putting them in the browser, unlike frameworks like React and Vue. It does many other things easily and improves most of the bottlenecks of using other frameworks.

Visiting the official website of [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/), It is clearly seen that they are well documented and have good examples.

At this point my palms are sweaty, knees weak, arms are heavy, I was ready to ~get my hands wet~ dive in head first and hope for the best.

I lunched VS Code - the one IDE to rule them all, opened the node terminal and with 3 lines of code in less than 1 min I was able to get my first Svelte web app up and running. My mind was blown, this must be sorcery. Never seen anything like it.


![If you are reading this it was made with Svelte](/images/how-i-met-svelte-02.jpg)

And the rest is history.

I would recommend Svelte if you are:

1. new in web development, lucky you. You will not have to through the pain of unlearning React😊
2. a veteran in web development, you'll realize how easy life can be
`
	},
	{
		name: 'Creating your first Svelte App with just 3 lines of code',
		slug: 'creating-your-first-svelte-app',
		date: '24 May 2021',
		tags: 'Programming',
		img: 'creating-your-first-svelte-app-01.jpg',
		summary: 'This post is intended to demonstrate how easy it is for anyone to create a web app in Svelte',
		type: 'md',
		content: `
\`\`\`node
npm init svelte@next
npm i
npm run dev
\`\`\`

Thats it! Thats all you need to know to get your app started.

All you need now is:
1. An intepreter to process the command.
1. A terminal to type in the commands.

<br>

### The Intepreter
The commands starting with 'npm' are Node command. **Node** is very powerful tool that will help us install, run and build our web app.
1. Download Lateset version here: https://nodejs.org/en/download/
![VSCode](/images/creating-your-first-svelte-app-03.jpg)

1. Install Node
> This should be a seamless process

<br>

### The Terminal
The terminal we will be using to type our code is **Visual Studio Code**. VS Code is not just a terminal, it is a very powerful IDE that can easily be extended.
1. Download Lateset version here: https://code.visualstudio.com/
![VSCode](/images/creating-your-first-svelte-app-02.jpg)

1. Install VS Code
> This should be a seamless process
1. Install "Svelte for VS Code" Extension (Optional)
> Although not required to get your app started, This Extension will later come in handy when we start coding our web app.
> It adds great features to VS Code like: code highliing, code completion, code formatting, error linting and many more.

<br>

## Lets get started
1. Create a new folder for your project
1. Open VS Code
1. In VS Code, open the folder you created 
![VSCode](/images/creating-your-first-svelte-app-04.jpg)
1. Open the terminal window 
![VSCode](/images/creating-your-first-svelte-app-05.jpg)

1. Type in the first command, and press Enter
\`\`\`node
npm init svelte@next
\`\`\`
You will be prompted with some questions. Answers acccording to the image below.
![VSCode](/images/creating-your-first-svelte-app-07.jpg)
This will scaffold a new project in the folder you created.<br>
![VSCode](/images/creating-your-first-svelte-app-06.jpg)

1. Type in the second command, and press Enter
\`\`\`node
npm i
\`\`\`
This is the short form of 'npm install'. This will install your app dependencies.

1. Type in the third command, and press Enter
\`\`\`node
npm run dev
\`\`\`
This will start a developement server on 'localhost:3000'.

1. Open your browser and type 'localhost:3000' in the address bar
![VSCode](/images/creating-your-first-svelte-app-08.jpg)

<br>

### Viola!!!
You did it!

You have just created your first working Svelte app. This is the begining of greater things to come.

What you have created is a skelental project which is the most basic form of a Svelte app.
This app can be expanded however you like in building extremely high-performance web apps. 

<br>

You can learn more and get more details at [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/).
`
	}
];

export let _posts = [
	{
		name: 'Arduino Smart Car',
		slug: 'arduino',
		date: '01 Jan 2021',
		tags: 'Electronic',
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
		slug: 'test-md-blog',
		date: '15 May 2021',
		tags: 'Programming',
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
		tags: 'Model, Visualisation, Animation',
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
		tags: 'Model, Visualisation, Animation',
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
		slug: 'this-is-nigeria',
		date: '01 Jan 2021',
		tags: 'Model, Visualisation, Animation',
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
		slug: 'mv-hummer-h3',
		date: '21 May 2021',
		tags: 'Model, Visualisation, Animation',
		img: 'mv_hummer_h3.jpg',
		summary: '3D model visualization demo. powered by WebGL',
		type: 'md',
		content: `
<iframe
style="width: 100%;
height: 500px;"
src="/project/mv_Hummer-H3/index.html"
frameborder="0"
title="container"
></iframe>

This is an interractive 3D visualization demo. It aims to illustrate how WebGL offer new ways to showcase and interacting with products on the Web.

Since it's running in real-time 3D, you are able to inspect the model from every angle, and even interact with various parts.

Modeling, texturing, lightening, rigging and animation was done in Blender. Exporting to WebGL and interaction was done using Verge3D. UI was created using HTML and CSS.

Here is a link to the <a href="/project/l322">first version of this project</a> that was made using Unity3D

<br>

Interested in hiring me to build something awesome? <a href="/contact" >Get in touch</a>.
		`
	}
];

export let _projects = [
	{
		name: 'Connekt',
		slug: 'connekt',
		date: '01 Jan 2021',
		tags: 'Web',
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
		tags: 'Logo, Banner',
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
		tags: 'Logo, Banner',
		img: 'flipaxis_001.jpg',
		summary: '',
		type: 'html',
		content: `
			<img class="noDesign" src="/images/flipaxis_001.jpg" alt="image_image" />
		`
	},
	{
		name: 'Model Viewer - S3V Range Rover L322',
		slug: 'l322',
		date: '01 Jan 2021',
		tags: 'Model, Visualisation and Animation',
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
		tags: 'Model, Visualisation, Animation',
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
		tags: 'Model, Visualisation, Animation',
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
		tags: 'Model, Visualisation, Animation',
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
		slug: 'interrogation-room',
		date: '01 Jan 2021',
		tags: 'Model, Visualisation, Animation',
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
		tags: 'Model, Visualisation, Animation',
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
		tags: 'Model, Visualisation, Animation',
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
		tags: 'Brochure',
		img: 'costar_001.jpg',
		summary: '',
		type: 'doc',
		content: 'costar_001.pdf'
	},
	{
		name: 'Aris Brochure',
		slug: 'aris',
		date: '01 Jan 2021',
		tags: 'Brochure',
		img: 'aris_001.jpg',
		summary: '',
		type: 'doc',
		content: 'aris_001.pdf'
	}
];
