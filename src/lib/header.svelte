<script>
	import { slide } from 'svelte/transition';

	import Logo from './logo.svelte';
	import Nav from './nnav.svelte';

	export let showHeader = true;
	export let isMobile = true;
</script>

{#if showHeader}
	<header class="header" in:slide={{ duration: 300 }} out:slide={{ delay: 500, duration: 300 }}>
		<div class="block">
			<a href="/">
				<Logo />
			</a>
			<!-- {#if isMobile == false}
				<Nav {isMobile} />
			{/if} -->
		</div>
	</header>
{/if}

<style type="text/scss">
	@import '../variable';

	.header {
		position: fixed;
		top: 0;
		height: $headerHeight;

		width: 100%;

		background-color: $color2;

		z-index: 1;
	}

	.block {
		// for header nav
		position: relative;
		// ******
		max-width: $mobileWidth;
		height: 100%;

		padding: 10px 40px;
		margin: auto;
	}
</style>
