<script>
	import '../app.scss';
	import Nav from '$lib/nav.svelte';
	import Footer from '$lib/footer.svelte';
</script>


<main class="content">
	<Nav />
	<div class="content__block" >
		<slot />
	</div>
	<Footer />
</main>

<style type="text/scss">
	$dNavHeight: 5rem;
	$width: 800px;

	.content {
		background-color: rgb(200, 200, 200);
	}
	.content__block{
		max-width: $width;
		margin: auto;
		margin-top: $dNavHeight;
	
		background-color: white;

	}
</style>
