<script>
	import '../app.scss';
	import Nav from '$lib/Nav.svelte';
</script>


<main class="content">
	<Nav />
	<div class="content__block" >
		<slot />
	</div>
</main>

<style>
	.content {
		background-color: gray;
	}
	.content__block{
		max-width: 800px;
		margin: auto;
	
		background-color: white;

	}
</style>
