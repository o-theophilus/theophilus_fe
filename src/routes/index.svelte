<script context="module">
	export const prerender = true;

	export async function load({ fetch }) {
		const resp = await fetch('/projects.json');
		let data = await resp.json();

		return {
			props: {
				projects: data.projects
			}
		};
	}
</script>

<script>
	import Home from './home.svelte';
	import About from './about.svelte';
	import Projects from './proj.svelte';

	export let projects;
</script>

<Home />
<Projects {projects} />
<About />

<svelte:head>
	<title>Home</title>
</svelte:head>
