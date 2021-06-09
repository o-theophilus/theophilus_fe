<script context="module">
	export const prerender = true;
</script>

<script>
	import { projects } from '$lib/db.js';

	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
	import ItemBox from '$lib/itemBox.svelte';
	import Meta from '$lib/meta.svelte';
</script>

<Meta title="Projects - Theophilus" description="Stuff I Made." image="/images/akropol_001.jpg" />

<Image src="/site/akropol_001.jpg" />
<Title>
	<h1>Projects</h1>
	<p>Stuff I Made</p>
</Title>

<Content>
	{#each projects as item}
		<ItemBox {item} />
	{:else}
		<p>No Project found</p>
	{/each}
</Content>
