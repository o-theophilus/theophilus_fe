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

	export let status;
	export let error;
</script>

<svelte:head>
	<title>{status} - {error.name}</title>
</svelte:head>

<Content>
	<h1>{status}</h1>

	<p>{error.message}</p>
	<br>
	<br>
	Back to <a href="/">Home</a>
</Content>
