<script context="module">
	// export const prerender = true;

	export async function load({ page, fetch }) {
		const res = await fetch(`/blog/${page.params.slug}.json`);
		return {
			props: {
				post: await res.json()
			}
		};
	}
</script>

<script>
	import Content from '$lib/pageContent.svelte';

	export let post;
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<Content>
	<h1>{post.title}</h1>
	<div class="post">
		{@html post.body}
	</div>
</Content>
