<script>
	import { openMobileMenu } from '$lib/store.js';
	import Buttons from './nnavBtns.svelte';
</script>

<nav class="nav" class:openMobileMenu={$openMobileMenu}>
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
		overflow: hidden;

		transition: left $animTime1;
		&.openMobileMenu {
			left: 0;
		}
	}

	.block {
		width: 100%;
	}
</style>
