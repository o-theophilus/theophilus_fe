<script>
	import { isMobile, openMobileMenu } from '$lib/store.js';
	import Link from './nnavLink.svelte';
</script>

<nav class="nav" class:openMobileMenu={$openMobileMenu} class:notMobile={!isMobile}>
	<div class="block">
		<ul class="btns">
			<Link name={'home'} link={''} />
			<Link name={'projects'} />
			<Link name={'about'} />
			<Link name={'blog'} />
			<!-- <Link name={'contact'}  /> -->
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

		&.openMobileMenu {
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
