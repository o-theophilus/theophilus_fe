<script>
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	let showHeader = true;
	onMount(() => {
		window.addEventListener('scroll', (event) => {
			showHeader = document.documentElement.scrollTop < 500;
		});
	});
</script>

{#if showHeader}
	<header class="header" in:slide={{ duration: 300 }} out:slide={{ delay: 500, duration: 300 }}>
		<div class="header__block">
			<p class="header__block__title">Theophilus</p>
		</div>
	</header>
{/if}

<style type="text/scss">
	@import '../variable';

	.header {
		position: fixed;
		top: 0;
		background-color: $color2;

		width: 100%;
		height: $headerHeight;
	}

	.header__block {
		display: flex;
		align-items: center;

		max-width: $mobileWidth;
		height: 100%;

		margin: auto;

		font-size: 1.5em;
	}

	.header__block__title {
		color: $color1;
		display: inline-block;
	}
</style>
