<script context="module">
	import { posts, _posts } from '$lib/db.js';
	let temp = [...posts, ..._posts];

	export async function load({ page }) {
		let { slug } = page.params;
		let post;
		for (let i = 0; i < temp.length; i++) {
			if (temp[i].slug === slug) {
				post = temp[i];
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
	import Meta from '$lib/meta.svelte';

	export let post;
</script>

<Meta title={post.title} description={post.summary} image={post.image} />

<Title>
	<Image src="/images/{post.image}" />
	<h2>
		<p>{post.title}</p>
	</h2>
	<p>{post.tags}</p>
	<p class="date">{post.date}</p>
</Title>

<Content noMargin>
	{#if post.type === 'md'}
		<Marked md={post.content} />
	{:else}
		{@html post.content}
	{/if}
</Content>
