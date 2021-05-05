<script context="module">
	// export const prerender = true;

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
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import ProjectBox from '$lib/itemBox.svelte';

	export let projects;
</script>

<svelte:head>
	<title>projects</title>
</svelte:head>

<Image img="/project/akropol_001.jpeg" />

<Content>
	{#each projects as project}
		<ProjectBox {project} />
	{:else}
		<p>nothing</p>
	{/each}
</Content>

<style type="text/scss">


</style>
