<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';

	let abilities = {
		skills: {
			'C#': 82,
			Python: 90,
			HTML: 95,
			CSS: 90,
			JavaScript: 65,
			React: 50,
			Arduino: 92
		},
		tools: {
			Microsoft_Word: 84,
			Power_Point: 73,
			CorelDRAW: 47,
			Photoshop: 79,
			Preniere_Pro: 83,
			Maya: 88,
			'3D Max': 73,
			Blender: 80,
			SketchUp: 85,
			Godot: 30
		}
	};
</script>

<svelte:head>
	<title>About</title>
</svelte:head>
<Image img="/site/Theophilus.jpg" />

<Content>
	<h6 class="desc">this is the about page</h6>
	<div class="content about">
		<p>
			My name is <strong>Theophilus Ogbolu</strong>, and this is the "About Me" stuff...
			<br />
			<br />
			I am a self-taught student of programming and software development, and I spend way too much time
			and money pursuing this interest. My friends and family are concerned for my well-being.
			<br />
			<br />
			In August of 2013 I accepted a position as a professional developer with a startup in Lagos, Nigeria.
			So I get paid to do what I would have been doing anyway, for free.
			<br />
			<br />
			I spend most of my free time working on building my skillset, contributing to Open Source projects,
			and trying to learn as much as I can. There have been many good people who have assited me in learning
			this craft, and I try to pay that forward by helping others who may be newer than I.
			<br />
			<br />
			I have benefited in massive ways from the work of those who took the time to share their know-how
			on the internet. From various bloggers to programming forums, to the now ubiquitous Stack Overow,
			I have, in Borg-like fashion, assimilated the experience and college education of some of the biggest
			(and not so big) names in the technology arena. Shamelessly!
			<br />
			<br />
			When I’m not writing code or designing, I tend to be playing music (my other passion), exploring
			my surroundings, and doing my best to experience life beyond the code editor.
			<br />
			<br />
		</p>
	</div>
</Content>
