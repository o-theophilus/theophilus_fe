<script context="module">
	// export const prerender = true;

	export async function load({ fetch }) {
		const resp = await fetch('/blog.json');
		let data = await resp.json();

		return {
			props: {
				posts: data.posts
			}
		};
	}
</script>

<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';

	export let posts;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<Image img="/project/akropol_001.jpeg" />

<Content>
	{#each posts as post}
		<a href="/blog/{post.slug}">
			<h1>{post.name}</h1>
		</a>
	{:else}
		<p>nothing</p>
	{/each}
</Content>

<style type="text/scss">
</style>
