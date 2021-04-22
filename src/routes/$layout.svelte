<script>
	import { onMount } from 'svelte';

	import '../app.scss';
	import Nav from '$lib/nnav.svelte';
	import MobileMenuButton from '$lib/mobileMenuButton.svelte';
	import MobileMenuBlocker from '$lib/mobileMenuBlocker.svelte';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';

	let showHeader = true;
	let mobileMenuOpened = false;
	let isMobile = true;

	const run = () => {
		showHeader = document.documentElement.scrollTop < 500;
		isMobile = document.documentElement.clientWidth < 900;
		// top = window.pageYOffset;

		if (isMobile == false) {
			mobileMenuOpened = false;
			showHeader = true;
		}
	};

	const toggleMobileMenu = () => {
		mobileMenuOpened = !mobileMenuOpened;
	};

	onMount(() => {
		window.addEventListener('scroll', run);
		window.addEventListener('resize', run);
		run();
	});
</script>

<main class="content" class:mobileMenuOpened>
	<Header {showHeader} {isMobile} />
	<div class="content__block">
		<slot />
		<Footer />
	</div>
	<MobileMenuBlocker {mobileMenuOpened} {isMobile} on:click={toggleMobileMenu} />
	<Nav {mobileMenuOpened} on:click={toggleMobileMenu} />
</main>

<MobileMenuButton {mobileMenuOpened} {isMobile} on:click={toggleMobileMenu} />

<style type="text/scss">
	@import '../variable';

	.content {
		position: relative;
		left: 0;

		margin-top: $headerHeight;

		transition: left $animTime1;

		&.mobileMenuOpened {
			left: $mobileMenuWidth;
		}
	}
</style>
