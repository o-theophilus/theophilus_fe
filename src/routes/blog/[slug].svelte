<script context="module">
	export async function load({ page, fetch }) {
		const resp = await fetch('/blog.json');
		let data = await resp.json();

		data = data.api;
		let { slug } = page.params;

		let item;
		for (let index = 0; index < data.length; index++) {
			if (data[index].slug === slug) {
				item = data[index];
				break;
			}
		}
		if (item) {
			return {
				props: {
					data: item
				}
			};
		}
	}
</script>

<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
	import Marked from '$lib/marked.svelte';

	export let data;
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<Image src="/images/{data.img}" />

<Title>
	<h1>
		<p>{data.name}</p>
	</h1>
	<p>{data.category}</p>
	<p class="date">{data.date}</p>
</Title>

<Content>
	{#if data.type === 'md'}
		<Marked md={data.content} />
	{:else}
		{@html data.content}
	{/if}
</Content>
