<script>
	import Contact from './contact.svelte';
	import Socials from './socials.svelte';
	import Copyright from './copyright.svelte';
	import Nav from './nav.svelte';
</script>

<footer>
	<Contact />
	<Socials />
	<Copyright />
	<Nav />
</footer>

<style>
	footer {
		background-color: var(--color2);
		padding: 50px 0;
	}
</style>
