<script context="module">
	// export const prerender = true;

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
	import Projects from './_projects.svelte';
	import Image from '$lib/pageImage.svelte';

	export let projects;
</script>

<svelte:head>
	<title>Theophilus</title>
</svelte:head>

<Image img="/project/akropol_001.jpeg" />

<Home />
<Projects {projects} />
