<script>
	import Title from '$lib/pageTitle.svelte';
	import Content from '$lib/pageContent.svelte';
</script>

<Title>
	<h1>About Me</h1>
</Title>
<Content>
	<div class="block">
		<iframe
			style="width: 100%;
		height: 500px;"
			src="/project/mv_Hummer H3/mv_Hummer H3.html"
			frameborder="0"
			title="container"
		/>

		<button id="autoRotate">Auto rotate</button>
		<button id="autoRotateDirection">direction</button>
		<input type="range" min="1" max="8" value="2" step="0.1" id="autoRotateSpeed" />
	</div>
</Content>

<style>
	:global(.v3d-annotation) {
		display: none;
	}
</style>
