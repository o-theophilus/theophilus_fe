<script>
	import { onMount } from 'svelte';

	import '../app_var.css';
	import '../app.css';
	import { showHeader, isMobile, openMobileMenu } from '$lib/store.js';

	import Nav from './_components/nav.svelte';
	import Header2 from './_components/headerBar2.svelte';
	import Blocker from './_components/blocker.svelte';
	import Header from './_components/headerBar.svelte';
	import Footer from './_footer/index.svelte';

	const run = () => {
		$showHeader = document.documentElement.scrollTop < 500;
		$isMobile = document.documentElement.clientWidth < 900;
	};

	$: $openMobileMenu = $isMobile == false ? false : $openMobileMenu;

	onMount(() => {
		window.addEventListener('scroll', run);
		window.addEventListener('resize', run);
		run();
	});
</script>

<main class="page" class:openMobileMenu={$openMobileMenu}>
	<slot />
	<Footer />
	<Header />
</main>

<Blocker />
<Nav />
<Header2 />

<style>
	.page {
		position: relative;
		left: 0;

		margin-top: var(--headerHeight);

		transition: left var(--animTime1);
		transition-timing-function: ease-in-out;
	}
	.openMobileMenu {
		left: var(--mobileMenuWidth);
	}
</style>
