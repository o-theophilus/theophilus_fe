<script>
	import Breaker from '$lib/breaker.svelte';

	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import ProjectBox from '$lib/projectBox.svelte';

	const getProjects = async () => {
		const resp = await fetch('/projects.json');
		let projects = await resp.json();
		projects = projects.projects;

		if (resp.ok) {
			return projects;
		} else {
			throw new Error(text);
		}
	};
</script>

<Breaker title="Projects">
	<Image img="/project/akropol_001.jpeg" />

	<Content>
		{#await getProjects()}
			<p>...waiting</p>
		{:then projects}
			{#each projects as project}
				<ProjectBox {project} />
			{:else}
				<p>nothing</p>
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</Content>
</Breaker>

<style type="text/scss">
	
	
</style>
