<script context="module">
	// export const prerender = true;

	export async function load({ fetch }) {
		const resp = await fetch('/blog.json');
		let data = await resp.json();

		return {
			props: {
				items: data.api
			}
		};
	}
</script>

<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
	import ItemBox from '$lib/itemBox.svelte';

	export let items;
</script>

<svelte:head>
	<title>Blog - Theophilsu</title>
</svelte:head>

<Image src="/images/akropol_001.jpeg" />
<Title>
	<h1>Blog Posts</h1>
</Title>

<Content>
	{#each items as item}
		<ItemBox {item} blog />
	{:else}
		<p>No Blog post found</p>
	{/each}
</Content>
