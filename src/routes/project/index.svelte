<script context="module">
	// export const prerender = true;

	export async function load({ fetch }) {
		const resp = await fetch('/project.json');
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
	import ItemBox from '$lib/itemBox.svelte';

	export let items;
</script>

<svelte:head>
	<title>Projects - Theophilus</title>
</svelte:head>

<Image src="/images/akropol_001.jpeg" />
<Content>
	<h1>Projects</h1>
</Content>
<hr />
<Content>
	{#each items as item}
		<ItemBox {item} />
	{:else}
		<p>No Project found</p>
	{/each}
</Content>
