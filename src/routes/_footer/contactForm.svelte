<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
</script>

<p id="contact" />

<form
	class="form"
	method="post"
	autoComplete="off"
	action="https://formspree.io/theophilus.ogbolu@gmail.com"
>
	<div class="form__block">
		<p>
			Feel free to contact me with questions or anything else. I will do my best to respond to your
			query as soon as possible.
		</p>
		<br />
		<div class="form__block__inputGroup required">
			<label for="name">Full Name</label>
			<input placeholder="Your Name" type="text" id="name" name="name" required />
		</div>
		<div class="form__block__inputGroup required">
			<label for="email">Email Address</label>
			<input placeholder="Your Email Address" type="email" id="email" name="email" required />
		</div>
		<div class="form__block__inputGroup required">
			<label for="message">Message</label>
			<textarea placeholder="Your Message" id="message" name="message" required />
		</div>
		<div class="form__block__inputGroup submit">
			<input type="submit" class="btn" value="Send Message" />
		</div>
	</div>
</form>

<style type="text/scss">
	@import '../../variable';

	.form {
		background-color: $color2;
	}

	.form__block {
		max-width: $mobileWidth;
		margin: auto;

		padding: $pad;

		color: $color1;
	}
	.form__block__inputGroup {
		margin-top: 20px;
	}
	label {
		display: inline-block;
		margin-bottom: 10px;
	}
	input,
	textarea {
		box-sizing: border-box;

		width: 100%;
		height: 50px;

		resize: none;

		border-radius: $bRadius;
		border: none;

		padding: 10px;

		font-size: 1.2rem;
	}
	textarea {
		height: 150px;
	}
</style>
