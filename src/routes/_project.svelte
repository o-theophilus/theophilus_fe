<script>
	import { projects } from '$lib/db.js';

	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
	import ItemBox from '$lib/itemBox.svelte';

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
</script>

<div class="proj">
	<div class="title">
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
		z-index: 1;

		background-color: var(--color3);
		box-shadow: 0 5px 5px var(--color2);

		transition: top var(--animTime1);
		transition-timing-function: ease-in-out;
	}
	@media screen and (min-width: 900px) {
		.title {
			top: var(--headerHeight);
		}
	}

	h1 {
		color: var(--fColor1);
	}
</style>
