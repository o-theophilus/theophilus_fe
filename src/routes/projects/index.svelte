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
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import ProjectBox from '$lib/itemBox.svelte';

	export let projects;
</script>

<svelte:head>
	<title>Projects - Theophilus</title>
</svelte:head>

<Image img="/project/akropol_001.jpeg" />
<Content>
	<h1>Projects</h1>
</Content>
<hr />
<Content>
	{#each projects as item}
		<ProjectBox {item} />
	{:else}
		<p>No Project found</p>
	{/each}
</Content>

<style type="text/scss">
</style>
