<script>
	import { isMobile } from '$lib/store.js';
	import Link from './nnavLink.svelte';
</script>

<div class="btns" class:notMobile={!$isMobile}>
	<Link name={'home'} link={''} />
	<Link name={'project'} />
	<Link name={'blog'} />
	<Link name={'about'} />
	<Link name={'contact'} />
</div>

<style>
	.btns {
		list-style-type: none;
	}
	.notMobile {
		display: flex;

		width: 100%;
		height: 100%;
		max-width: var(--mobileWidth);

		margin-left: auto;
	}
</style>
