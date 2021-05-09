<script context="module">
	export async function load({ page, fetch }) {
		const resp = await fetch('/blog.json');
		let data = await resp.json();

		data = data.api;
		let { slug } = page.params;

		for (let index = 0; index < data.length; index++) {
			if (data[index].slug === slug) {
				data = data[index];
				break;
			}
		}
		return {
			props: {
				data
			}
		};
	}
</script>

<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';

	export let data;
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<Image src="/images/{data.img}" />
<div class="html_content">
	<Content>
		<h1>
			<p>{data.name}</p>
		</h1>
		<p>{data.category}</p>
		<p class="date">{data.date}</p>
	</Content>
	<hr />
	<Content>
		{@html data.html}
	</Content>
</div>

<style type="text/scss">
	@import '../../variable';

	:global(.html_content) {
		:global(img) {
			width: 100%;
			border-radius: $bRadius;
		}
		:global(video) {
			width: 100%;
		}
	}
</style>
