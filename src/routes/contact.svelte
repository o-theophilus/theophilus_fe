<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
</script>

<svelte:head>
	<title>Contact - Theophilus</title>
</svelte:head>

<Image src="/site/theophilus.jpg" />

<Content>
	<h1>Contact</h1>
</Content>
<hr />

<Content>
	<p>
		Feel free to contact me with questions or anything else. I will do my best to respond to your
		query as soon as possible.
	</p>
	<form
		class="form"
		method="post"
		autoComplete="off"
		action="https://formspree.io/theophilus.ogbolu@gmail.com"
	>
		<div class="inputGroup required">
			<label for="name">Full Name</label>
			<input placeholder="Your Name" type="text" name="name" required />
		</div>
		<div class="inputGroup required">
			<label for="email">Email Address</label>
			<input placeholder="Your Email Address" type="email" name="email" required />
		</div>
		<div class="inputGroup required">
			<label for="message">Message</label>
			<textarea placeholder="Your Message" name="message" required />
		</div>
		<div class="inputGroup submit">
			<input type="submit" value="Send Message" />
		</div>
	</form>
</Content>

<style type="text/scss">
	@import '../variable';

	.inputGroup {
		margin-top: 20px;
	}
	label {
		display: inline-block;
		margin-bottom: 10px;
	}
	input,
	textarea {
		width: 100%;
		height: 50px;

		border-radius: $bRadius;
		border-radius: 25px;
		border: 2px solid $colorNill;

		padding: 10px;

		font-size: 1.2rem;

		resize: none;

		background-color: $color6;

		transition: all $animTime1;

		&:focus {
			outline: none;
			background-color: $color1;
			border-color: $color3;
		}
	}
	textarea {
		height: 150px;
	}

	[type='submit'] {
		background-color: $color2;
		color: $color1;
		&:hover {
			outline: none;
			background-color: $color3;
			border-color: $colorNill;
		}
	}
</style>
