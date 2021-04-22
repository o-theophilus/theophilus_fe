<script>
	import Link from './nnavLink.svelte';

	export let mobileMenuOpened = false;
	export let isMobile = true;

	export let top;
	$: temp = isMobile ? top - 70 : top;
</script>

<nav class="nav" class:mobileMenuOpened class:notMobile={!isMobile} style="top: {temp}px;">
	<div class="nav__block">
		<ul class="nav__block__btns">
			<Link name={'home'} link={''} on:click />
			<Link name={'projects'} on:click />
			<Link name={'about'} on:click />
			<!-- <Link name={'blog'} on:click /> -->
			<!-- <Link name={'contact'} on:click /> -->
		</ul>
	</div>
</nav>

<style type="text/scss">
	@import '../variable';

	.nav {
		// position: fixed;
		// top: 0;
		position: absolute;
		// top: -$headerHeight;

		left: -$mobileMenuWidth;

		display: flex;
		align-items: center;

		width: $mobileMenuWidth;
		height: 100vh;

		background-color: $color2;

		transition: left $animTime1;
	}
	// .mobileMenuOpened,
	.notMobile {
		left: 0;
	}
	.nav__block {
		width: 100%;
		padding: 20px;
	}
	.nav__block__btns {
		list-style-type: none;
	}

	@media screen and (max-width: $mobileWidth) {
		// .nav {
		// 	height: 100vh;
		// 	background-color: lightblue;
		// }
	}
</style>
