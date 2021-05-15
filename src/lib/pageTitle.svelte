<script>
	import Content from '$lib/pageContent.svelte';
</script>

<div class="pageTitle">
	<Content>
		<slot />
	</Content>
	<hr />
</div>

<style>
	:global(.pageTitle *, hr) {
		margin: 0;
		padding: 0;
	}
</style>
