<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				status,
				error
			}
		};
	}
</script>

<script>
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
	import Meta from '$lib/meta.svelte';

	export let status;
	export let error;
</script>

<Meta
	title="{error.name} - Theophilus"
	description={error.message}
	image="/site/akropol_001.jpg"
/>
<Title>
	<h1>{status} {error.name}</h1>
</Title>

<Content>
	<p>{error.message}</p>
	<br />
	<br />
	<video loop autoplay muted>
		<source src="/site/404.mp4" type="video/mp4" />
	</video>
	<br />
	<br />
	Back to <a href="/">Home</a>
</Content>
