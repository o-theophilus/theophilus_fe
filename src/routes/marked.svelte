<script>
	import Content from '$lib/pageContent.svelte';
	import marked from 'marked';
	import hljs from 'highlight.js';
	import '../a11y-dark.css';

	marked.setOptions({
		renderer: new marked.Renderer(),
		highlight: function (code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
		// pedantic: false,
		// gfm: true,
		// breaks: false,
		// sanitize: false,
		// smartLists: true,
		// smartypants: false,
		// xhtml: false
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
</script>

<Content>
	<h1>Marked</h1>
</Content>
<hr />
<div class="area">
	<textarea bind:value={md} />
	<div class="md">{@html marked(md)}</div>
</div>

<style>
	.area {
		display: flex;
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

	:global(pre) {
		padding: 20px;
	}
	:global(pre *) {
		font-family: monospace;
	}
</style>
