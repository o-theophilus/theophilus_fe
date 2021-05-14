<script>
	import Content from '$lib/pageContent.svelte';
	import marked from 'marked';
	import hljs from 'highlight.js';
	import { onMount } from 'svelte';

	onMount(() => {
		marked.setOptions({
			renderer: new marked.Renderer(),
			highlight: function (code, lang) {
				return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
			}
		});
	});

	let md = `
# create-svelte

## Creating a project


\`\`\`javascript
	console.log("here")
	let a = 55;
\`\`\`


console.log("here")
1. ewe
1. ewe
1. ewe
   1. ewe
   5. ewe

* ewe
* ewe


*sdfsdfsf* **fsdfsdf**

[ x ]. kdfdfjk

	

	`;

	$: html = marked(md);
</script>

<Content>
	<h1>Marked</h1>
</Content>
<hr />
<div class="area">
	<textarea bind:value={md} />
	<div class="md">{@html html}</div>
</div>

<style>
	.area {
		display: flex;
		/* height: 1000px; */
		max-width: calc(2 * var(--mobileWidth));

		margin: auto;
		padding: var(--pad);
	}

	textarea,
	.md {
		padding: var(--pad);
		width: 100%;

		resize: none;
	}
	textarea {
		border: none;
		background-color: rgb(255, 255, 175);
	}
</style>
