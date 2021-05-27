<script>
	import { showHeader, isMobile } from '$lib/store.js';
	import SVG from '$lib/svg.svelte';
	// import { slide } from 'svelte/transition';

	import Btns from '../../lib/navBtn.svelte';

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
<style>
	.header {
		position: fixed;
		top: calc(-1 * var(--headerHeight));
		height: var(--headerHeight);

		width: 100%;

		background-color: var(--color2);

		/* z-index: 1; */

		box-shadow: 0 0 0 var(--colorNill);
		
		transition: top var(--animTime1);
		transition-timing-function: ease-in-out;
	}
	.showHeader {
		top: 0;
		box-shadow: 0 0 12px var(--color2);
	}

	.block {
		display: flex;
		align-items: center;

		max-width: var(--mobileWidth2);
		height: 100%;

		padding: 0 var(--pad);
		margin: auto;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 10px;

		font-size: 20px;
		text-decoration: none;
		color: var(--fColor1);
		fill: var(--color3);

		font-family: var(--font2);
	}
</style>
