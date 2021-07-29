<script>
	import { browser } from '$app/env';
	// fix nav header blink

	import Link from './navBtn.svelte';
</script>

{#if browser}
	<nav>
		<Link name={'home'} link={''} />
		<Link name={'project'} />
		<Link name={'blog'} />
		<Link name={'about'} />
		<!-- <Link name={'contact'} /> -->
	</nav>
{/if}

<style>
	nav {
		list-style-type: none;
	}
	@media screen and (min-width: 900px) {
		nav {
			display: flex;

			width: 100%;
			max-width: 600px;
			height: 100%;

			margin-left: auto;
		}
	}
</style>
