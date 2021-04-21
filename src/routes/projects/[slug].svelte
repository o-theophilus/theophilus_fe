<script context="module">
	export async function load({ page, fetch }) {
		const resp = await fetch('/projects.json');
		let projects = await resp.json();

		projects = projects.projects;
		let { slug } = page.params;
		let project;

		for (let index = 0; index < projects.length; index++) {
			if (projects[index].slug === slug) {
				project = projects[index];
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
	<p>{project.category}</p>
	<p>{project.name}</p>
	<p>{project.summary}</p>
	{@html project.html}
</Content>
