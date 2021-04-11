<script>
	import NavLink from '$lib/NavLink.svelte';
</script>


<nav class="nav">
	<ul class="nav__block">
		<NavLink name={'home'} link={''} />
		<NavLink name={'about'} />
		<NavLink name={'projects'} />
		<NavLink name={'blog'} />
		<NavLink name={'contact'} />
	</ul>
</nav>

<style>
	.nav {
		background-color: black;
		width: 100%;

		position: fixed;
	}
	.nav__block {
		height: 5rem;
		max-width: 800px;

		margin: auto;

		color: white;

		display: flex;

		/* fix */
		padding: 0;
	}
</style>
