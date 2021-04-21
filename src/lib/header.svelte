<script>
	import { slide } from 'svelte/transition';

	import Logo from './logo.svelte';

	export let showHeader = true;
	export let isMobile = true;
</script>

{#if showHeader}
	<header
		class="header"
		class:notMobile={!isMobile}
		in:slide={{ duration: 300 }}
		out:slide={{ delay: 500, duration: 300 }}
	>
		<div class="header__bg">
			<div class="header__block">
				<a href="/">
					<Logo />
				</a>
			</div>
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
	}

	.notMobile {
		display: none;
	}

	.header__bg {
		background-color: $color2;

		width: 100%;
		height: 100%;
	}
	.header__block {
		max-width: $mobileWidth;
		height: 100%;

		padding: 10px 40px;
		margin: auto;
	}
</style>
