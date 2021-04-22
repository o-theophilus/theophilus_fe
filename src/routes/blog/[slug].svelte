<script context="module">
	export async function load({ page, fetch }) {
		const resp = await fetch('/blog.json');
		let posts = await resp.json();

		posts = posts.posts;
		let { slug } = page.params;
		let post;

		for (let index = 0; index < posts.length; index++) {
			if (posts[index].slug === slug) {
				post = posts[index];
				break;
			}
		}
		return {
			props: {
				post
			}
		};
	}
</script>

<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';

	export let post;
</script>

<svelte:head>
	<title>{post.name}</title>
</svelte:head>

<Image img="/post/{post.img}" />
<Content>
	<p>{post.category}</p>
	<p>{post.name}</p>
	<p>{post.summary}</p>
	{@html post.html}
</Content>
