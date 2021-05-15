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

	export let status;
	export let error;
</script>

<svelte:head>
	<title>{status} - {error.name}</title>
</svelte:head>

<Title>
	<h1>{status}</h1>
</Title>

<Content>

	<p>{error.message}</p>
	<br />
	<br />
	<video loop autoplay muted >
		<source src="/site/404.mp4" type="video/mp4" />
	</video>
	<br />
	<br />
	Back to <a href="/">Home</a>
</Content>
