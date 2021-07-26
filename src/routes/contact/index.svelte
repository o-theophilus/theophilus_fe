<script>
	export const prerender = true;

	import { template } from './_template.js';
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
	import SVG from '$lib/svg.svelte';
	import Meta from '$lib/meta.svelte';

	import Sending from './_sending.svelte';
	import Done from './_done.svelte';

	let form = {};
	let err = {};

	const validate = () => {
		err = {};
		if (!form.name) {
			err.name = 'Please enter your name';
		}

		if (!form.email) {
			err.email = 'Please enter your name';
		} else if (!/\S+@\S+\.\S+/.test(form.email)) {
			err.email = 'Please enter a valid email address';
		}
		
		if (!form.msg) {
			err.msg = 'Please enter your message';
		}

		if (Object.keys(err).length === 0) {
			submit();
		}
	};

	let sent = 0;
	const submit = async () => {
		sent = 1;
		const resp = await fetch('https://formspree.io/f/xknkjbpb', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form)
		});

		const data = await resp.json();

		if (resp.ok) {
			sent = 2;
		} else {
			sent = 0;
			err.form = data.error;
		}
	};

	let msgStore = '';
</script>

<Meta
	title="Contact - Theophilus"
	description="Feel free to contact me with questions or anything else."
	image="/site/theophilus.jpg"
/>

<Image src="/site/theophilus.jpg" />

<Title>
	<h1>{sent < 2 ? 'Contact' : 'Message Sent'}</h1>
</Title>

<Content>
	<div class="form_position">
		{#if sent === 1}
			<Sending />
		{:else if sent === 2}
			<Done />
		{:else}
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
						<option value={msgStore}>Message</option>
						{#each template as temp}
							<option value={temp.text}>{temp.name}</option>
						{/each}
					</select>

					<textarea
						placeholder="Your Message"
						id="message"
						bind:value={form.msg}
						on:input={() => (msgStore = form.msg)}
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
		{/if}
	</div>
</Content>

<style>
	* {
		outline: none;
		font-family: var(--font1);
	}

	.form_position {
		position: relative;
	}
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

		border-radius: calc(var(--inputHeight) / 2);
		border: 2px solid var(--colorNill);

		padding: 10px;

		font-size: 1.2rem;

		background-color: var(--color6);

		transition: all var(--animTime1);
		transition-timing-function: ease-in-out;
	}
	[type='text'] {
		padding-left: var(--inputHeight);
	}
	textarea {
		display: block;
		resize: none;
		height: 150px;
	}
	[type='submit'] {
		background-color: var(--color2);
		color: var(--color1);
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

	input:focus,
	textarea:focus {
		/* outline: none;  */
		background-color: var(--color1);
		border-color: var(--color3);
	}

	[type='submit']:hover,
	[type='submit']:focus {
		background-color: var(--color3);
		border-color: var(--colorNill);
	}

	[type='text']:hover + svg,
	[type='text']:focus + svg {
		fill: var(--color3);
	}

	.err {
		margin: 0;
		color: var(--fColor3);
	}
</style>
