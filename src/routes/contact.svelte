<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';

	let form = {
		name: '',
		email: '',
		message: ''
	};

	const submit = async (event) => {
		const resp = await fetch('https://formspree.io/f/xknkjbpb', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		});

		const data = resp.json();

		if (resp.ok) {
			console.log('Thanks for your submission!');
			// form.reset();
		} else {
			console.log('Oops! There was a problem submitting your form');
			return {
				status: resp.status,
				error: data.message
			};
		}
	};
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
	<form on:submit|preventDefault={submit}>
		<div class="inputGroup required">
			<label for="name">Full Name</label>
			<input placeholder="Your Name" type="text" name="name" bind:value={form.name} />
		</div>
		<div class="inputGroup required">
			<label for="email">Email Address</label>
			<input placeholder="Your Email Address" type="email" name="email" bind:value={form.email} />
		</div>
		<div class="inputGroup required">
			<label for="message">Message</label>
			<textarea placeholder="Your Message" name="message" bind:value={form.message} />
		</div>
		<div class="inputGroup submit">
			<input type="submit" value="Send Message" />
		</div>
	</form>
</Content>

<style type="text/scss">
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

		border-radius: var(--bRadius);
		border-radius: 25px;
		border: 2px solid var(--colorNill);

		padding: 10px;

		font-size: 1.2rem;

		resize: none;

		background-color: var(--color6);

		transition: all var(--animTime1);

		&:focus {
			outline: none;
			background-color: var(--color1);
			border-color: var(--color3);
		}
	}
	textarea {
		height: 150px;
	}

	[type='submit'] {
		background-color: var(--color2);
		color: var(--color1);
		&:hover {
			outline: none;
			background-color: var(--color3);
			border-color: var(--colorNill);
		}
	}
</style>
