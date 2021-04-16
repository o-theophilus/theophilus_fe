<script>
	import Link from './nnavLink.svelte';
</script>

<nav class="nav">
	<div class="nav__block">
	<ul class="nav__block__btns">
		<!-- <a href="#home">home</a> -->
		<!-- <a href="#about">about</a> -->
		<!-- <a href="#contact">contact</a> -->
		<Link name={'home'} link={''} />
		<Link name={'about'} />
		<Link name={'projects'} />
		<Link name={'blog'} />
		<Link name={'contact'} />
	</ul>
</div>
</nav>

<style type="text/scss">
	@import '../variable';

	.nav {
		background-color: $color2;
		width: $mobileMenuWidth;
		height: 100vh;

		position: fixed;
		top: 0;

		display: flex;
		align-items: center;
	}
	.nav__block {
		width: 100%;
		padding: 20px;
	}
	.nav__block__btns{
		list-style-type: none;
	}

	@media screen and (max-width: $mobileWidth) {
		// .nav {
		// 	height: 100vh;
		// 	background-color: lightblue;
		// }
	}
</style>
