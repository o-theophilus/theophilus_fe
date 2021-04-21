<script>

	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	import Logo from './logo.svelte';

	let showHeader = true;
	onMount(() => {
		window.addEventListener('scroll', (event) => {
			showHeader = document.documentElement.scrollTop < 500;
		});
	});
</script>

<header class="header">
	{#if showHeader}
		<div
			class="header__bg"
			in:slide={{ duration: 300 }}
			out:slide={{ delay: 500, duration: 300 }}
		/>
	{/if}
	<div class="header__block">
		<a href="/">
			<Logo />
		</a>
	</div>
</header>

<style type="text/scss">
	@import '../variable';

	.header {
		position: fixed;
		top: 0;
		height: $headerHeight;

		width: 100%;
	}

	.header__bg {
		position: absolute;
		z-index: -1;
		top: 0;
		background-color: $color2;

		width: 100%;
		height: 100%;
	}
	.header__block {
		max-width: $mobileWidth;
		height: 100%;

		padding: 10px;
		margin: auto;
	}
</style>
