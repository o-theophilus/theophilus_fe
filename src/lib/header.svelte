<script>
	import { showHeader, isMobile } from '$lib/store.js';
	import SVG from '$lib/svg.svelte';
	// import { slide } from 'svelte/transition';

	import Btns from './nnavBtns.svelte';

	$: $showHeader = $isMobile == false ? true : $showHeader;
</script>

<!-- {#if $showHeader} -->
<!-- <header class="header" in:slide={{ duration: 300 }} out:slide={{ delay: 500, duration: 300 }}> -->
<header class="header" class:showHeader={$showHeader}>
	<div class="block">
		<a href="/" class="logo">
			<SVG type="logo" size="50" />
			Theophilus
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

	.logo {
		display: flex;
		align-items: center;
		gap: 10px;

		font-size: 20px;
		text-decoration: none;
		color: $fColor1;
		fill: $color3;

		font-family: font2, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	}
</style>
