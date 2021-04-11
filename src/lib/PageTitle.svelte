<script>
	export let title = 'Page Title';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>
	{title}
</h1>

<style>
	h1 {
		margin: 0;
	}
</style>
