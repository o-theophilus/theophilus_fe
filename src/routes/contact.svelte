<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';

	import { goto } from '$app/navigation';

	let form = {
		name: '',
		email: '',
		msg: ''
	};

	let err = {
		name: '',
		email: '',
		msg: '',
		form: ''
	};

	const validate = () => {
		err.name = form.name === '' ? 'Please enter your name' : '';
		err.email = form.email === '' ? 'Please enter your email address' : '';
		err.msg = form.msg === '' ? 'Please enter your message' : '';

		if (err.name === '' && err.email === '' && err.msg === '' && err.form === '') {
			submit();
		}
	};

	const submit = async () => {
		const resp = await fetch('https://formspree.io/f/xknkjbpb', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		});

		const data = await resp.json();

		if (resp.ok) {
			goto('/done');
			// form.reset();
		} else {
			err.form = data.error;
		}
	};
</script>

<svelte:head>
	<title>Contact - Theophilus</title>
</svelte:head>

<Image src="/site/theophilus.jpg" />

<Title>
	<h1>Contact</h1>
</Title>

<Content>
	<p>
		Feel free to contact me with questions or anything else. I will do my best to respond to your
		query as soon as possible.
	</p>
	<form on:submit|preventDefault={validate}>
		<div class="inputGroup required">
			<label for="name">Full Name</label>
			<input placeholder="Your Name" type="text" name="name" bind:value={form.name} />
			{#if err.name}
				<p class="err">
					{err.name}
				</p>
			{/if}
		</div>
		<div class="inputGroup required">
			<label for="email">Email Address</label>
			<input placeholder="Your Email Address" type="email" name="email" bind:value={form.email} />
			{#if err.email}
				<p class="err">
					{err.email}
				</p>
			{/if}
		</div>
		<div class="inputGroup required">
			<label for="message">Message</label>
			<textarea placeholder="Your Message" name="message" bind:value={form.msg} />
			{#if err.msg}
				<p class="err">
					{err.msg}
				</p>
			{/if}
		</div>
		{#if err.form}
			<p class="err">
				{err.form}
			</p>
		{/if}
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
		&:hover,
		&:focus {
			outline: none;
			background-color: var(--color3);
			border-color: var(--colorNill);
		}
	}

	.err {
		color: red;
	}
</style>
