<script>
	import Breaker from '$lib/breaker.svelte';

	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import ProjectBox from '$lib/projectBox.svelte';

	export let projects = [];
	// projects = projects.projects;
</script>

<Breaker title="Projects">
	<Image img="/project/akropol_001.jpeg" />

	<Content>
		{#each projects as project, i}
			<ProjectBox {project} />
		{:else}
			<p>nothing</p>
		{/each}
	</Content>
</Breaker>

<style type="text/scss">
</style>
