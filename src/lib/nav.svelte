<script>
	import Link from './navBtn.svelte';
</script>

<nav>
	<Link name={'home'} link={''} />
	<Link name={'project'} />
	<Link name={'blog'} />
	<Link name={'about'} />
	<Link name={'contact'} />
</nav>

<style>
	nav {
		list-style-type: none;
	}
	@media screen and (min-width: 900px) {
		nav {
			display: flex;

			width: 100%;
			height: 100%;
			max-width: var(--mobileWidth);

			margin-left: auto;
		}
	}
</style>
