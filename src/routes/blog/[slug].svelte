<script context="module">
	import { posts } from '$lib/db.js';

	export async function load({ page }) {
		let { slug } = page.params;
		let post;
		for (let i = 0; i < posts.length; i++) {
			if (posts[i].slug === slug) {
				post = posts[i];
				break;
			}
		}
		if (post) {
			return { props: { post } };
		}
	}
</script>

<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
	import Marked from '$lib/marked.svelte';

	export let post;
</script>

<svelte:head>
	<title>{post.name}</title>
</svelte:head>

<Image src="/images/{post.img}" />

<Title>
	<h2>
		<p>{post.name}</p>
	</h2>
	<p>{post.tags}</p>
	<p class="date">{post.date}</p>
</Title>

<Content noMargin >
	{#if post.type === 'md'}
		<Marked md={post.content} />
	{:else}
		{@html post.content}
	{/if}
</Content>
