<script>
	import SVG from '$lib/svg.svelte';

	import { onMount } from 'svelte';

	let svg;
	onMount(() => {
		svg = document.getElementsByTagName('svg');
		for (let index = 0; index < svg.length; index++) {
			let element = svg[index];
			let bbox = element.getBBox();
			let viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(' ');
			element.setAttribute('viewBox', viewBox);
		}
	});
</script>

<div class="socials">
	<div class="block">
		<!-- <a href="assets/file/theophilus_cv.pdf" class="cv btn" download>
				<li>Download CV</li>
			</a> -->

		<a href="https://wa.me/2348067397793/?text=Hello%20Theophilus">
			<SVG type="whatsapp" />
		</a>
		<a href="https://m.facebook.com/Pheezie" target="_blank" rel="noopener noreferrer">
			<SVG type="facebook" />
		</a>
		<a href="https://twitter.com/Pheezie" target="_blank" rel="noopener noreferrer">
			<SVG type="twitter" />
		</a>
		<a
			href="https://www.linkedin.com/in/theophilus-ogbolu-977385136/"
			target="_blank"
			rel="noopener noreferrer"
		>
			<SVG type="linkedin" />
		</a>
		<a href="https://github.com/pheezie" target="_blank" rel="noopener noreferrer">
			<SVG type="github" />
		</a>
	</div>
</div>

<style type="text/scss">
	@import '../../variable';

	.block {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		max-width: $mobileWidth;

		padding: 40px 20px;
		margin: auto;
	}

	a {
		display: flex;
		justify-content: center;
		align-items: center;

		flex-shrink: 0;
		width: 50px;
		height: 50px;

		border-radius: 50%;

		background-color: $colorNill;

		transition: all $animTime1;
		box-shadow: 0 0 0 rgba(0, 0, 0, 0);
		fill: white;
	}

	a:hover {
		box-shadow: 0 0 1em $color3;
		background-color: $color1;
		fill: $color3;
	}
</style>
