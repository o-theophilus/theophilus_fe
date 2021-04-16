<script>
	import Link from './nnavLink.svelte';
</script>

<nav class="nav">
	<ul class="nav__block">
		<!-- <a href="#home">home</a> -->
		<!-- <a href="#about">about</a> -->
		<!-- <a href="#contact">contact</a> -->
		<Link name={'home'} link={''} />
		<Link name={'about'} />
		<Link name={'projects'} />
		<Link name={'blog'} />
		<Link name={'contact'} />
	</ul>
</nav>

<style type="text/scss">
	@import '../variable';

	.nav {
		background-color: $color2;
		width: 100%;

		position: fixed;
		top: 0;
	}
	.nav__block {
		display: flex;

		height: $dNavHeight;
		max-width: $mobileWidth;

		color: $color1;

		margin: auto;

		/* fix */
		padding: 0;
	}

	@media screen and (max-width: $mobileWidth) {
		.nav {
			height: 100vh;
			background-color: lightblue;
		}
	}
</style>
