<script>
	import { page } from '$app/stores';
	import { openMobileMenu, isMobile } from '$lib/store.js';

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
	<li class="link__item">
		{name}
	</li>
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

		transition: all $animTime1;
	}
	.notMobile {
		height: 100%;
	}

	.active {
		border-width: 5px;
		border-color: $color3;
		border-bottom-style: solid;

		font-weight: bold;
	}

	.link__item {
		text-transform: capitalize;
	}
</style>
