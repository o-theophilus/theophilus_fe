<script context="module">
	// export const prerender = true;

	export async function load({ fetch }) {
		const resp = await fetch('/blog.json');
		let data = await resp.json();

		return {
			props: {
				posts: data.api
			}
		};
	}
</script>

<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import ProjectBox from '$lib/itemBox.svelte';

	export let posts;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<Image img="/project/akropol_001.jpeg" />

<Content>
	{#each posts as item}
		<ProjectBox {item} blog/>
	{:else}
		<p>No Blog post found</p>
	{/each}
</Content>

<style type="text/scss">
</style>
