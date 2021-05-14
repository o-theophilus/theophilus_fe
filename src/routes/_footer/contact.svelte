<script>
	import SVG from '$lib/svg.svelte';
</script>

<div class="contact">
	<div class="block">
		<a href="tel:+2348067397793">
			<SVG type="call" />
			<p>+234 806 739 7793</p>
		</a>
		<br />
		<a href="mailto:theophilus.ogbolu@gmail.com">
			<SVG type="email" />
			<p>theophilus.ogbolu@gmail.com</p>
		</a>
		<br />
		<a
			href="https://www.google.com/maps/place/Igando+Bus+Stop/@6.5513295,3.2380606,17z/data=!3m1!4b1!4m5!3m4!1s0x103b8540d0692809:0x4a45a882b29213a8!8m2!3d6.5513242!4d3.2402439"
			target="blank"
		>
			<SVG type="location" />
			<p>Lagos, Nigeria.</p>
		</a>
	</div>
</div>

<style>
	.block {
		display: flex;
		flex-direction: column;
		align-items: center;

		max-width: var(--mobileWidth);

		margin: auto;
		padding: var(--pad);

		color: var(--color1);
	}
	a {
		display: flex;
		gap: 20px;
		align-items: center;

		color: var(--fColor1);
		text-decoration: none;
		fill: var(--color1);

		transition: all var(--animTime1);
	}
	a:hover {
		fill: var(--color3);
	}
</style>
