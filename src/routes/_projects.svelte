<script>
	import Content from '$lib/pageContent.svelte';
	import ItemBox from '$lib/itemBox.svelte';

	export let projects = [];

	let selected = [5, 4];
	let len = 5 - selected.length;

	for (let n = 0; n < len; n++) {
		let num = Math.floor(Math.random() * projects.length);
		while (selected.includes(num)) {
			num = Math.floor(Math.random() * projects.length);
		}
		selected.push(num);
	}

	let _projects = [];

	for (let n = 0; n < selected.length; n++) {
		_projects.push(projects[n]);
	}
</script>

<div class="proj">
	<div class="title">
		<Content>
			<h1>Projects</h1>
		</Content>
	</div>

	<Content>
		{#each _projects as item}
			<ItemBox {item} />
		{:else}
			<p>No Project found</p>
		{/each}
	</Content>
</div>

<style type="text/scss">
	@import '../variable';

	.proj {
		background-color: $color3;
		position: relative;
	}

	.title {
		position: sticky;
		top: 0;
	}

	h1 {
		color: $fColor1;
		// color: white;
		// mix-blend-mode: difference;
	}
</style>
