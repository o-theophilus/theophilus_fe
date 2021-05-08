<!-- <script>
	import marked from 'marked';
	let md = `
# create-svelte

## Creating a project

\`\`\`javascript
	console.log("here")
\`\`\`

console.log("here")
1. ewe
1. ewe
1. ewe
    1. ewe
1. ewe
- ewe

- ewe


*sdfsdfsf* **fsdfsdf**

[ x ]. kdfdfjk

	`;

	$: html = marked(md);
</script>

<div class="area">
	<textarea bind:value={md} />
	<div class="output">{@html html}</div>
</div>

<ol>
	<li>1</li>
	<li>1</li>
	<li>1</li>
	<li>1</li>
</ol>

<style type="text/scss">
	:global(*) {
		margin: 50px;
		padding: 50px;
	}
	.area {
		display: flex;
		height: 1000px;
	}
	textarea {
		width: 100%;
	}
	.output {
		padding: 30px;
		width: 100%;
	}
	ol {
		background-color: red;
	}
</style> -->
