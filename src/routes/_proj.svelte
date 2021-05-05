<script>
	import Content from '$lib/pageContent.svelte';
	import ProjectBox from '$lib/itemBox.svelte';

	export let projects = [];

	let _projects = [];
	let num = Math.floor(Math.random() * projects.length);
	_projects.push(projects[5], projects[3], projects[num]);
</script>

<div class="proj">
	<Content>
		{#each _projects as project, i}
			<ProjectBox {project} />
		{:else}
			<p>nothing</p>
		{/each}
	</Content>
</div>

<style type="text/scss">
	@import '../variable';

	.proj {
		background-color: $color3;
	}
</style>
