<script>
	import '../app.scss';
	import Nav from '$lib/nnav.svelte';
	import Footer from '$lib/footer.svelte';
</script>

<main class="content">
	<Nav />
	<div class="content__block">
		<slot />
	</div>
	<Footer />
</main>

<style type="text/scss">
	$dNavHeight: 5rem;

	.content__block {
		margin-top: $dNavHeight;
	}
</style>
