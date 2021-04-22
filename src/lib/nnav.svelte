<script>
	import Link from './nnavLink.svelte';

	export let mobileMenuOpened = false;
	export let isMobile = true;
</script>

<nav class="nav" class:mobileMenuOpened class:notMobile={!isMobile}>
	<div class="block">
		<ul class="btns">
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
		position: fixed;
		top: 0;
		left: -$mobileMenuWidth;
		z-index: 3;

		display: flex;
		align-items: center;

		width: $mobileMenuWidth;
		height: 100vh;

		background-color: $color2;

		transition: left $animTime1;

		&.mobileMenuOpened {
			left: 0;
		}

		&.notMobile {
			position: absolute;
			top: 0;
			left: 0;

			height: $headerHeight;

			width: calc(100% - 80px);
			margin: auto;
			// margin-left: 100px;

			.block {
				width: 100%;
				height: 100%;
				padding: 0;
			}
			.btns {
				display: flex;
				height: 100%;
			}
		}
	}

	.block {
		width: 100%;
		padding: 20px;
	}
	.btns {
		list-style-type: none;
	}

	@media screen and (max-width: $mobileWidth) {
		// .nav {
		// 	height: 100vh;
		// 	background-color: lightblue;
		// }
	}
</style>
