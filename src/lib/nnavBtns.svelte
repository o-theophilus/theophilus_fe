<script>
	import { isMobile } from '$lib/store.js';
	import Link from './nnavLink.svelte';
</script>

<div class="btns" class:notMobile={!$isMobile}>
	<Link name={'home'} link={''} />
	<Link name={'projects'} />
	<Link name={'blog'} />
	<Link name={'about'} />
	<Link name={'contact'} />
</div>

<style type="text/scss">
	@import '../variable';

	.btns {
		list-style-type: none;
	}
	.notMobile {
		display: flex;

		width: 100%;
		height: 100%;
		max-width: $mobileWidth;

		margin-left: auto;
	}
</style>
