<script>
	import { showHeader, isMobile } from '$lib/store.js';
	import { slide } from 'svelte/transition';

	import Logo from './logo.svelte';
	import Btns from './nnavBtns.svelte';

	$: $showHeader = $isMobile == false ? true : $showHeader;
</script>

<!-- {#if $showHeader} -->
<!-- <header class="header" in:slide={{ duration: 300 }} out:slide={{ delay: 500, duration: 300 }}> -->
<header class="header" class:showHeader={$showHeader}>
	<div class="block">
		<a href="/">
			<Logo />
		</a>

		{#if $isMobile == false}
			<Btns />
		{/if}
	</div>
</header>

<!-- {/if} -->
<style type="text/scss">
	@import '../variable';

	.header {
		position: fixed;
		top: -$headerHeight;
		height: $headerHeight;

		width: 100%;

		background-color: $color2;

		z-index: 1;

		transition: top $animTime1;
		&.showHeader {
			top: 0;
		}
	}

	.block {
		display: flex;
		align-items: center;

		max-width: $mobileWidth2;
		height: 100%;

		padding: 0 $pad;
		margin: auto;
	}
	// @media screen and (min-width: $mobileWidth) {
	// @media screen and (min-width: $mobileWidth) {
	// .block {
	// max-width: 1200px;
	// }
	// }
</style>
