<script>
	export const prerender = true;

	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
	import Skill from './_skill.svelte';

	let skills = [
		// { name: 'C#', value: 82 },
		{ name: 'HTML', value: 95 },
		{ name: 'CSS', value: 90 },
		{ name: 'JavaScript', value: 65 },
		// { name: 'React', value: 50 },
		{ name: 'Svelte / SvelteKit', value: 87 },
		{ name: 'Python', value: 90 },
		{ name: 'Flask', value: 85 }
		// { name: 'Arduino', value: 92 }
	];

	let tools = [
		{ name: 'Microsoft Word', value: 84 },
		{ name: 'Power Point', value: 73 },
		{ name: 'CorelDRAW', value: 94 },
		{ name: 'Photoshop', value: 79 },
		{ name: 'Preniere Pro', value: 53 },
		// { name: 'Maya', value: 88 },
		// { name: '3D Max', value: 73 },
		{ name: 'Blender 3D', value: 80 },
		{ name: 'Verge3D', value: 80 },
		{ name: 'SketchUp', value: 85 },
		{ name: 'Godot', value: 30 }
	];
</script>

<svelte:head>
	<title>About - Theophilus</title>
</svelte:head>

<Image src="/site/theophilus.jpg" />
<Title>
	<h1>About Me</h1>
</Title>
<Content>
	<div class="content about">
		<p>
			My name is <strong>Theophilus Ogbolu</strong>, and this is the "About Me" stuff...
			<br />
			<br />
			I am a self-taught student of programming and software development, and I spend way too much time
			and money pursuing this interest. My friends and family are concerned for my well-being.
			<br />
			<br />
			I spend most of my free time working on building my skillset, contributing to Open Source projects,
			and trying to learn as much as I can. There have been many good people who have assited me in learning
			this craft, and I try to pay that forward by helping others who may be newer than I.
			<br />
			<br />
			I have benefited in massive ways from the work of those who took the time to share their know-how
			on the internet. From various bloggers to programming forums, to the now ubiquitous Stack Overflow,
			I have, in Borg-like fashion, assimilated the experience and college education of some of the biggest
			(and not so big) names in the technology arena. Shamelessly!
			<br />
			<br />
			When I’m not writing code or designing, I tend to be playing music (my other passion), exploring
			my surroundings, and doing my best to experience life beyond the code editor.
			<br />
			<br />
		</p>
		<h3>Programming Skills / Stack</h3>
		{#each skills as ent}
			<div class="skill">
				<div class="name">
					{ent.name}
				</div>
				<div>
					<Skill num={ent.value} />
				</div>
			</div>
		{/each}
		<br />

		<h3>Software Skills</h3>
		{#each tools as ent}
			<div class="skill">
				<div class="name">
					{ent.name}
				</div>
				<div>
					<Skill num={ent.value} />
				</div>
			</div>
		{/each}
		<br />
		<br />
		<br />
		
		<h1>This Website</h1>
		<br />
		<p>
			The website was made with SvelteKit and deployed on Vercel. It's entirely static through the
			SvelteKit's SSG feature.
			<br />
			Posts are written in Markdown, in-page codes are formatted using Highlight.js and then converted
			to nice-looking HTML at build-time.
			<br />
			<br />
			This website was originally built with C# and Razor then ported to React and now to SvelteKit because
			of it's simplicity and ease of use.
			<br />
			<br />
			This website is an all-in-one blog, portfolio and pet project to try out new shiny things.
		</p>
	</div>
</Content>

<style>
	.skill {
		display: flex;
		gap: 20px;
		align-items: center;
	}
	.name {
		width: 150px;
	}
</style>
