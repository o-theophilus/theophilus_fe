<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';

	let skills = [
		{ name: 'C#', value: 82 },
		{ name: 'Python', value: 90 },
		{ name: 'HTML', value: 95 },
		{ name: 'CSS', value: 90 },
		{ name: 'JavaScript', value: 65 },
		{ name: 'React', value: 50 },
		{ name: 'Arduino', value: 92 }
	];

	let tools = [
		{ name: 'Microsoft Word', value: 84 },
		{ name: 'Power Point', value: 73 },
		{ name: 'CorelDRAW', value: 47 },
		{ name: 'Photoshop', value: 79 },
		{ name: 'Preniere Pro', value: 83 },
		{ name: 'Maya', value: 88 },
		{ name: '3D Max', value: 73 },
		{ name: 'Blender', value: 80 },
		{ name: 'SketchUp', value: 85 },
		{ name: 'Godot', value: 30 }
	];
</script>

<p id="about" />

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
		{#each skills as ent}
			{ent.name} - {ent.value}
			<br />
		{/each}
	</div>
</Content>

<style type="text/scss">
	img {
		//  margin:auto
		width: 100%;
	}
</style>
