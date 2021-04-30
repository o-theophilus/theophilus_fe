<script>
	import { isMobile, openMobileMenu } from '$lib/store.js';
	import Buttons from './nnavBtns.svelte';
</script>

<nav class="nav" class:openMobileMenu={$openMobileMenu} class:notMobile={!$isMobile}>
	<div class="block">
		<Buttons />
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
	}

	.block {
		width: 100%;
		padding: 20px;
	}
</style>
