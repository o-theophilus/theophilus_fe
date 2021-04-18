<script>
	import '../app.scss';
	import Nav from '$lib/nnav.svelte';
	import MobileMenuButton from '$lib/mobileMenuButton.svelte';
	import MobileMenuBlocker from '$lib/mobileMenuBlocker.svelte';
	import Footer from '$lib/footer.svelte';
	import Header from '$lib/header.svelte';

	let mobileMenuOpened = false;
	const toggleMobileMenu = () => {
		mobileMenuOpened = !mobileMenuOpened;
	};
</script>

<main class="content" class:content--mobileMenuOpened={mobileMenuOpened}>
	
	<slot />
	<Header />
	<Footer />
</main>

<MobileMenuBlocker {mobileMenuOpened} on:click={toggleMobileMenu} />
<MobileMenuButton {mobileMenuOpened} on:click={toggleMobileMenu} />
<Nav {mobileMenuOpened} on:click={toggleMobileMenu} />

<style type="text/scss">
	@import '../variable';

	.content {
		position: relative;
		left: 0;

		margin-top: $headerHeight;

		transition: left $animTime1;
	}
	.content--mobileMenuOpened {
		left: $mobileMenuWidth;
	}
</style>
