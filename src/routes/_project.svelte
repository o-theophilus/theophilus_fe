<script>
	import { onMount } from 'svelte';
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
	import ItemBox from '$lib/itemBox.svelte';

	export let projects = [];
	let items = projects;

	// let selected = [0, 3];
	// let len = 5 - selected.length;

	// for (let n = 0; n < len; n++) {
	// 	let num = Math.floor(Math.random() * projects.length);
	// 	while (selected.includes(num)) {
	// 		num = Math.floor(Math.random() * projects.length);
	// 	}
	// 	selected.push(num);
	// }

	// let items = [];

	// for (let n = 0; n < selected.length; n++) {
	// 	items.push(projects[selected[n]]);
	// }

	let title;

	onMount(() => {
		console.log(title.offsetTop);
	});
</script>

<div class="proj">
	<div class="title" bind:this={title}>
		<Title>
			<h1>Projects</h1>
		</Title>
	</div>

	<Content>
		{#each items as item}
			<ItemBox {item} />
		{:else}
			<p>No Project found</p>
		{/each}
	</Content>
</div>

<style>
	.proj {
		background-color: var(--color3);
		position: relative;
	}

	.title {
		position: sticky;
		top: 0;
	}

	h1 {
		color: var(--fColor1);
		/* color: white; */
		/* mix-blend-mode: difference; */
	}
</style>
