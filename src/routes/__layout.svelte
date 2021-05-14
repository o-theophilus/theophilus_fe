<script>
	import { onMount } from 'svelte';

	import '../app.scss';
	import '../variable.scss';
	import { showHeader, isMobile, openMobileMenu } from '$lib/store.js';
	import Nav from '$lib/nnav.svelte';
	import MobileMenuButton from '$lib/mmb.svelte';
	import Blocker from '$lib/blocker.svelte';
	import Header from '$lib/header.svelte';
	import Footer from './_footer/index.svelte';

	const run = () => {
		$showHeader = document.documentElement.scrollTop < 500;
		$isMobile = document.documentElement.clientWidth < 900;
		// top = window.pageYOffset;
	};

	$: $openMobileMenu = $isMobile == false ? false : $openMobileMenu;

	onMount(() => {
		window.addEventListener('scroll', run);
		window.addEventListener('resize', run);
		run();
	});
</script>

<main class="page" class:openMobileMenu={$openMobileMenu}>
	<Header />
	<!-- <div class="block"> -->
	<slot />
	<Footer />
	<!-- </div> -->
</main>
<Blocker />
<Nav />

<MobileMenuButton />

<style>
	.page {
		position: relative;
		left: 0;

		margin-top: var(--headerHeight);

		transition: left var(--animTime1);
	}
	.openMobileMenu {
		left: var(--mobileMenuWidth);
	}
</style>
