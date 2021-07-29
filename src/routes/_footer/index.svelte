<script>
	// import Contact from './contact/index.svelte';
	import Nav from './nav.svelte';

	import Contact from './contact.svelte';
	import Socials from './socials.svelte';
	import Form from './form/index.svelte';
</script>

<footer>
	<div class="title">Get in touch!</div>
	<section>
		<div class="left">
			<Form />
		</div>
		<div class="right">
			<!-- Feel free to contact me with questions or anything else. I will do my best to respond to your query
                as soon as possible. -->
			<Contact />
			<br />
			<br />
			<br />
			<br />
			<Socials />
		</div>
	</section>
	<div class="copyright">&copy theophilus.website 2021. All rights reserved.</div>
	<br>
	<Nav />
</footer>

<style>
	footer {
		background-color: var(--color2);
		padding: 50px;
	}

	.title {
		text-align: center;
		color: var(--color1);
		font-size: 2em;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 100px;

		padding: 50px 0;
	}
	@media screen and (min-width: 900px) {
		section {
			flex-direction: unset;
		}
	}
	.left,
	.right {
		max-width: 500px;
	}

	.copyright {
		text-align: center;
		color: var(--color1);
	}
</style>
