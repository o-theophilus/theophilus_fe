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
			<img class="header__block__img" src="/images/site/logo.png" alt="">
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


		// border-bottom: solid;
		// border-color: $color1;
		// border-width: 1px;
	}

	.header__block {
		display: flex;
		align-items: center;

		max-width: $mobileWidth;
		height: 100%;

		margin: auto;

		font-size: 2rem;
	}

	.header__block__img {
		height: calc(#{$headerHeight} - 20px);
		margin: 10px;
	}
</style>
