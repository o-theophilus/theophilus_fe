<script>
	import { fade } from 'svelte/transition';

	export let mobileMenuOpened = false;
</script>

{#if mobileMenuOpened}
	<div class="blocker" on:click out:fade={{ duration: 300 }} />
{/if}

<style type="text/scss">
	@import '../variable';
	.blocker {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		width: 100vw;
		height: 100vh;

		backdrop-filter: blur(2px);
	}
</style>
