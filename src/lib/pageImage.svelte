<script>
	export let src;
</script>

<img {src} alt={src} />

<style>
	img {
		width: 100%;
		height: 500px;

		object-fit: cover;
	}
</style>
