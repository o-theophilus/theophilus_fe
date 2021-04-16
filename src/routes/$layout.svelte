<script>
	import '../app.scss';
	import Nav from '$lib/nnav.svelte';
	import MobileMenuButton from '$lib/mobileMenuButton.svelte';
	import MobileMenuBlocker from '$lib/mobileMenuBlocker.svelte';
	import Footer from '$lib/footer.svelte';

	let mobileMenuOpened = false;

	const toggleMobileMenu = () => {
		mobileMenuOpened = !mobileMenuOpened;
	};
</script>

<main class="content" class:content--mobileMenuOpened={mobileMenuOpened}>
	{#if mobileMenuOpened}
		<MobileMenuBlocker on:click={toggleMobileMenu} />
	{/if}
	<MobileMenuButton {mobileMenuOpened} on:click={toggleMobileMenu} />
	<Nav {mobileMenuOpened} on:click={toggleMobileMenu} />

	<slot />
	<Footer />
</main>

<style type="text/scss">
	@import '../variable';
	.content {
		position: relative;
		left: 0;

		transition: left $animTime1;
	}
	.content--mobileMenuOpened {
		left: $mobileMenuWidth;
	}
</style>
