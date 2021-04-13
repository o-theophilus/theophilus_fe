<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';

	let projects = [
		{
			category: 'web',
			name: 'Connekt',
			desc:
				'Connekt is a social sharing application that enable users to easily find and connect with other users that are interested in the Products or Services which are being Offered or Requested.',
			img: 'connekt_001.png',
			link: 'http://www.connekt.website'
		},
		{
			category: 'Logos and Banners',
			name: 'Lily Collection',
			desc: '',
			img: 'lilyCollection_001.png'
		},
		{
			category: 'Logos and Banners',
			name: 'Flipaxis Logo',
			desc: '',
			img: 'flipaxis_001.png'
		},
		{
			category: 'Models, Visualisation and Animation',
			name: 'Model Viewer - S3V Range Rover L322',
			desc: '',
			img: 'mvS3V/01.png'
		},
		{
			category: 'Models, Visualisation and Animation',
			name: 'Beads',
			desc: '',
			img: 'bead_003.jpeg'
		},
		{
			category: 'Models, Visualisation and Animation',
			name: 'Charms Interior Design',
			desc: '',
			img: 'charms_01_01.png'
		},

		{
			category: 'Models, Visualisation and Animation',
			name: 'Ankara with Marvealous Designer',
			desc: '',
			img: 'ankara_001.png'
		},
		{
			category: 'Models, Visualisation and Animation',
			name: 'Bliss',
			desc: '',
			img: 'faceoff_003.png'
		},
		{
			category: 'Models, Visualisation and Animation',
			name: 'Interrogation Room',
			desc: '',
			img: 'interrogationRoom_005.png'
		},
		{
			category: 'Models, Visualisation and Animation',
			name: 'National Identity Management Commission',
			desc: '',
			img: 'nimc_001.png'
		},
		{
			category: 'Models, Visualisation and Animation',
			name: 'Akropol',
			desc: '',
			img: 'akropol_001.jpeg'
		},
		{
			category: 'Models, Visualisation and Animation',
			img: 'This is Nigeria ft. Falz',
			desc: 'Fan art',
			img: 'tin_001.png'
		},
		{
			category: 'Models, Visualisation and Animation',
			name: 'Danfo 2.0',
			desc: 'How to rig a Vehicle tutorial.',
			img: 'danfo_001.png'
		},
		{
			category: 'Electronics',
			name: 'Arduino Smart Car',
			desc: '',
			img: 'arduino_001.png'
		},
		{
			category: 'Others',
			name: 'Costar Brochure',
			desc: '',
			img: 'costar_001.png',
			link: 'costar_001.pdf'
		},
		{
			category: 'Others',
			name: 'Aris Brochure',
			desc: '',
			img: 'aris_001.png',
			link: 'aris_001.pdf'
		}
	];
</script>

<svelte:head>
	<title>projects</title>
</svelte:head>

<Image img="/project/akropol_001.jpeg" />

<Content>
	{#each projects as n}
		<div class="project">
			<img class="project__img" src="/Images/project/{n.img}" alt={n.name} />
			<div class="project__details">
				{n.name}
				<br />
				{n.desc}
			</div>
		</div>
		<br />
		<br />
	{/each}
</Content>

<style type="text/scss">
$bradius: 20px;
	.project {
		// background-color: red;
		
		border-radius: $bradius;
		box-shadow: 0 0 20px 1px;
	}
	.project__img {
		border-radius: $bradius $bradius 0 0;
		width: 100%;
	}
	.project__details {
		padding: 30px;
	}
</style>
