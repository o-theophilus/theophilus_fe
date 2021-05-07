<script>
	import Content from '$lib/pageContent.svelte';

	export let title
</script>

<svelte:head>
	<title>{title} - Theophilus</title>
</svelte:head>

<Content>
	<h1>{title}</h1>
</Content>
<hr />