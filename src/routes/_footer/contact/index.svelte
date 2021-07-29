<script>
	import Contact from './contact.svelte';
	import Socials from './socials.svelte';
	import Form from './form.svelte';
</script>

<div class="title">Get in touch!</div>
<section>
	<div class="left">
		<br />
		<br />
		Feel free to contact me with questions or anything else. I will do my best to respond to your query
		as soon as possible.
		<Contact />
		<Socials />
	</div>
	<div class="right">
		<Form />
	</div>
</section>

<style>
    .title{
        text-align: center;
        color: var(--color1);
        font-size: 2em;
    }
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
</style>
