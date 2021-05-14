<script>
	import { openMobileMenu } from '$lib/store.js';
	import Buttons from './nnavBtns.svelte';
</script>

<nav class="nav" class:openMobileMenu={$openMobileMenu}>
	<div class="block">
		<Buttons />
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: calc(-1 * var(--mobileMenuWidth));
		z-index: 3;

		display: flex;
		align-items: center;

		width: var(--mobileMenuWidth);
		height: 100vh;

		background-color: var(--color2);
		overflow: hidden;

		transition: left var(--animTime1);
	}
	.openMobileMenu {
		left: 0;
	}

	.block {
		width: 100%;
	}
</style>
