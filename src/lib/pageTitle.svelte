<script>
	import Content from '$lib/pageContent.svelte';
</script>

<div class="pageTitle">
	<Content>
		<slot />
	</Content>
	<!-- <hr /> -->
</div>


<style>
	.pageTitle{
		border-bottom: 5px solid var(--color3);
	}
</style>