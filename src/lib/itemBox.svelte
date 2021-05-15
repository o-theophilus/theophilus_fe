<script>
	export let item;

	export let blog = false;

	let href;
	let target;

	if (item.type === 'link') {
		href = item.content;
		target = 'blank';
	} else if (item.type === 'doc') {
		href = `/docs/${item.content}`;
		target = 'blank';
	} else {
		href = `/${blog ? 'blog' : 'project'}/${item.slug}`;
	}
</script>

<a {href} {target}>
	<div class="img" style="background-image: url('/images/{item.img}')" />
	<div class="details">
		<h3 class="name">
			{item.name}
		</h3>
		<p class="date">
			{item.date}
		</p>
		{#if item.summary}
			<p class="summary">
				{item.summary}
			</p>
		{/if}
	</div>
</a>
<br />

<style>
	* {
		margin: 0;
		padding: 0;
	}
	a {
		display: flex;
		flex-direction: column;

		height: 600px;

		text-decoration: none;
		color: var(--fColor2);
		background-color: var(--color1);
		box-shadow: 0 0 5px 0.1px;
		border-radius: var(--bRadius);
		overflow: hidden;
	}

	.img {
		height: 100%;
		background-image: url('/Images/{item.img}');
		background-position: center;
		background-size: cover;
	}

	.details {
		padding: 20px;
	}
	.name {
		color: var(--fColor3);
	}

	.summary {
		margin-top: 10px;
	}

	@media screen and (max-width: 500px) {
		a {
			height: 300px;
			line-height: 20px;
		}
	}
</style>
