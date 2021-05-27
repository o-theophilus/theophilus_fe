<script>
	import { isMobile } from '$lib/store.js';

	import Humburger from './humburger.svelte';
</script>

<div class="topBar" class:notMobile={!$isMobile}>
	<div class="block">
		<Humburger />
	</div>
</div>

<style>
	.topBar {
		position: fixed;
		top: 0;
		height: var(--headerHeight);

		width: 100%;
		pointer-events: none;

		/* z-index: 3; */
	}
	.topBar.notMobile {
		display: none;
	}

	.block {
		position: relative;
		max-width: var(--mobileWidth2);
		height: 100%;

		margin: auto;
	}
</style>
