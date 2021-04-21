<script context="module">
	// export const prerender = true;

	export async function load({ fetch }) {
		const resp = await fetch('/projects.json');
		let projects = await resp.json();

		return {
			props: {
				projects
			}
		};
	}
</script>

<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import ProjectBox from '$lib/projectBox.svelte';

	export let projects;
	projects = projects.projects;
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
	$bradius: 20px;
	.project {
		border-radius: $bradius;
		box-shadow: 0 0 20px 1px;
	}
</style>
