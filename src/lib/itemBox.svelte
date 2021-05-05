<script>
	export let item;

	export let blog = false;
	let link = blog ? 'blog' : 'projects';
</script>

<a href="/{link}/{item.slug}">
	<!-- <div class="img"> -->

	<img src="/Images/project/{item.img}" alt={item.name} />
	<!-- </div> -->
	<div class="details">
		<h1 class="name">
			{item.name}
		</h1>
		<!-- <br /> -->
		{item.summary}
	</div>
</a>

<style type="text/scss">
	@import '../variable';

	a {
		display: flex;
		flex-direction: column;

		height: 600px;
		margin: 30px 0;

		text-decoration: none;
		color: $fColor2;
		background-color: $color1;
		box-shadow: 0 0 5px 0.1px;
		border-radius: $bRadius;
		overflow: hidden;
	}

	// .img {
	// 	height: 100%;
	// 	background-color: red;

	// 	object-fit: cover;
	// }
	img {
		width: 100%;
		height: 500px;

		object-fit: cover;
	}
	.details {
		padding: 20px;
	}
	.name {
		color: $fColor3;
	}
</style>
