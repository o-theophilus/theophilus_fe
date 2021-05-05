<script context="module">
	export async function load({ page, fetch }) {
		const resp = await fetch('/blog.json');
		let data = await resp.json();

		data = data.api;
		let { slug } = page.params;
		let post;

		for (let index = 0; index < data.length; index++) {
			if (data[index].slug === slug) {
				post = data[index];
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

<Image img="/project/{post.img}" />
<Content>
	<h1>
		<p>{post.name}</p>
	</h1>
	<p>{post.category}</p>
</Content>
<hr />
<Content>
	{@html post.html}
</Content>

<style type="text/scss">
	@import '../../variable';

	:global(img) {
		width: 100%;
	}
</style>