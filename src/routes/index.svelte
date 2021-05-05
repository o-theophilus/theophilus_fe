<script context="module">
	export const prerender = true;

	export async function load({ fetch }) {
		const resp = await fetch('/projects.json');
		let data = await resp.json();

		return {
			props: {
				projects: data.api
			}
		};
	}
</script>

<script>
	import Home from './_home.svelte';
	import Projects from './_proj.svelte';

	export let projects;
</script>

<Home />
<Projects {projects} />

<svelte:head>
	<title>Home</title>
</svelte:head>
