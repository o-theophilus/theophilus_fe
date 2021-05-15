<script>
	import Title from '$lib/pageTitle.svelte';
	import Marked from '$lib/marked.svelte';

	let md = `
\`\`\`javascript
console.log("here")
let a = 55;
\`\`\`
	`;
</script>

<Title>
	<h1>Marked</h1>
</Title>

<div class="block">
	<textarea bind:value={md} />
	<div class="md"><Marked {md} /></div>
</div>

<style>
	.block {
		display: flex;
		max-width: calc(2 * var(--mobileWidth));

		margin: auto;
		padding: var(--pad);
	}

	textarea,
	.md {
		padding: var(--pad);
		width: 50%;

		resize: none;
		border: none;
	}
	textarea {
		background-color: rgb(255, 255, 175);
	}
</style>
