<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>
<Image img="/site/Theophilus.jpg" />

<Content>
	Feel free to contact me with questions or anything else. I will do my best to respond to your
	query as soon as possible.
	<br />
	<br />
	<form method="post" autoComplete="off" action="https://formspree.io/theophilus.ogbolu@gmail.com">
		<div class="inputGroup required">
			<label for="name">Full Name</label>
			<br />
			<input placeholder="Your Name" type="text" id="name" name="name" required />
		</div>
		<div class="inputGroup required">
			<label for="email">Email Address</label>
			<br />
			<input placeholder="Your Email Address" type="email" id="email" name="email" required />
		</div>
		<div class="inputGroup required">
			<label for="message">Message</label>
			<br />
			<textarea placeholder="Your Message" id="message" name="message" required />
		</div>
		<div class="inputGroup submit">
			<input type="submit" class="btn" value="Send Message" />
		</div>
	</form>
</Content>
