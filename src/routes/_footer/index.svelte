<script>
	import Contact from './contact.svelte';
	import Socials from './socials.svelte';
	import Copyright from './copyright.svelte';
</script>

<footer>
	<Contact />
	<Socials />
	<Copyright />
</footer>

<style type="text/scss">
	@import '../../variable';

	footer {
		background-color: $color2;
	}
</style>
