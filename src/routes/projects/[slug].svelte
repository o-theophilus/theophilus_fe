<script context="module">
	export async function load({ page, fetch }) {
		const resp = await fetch('/projects.json');
		let data = await resp.json();

		data = data.api;
		let { slug } = page.params;

		let project;
		for (let index = 0; index < data.length; index++) {
			if (data[index].slug === slug) {
				project = data[index];
				break;
			}
		}
		return {
			props: {
				project
			}
		};
	}
</script>

<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';

	export let project;
</script>

<svelte:head>
	<title>{project.name}</title>
</svelte:head>

<Image img="/project/{project.img}" />
<Content>
	<h1>
		<p>{project.name}</p>
	</h1>
	<p>{project.category}</p>
</Content>
<hr />
<Content>
	{@html project.html}
</Content>

<style type="text/scss">
	@import '../../variable';

	:global(img) {
		width: 100%;
	}
	:global(video) {
		width: 100%;
	}
</style>
