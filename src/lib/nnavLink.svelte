<script>
	import { page } from '$app/stores';
	import { openMobileMenu } from '$lib/store.js';

	export let name;
	export let link;

	let page_;
	link = link === undefined ? name : link;
	page_ = link === '' ? undefined : link;
	$: segment = $page.path.split('/')[1] || undefined;
</script>

<a
	class="link"
	class:link--active={segment === page_}
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
		height: $menuItemHeight;

		text-decoration: none;
		color: $color1;

		transition: all $animTime1;
	}

	.link--active {
		border-width: 5px;
		border-color: $color3;
		border-bottom-style: solid;

		font-weight: bold;
	}

	.link__item {
		text-transform: capitalize;
	}
</style>
