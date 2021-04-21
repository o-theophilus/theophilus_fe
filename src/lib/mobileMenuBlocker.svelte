<script>
	import { fade } from 'svelte/transition';

	export let mobileMenuOpened = false;
</script>

<div
	class="blocker"
	class:blocker--mobileMenuOpened={mobileMenuOpened}
	on:click
	out:fade={{ duration: 300 }}
/>

<style type="text/scss">
	@import '../variable';

	.blocker {
		display: none;

		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		width: 100vw;
		height: 100vh;

		backdrop-filter: blur(2px);
	}
	.blocker--mobileMenuOpened {
		display: unset;
	}
</style>
