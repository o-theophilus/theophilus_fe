<script context="module">
	export const prerender = true;
</script>

<script>
	import { posts } from '$lib/db.js';

	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
	import ItemBox from '$lib/itemBox.svelte';
	import Meta from '$lib/meta.svelte';
</script>

<Meta title="Blog - Theophilus" description="Blog Posts." image="/images/akropol_001.jpg" />

<Image src="/site/akropol_001.jpg" />
<Title>
	<h1>Blog Posts</h1>
</Title>

<Content>
	{#each posts as item}
		<ItemBox {item} blog />
	{:else}
		<p>No Blog post found</p>
	{/each}
</Content>
