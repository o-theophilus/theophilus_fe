<script>
	import { page } from '$app/stores';
	import { openMobileMenu, isMobile } from '$lib/store.js';
	import SVG from '$lib/svg.svelte';

	export let name;
	export let link;

	let page_;
	link = link === undefined ? name : link;
	page_ = link === '' ? undefined : link;
	$: segment = $page.path.split('/')[1] || undefined;
</script>

<a
	class="link"
	class:active={segment === page_}
	class:notMobile={!$isMobile}
	href="/{link}"
	on:click={() => {
		$openMobileMenu = false;
	}}
>
	<div class="block">
		{#if $isMobile}
			<SVG type="facebook" />
		{/if}
		<div class="text">
			{name}
		</div>
	</div>
</a>

<style type="text/scss">
	@import '../variable';

	.link {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 100%;
		height: 50px;

		text-decoration: none;
		color: $color1;

		background-color: $colorNill;

		text-transform: capitalize;
		fill: $color1;

		transition: all $animTime1;
	}
	.notMobile {
		height: 100%;
	}

	.active {
		font-weight: bold;
		background-color: $color5;

		border-color: $color3;
		border-width: 10px;
		border-style: none solid;
		// border-style: solid none;
	}

	.active.notMobile {
		border-width: 5px;
		border-style: none;
		border-bottom-style: solid;
	}

	.block {
		display: flex;
		width: 100%;
		padding: 0 20px;
	}
	.text {
		margin: auto;
	}
</style>
