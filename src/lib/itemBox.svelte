<script>
	export let item;

	export let blog = false;
	let link = blog ? 'blog' : 'projects';
</script>

<a href="/{link}/{item.slug}">
	<div class="img" style="background-image: url('/Images/project/{item.img}')" />
	<div class="details">
		<h3 class="name">
			{item.name}
		</h3>
		{item.summary}
	</div>
</a>
<br />

<style type="text/scss">
	@import '../variable';

	a {
		display: flex;
		flex-direction: column;

		height: 600px;

		text-decoration: none;
		color: $fColor2;
		background-color: $color1;
		box-shadow: 0 0 5px 0.1px;
		border-radius: $bRadius;
		overflow: hidden;
	}

	.img {
		height: 100%;
		background-image: url('/Images/project/{item.img}');
		background-position: center;
		background-size: cover;
	}

	.details {
		padding: 20px;
	}
	.name {
		color: $fColor3;
	}

	@media screen and (max-width: 500px) {
		a {
			height: 300px;
		}
	}
</style>
