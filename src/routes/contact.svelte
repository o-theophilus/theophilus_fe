<script>
	export const prerender = true;

	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
	import SVG from '$lib/svg.svelte';

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

	let sent = false;
	let sending = false;

	const validate = () => {
		err.name = form.name === '' ? 'Please enter your name' : '';
		err.email = /\S+@\S+\.\S+/.test(form.email) ? '' : 'Please enter a valid email address';
		err.msg = form.msg === '' ? 'Please enter your message' : '';

		if (err.name === '' && err.email === '' && err.msg === '' && err.form === '') {
			submit();
		}
	};

	const submit = async () => {
		sending = true;
		const resp = await fetch('https://formspree.io/f/xknkjbpb', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		});

		const data = await resp.json();

		sending = false;
		if (resp.ok) {
			sent = true;
		} else {
			err.form = data.error;
		}
	};

	const template = [
		{
			name: 'Nice Job!',
			text: 'Wow!! Your site is awesome, Keep it up Bro.'
		},
		{
			name: 'Lets work together',
			text: `Hi Theo,
	
I like what you do, lets work together.

You can reach me on my email or call +_____
`
		},
		{
			name: 'Learn',
			text: `Hi Theo,

I'll like so learn _____ from you.
`
		}
	];
	let store = '';
</script>

<svelte:head>
	<title>{!sent ? 'Contact' : 'Message Sent'} - Theophilus</title>
</svelte:head>

<Image src="/site/theophilus.jpg" />

<Title>
	<h1>{!sent ? 'Contact' : 'Message Sent'}</h1>
</Title>

<Content>
	<div class="form_block">
		{#if sending}
			<div class="blocker">
				<video class="busy" loop autoplay muted>
					<source src="/site/busy.mp4" type="video/mp4" />
				</video>
				<br />
				<br />
				<h2>Sending . . .</h2>
			</div>
		{/if}
		{#if !sent}
			<p>
				Feel free to contact me with questions or anything else. I will do my best to respond to
				your query as soon as possible.
			</p>

			<form on:submit|preventDefault={validate}>
				<div class="inputGroup">
					<label for="name">Full Name</label>
					<input placeholder="Your Name" type="text" id="name" bind:value={form.name} />
					<svg width="30px" height="30px">
						<SVG type="username" />
					</svg>
					{#if err.name}
						<p class="err">
							{err.name}
						</p>
					{/if}
				</div>
				<div class="inputGroup">
					<label for="email">Email Address</label>
					<input placeholder="Your Email Address" type="text" id="email" bind:value={form.email} />
					<svg width="30px" height="30px">
						<SVG type="emailAddress" />
					</svg>
					{#if err.email}
						<p class="err">
							{err.email}
						</p>
					{/if}
				</div>
				<div class="inputGroup">
					<select name="template" id="" bind:value={form.msg}>
						<option value={store}>Message</option>
						{#each template as temp}
							<option value={temp.text}>{temp.name}</option>
						{/each}
					</select>

					<textarea
						placeholder="Your Message"
						id="message"
						bind:value={form.msg}
						on:input={() => (store = form.msg)}
					/>
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
		{:else}
			<p>Thank You</p>
			<br />
			<br />
			<video loop autoplay muted>
				<source src="/site/done.mp4" type="video/mp4" />
			</video>
			<br />
			<br />
			Back to <a href="/">Home</a>
		{/if}
	</div>
</Content>

<style>
	.inputGroup {
		--inputHeight: 50px;

		position: relative;
		margin-top: 20px;
	}
	label {
		display: inline-block;
		margin-bottom: 10px;
	}
	input,
	textarea {
		width: 100%;
		height: var(--inputHeight);

		border-radius: var(--bRadius);
		border-radius: 25px;
		border: 2px solid var(--colorNill);

		padding: 10px;

		font-size: 1.2rem;

		resize: none;

		background-color: var(--color6);

		transition: all var(--animTime1);
		transition-timing-function: ease-in-out;
	}
	textarea {
		height: 150px;
	}
	input:focus,
	textarea:focus {
		outline: none;
		background-color: var(--color1);
		border-color: var(--color3);
	}

	[type='submit'] {
		background-color: var(--color2);
		color: var(--color1);
	}
	[type='submit']:hover,
	[type='submit']:focus {
		outline: none;
		background-color: var(--color3);
		border-color: var(--colorNill);
	}

	[type='text'] {
		padding-left: var(--inputHeight);
	}
	[type='text']:hover + svg,
	[type='text']:focus + svg {
		fill: var(--color3);
	}
	svg {
		--svgSize: 30px;

		position: absolute;

		top: 50px;
		left: calc((var(--inputHeight) - var(--svgSize)) / 2);

		fill: var(--color2);

		transition: all var(--animTime1);
		transition-timing-function: ease-in-out;
	}
	select {
		background-color: var(--color1);
		font-size: 16px;
		border: none;
		margin-bottom: 10px;
	}
	select:focus,
	select:active {
		border: none;
	}

	.err {
		color: var(--fColor3);
	}

	/* ************************* */
	.form_block {
		position: relative;
	}

	.blocker {
		position: absolute;
		background-color: var(--color1);

		z-index: 1;
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.busy {
		max-width: 200px;
	}
</style>
