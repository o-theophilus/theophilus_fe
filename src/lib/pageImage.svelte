<script>
	import SVG from '$lib/svg.svelte';
	import { isMobile } from '$lib/store.js';

	export let src = '';
	export let query = '.pageContent';

	export let copy = '';
	export let text = '';

	const scroll = () => {
		let e = document.querySelector(query);
		e.scrollIntoView({ behavior: 'smooth' });
	};

	const scrollDesktop = () => {
		let e = document.querySelector(query);
		const offset = 70;
		const bodyRect = document.body.getBoundingClientRect().top;
		const elementRect = e.getBoundingClientRect().top;
		const elementPosition = elementRect - bodyRect;
		const offsetPosition = elementPosition - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	};
</script>

<section>
	<img src="/site/{src}.jpg" alt={src} />
	<div class="msg">
		<h1>{copy}</h1>
		<p>{text}</p>
	</div>
	<div class="scroll" on:click|stopPropagation={$isMobile ? scroll : scrollDesktop}>
		<SVG type="down" size="50" />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		position: relative;
		width: 100vw;
		height: 100vh;

		padding: var(--headerHeight);
	}

	img {
		position: absolute;
		/* inset: 0; */
		height: 100vh;

		object-fit: cover;
		z-index: -1;
	}
	.msg {
		max-width: var(--mobileWidth);
		/* margin: auto; */

		font-size: 2em;
		text-align: center;
		color: white;
	}
	.scroll {
		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		bottom: var(--headerHeight);
		--size: 100px;

		border-radius: 50%;
		width: var(--size);
		height: var(--size);

		background-color: var(--color4);
		justify-self: flex-start;

		backdrop-filter: blur(2px);
		fill: var(--color3);

		cursor: pointer;
	}
</style>
