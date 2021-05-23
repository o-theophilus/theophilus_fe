<script context="module">
	import { projects } from '$lib/db.js';

	export async function load({ page }) {
		let { slug } = page.params;
		let project;
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].slug === slug) {
				project = projects[i];
				break;
			}
		}
		if (project) {
			return { props: { project } };
		}
	}
</script>

<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
	import Marked from '$lib/marked.svelte';

	export let project;
</script>

<svelte:head>
	<title>{project.name}</title>
</svelte:head>

<Image src="/images/{project.img}" />

<Title>
	<h1>
		<p>{project.name}</p>
	</h1>
	<p>{project.category}</p>
	<p class="date">{project.date}</p>
</Title>

<Content>
	{#if project.type === 'md'}
		<Marked md={project.content} />
	{:else}
		{@html project.content}
	{/if}
</Content>
