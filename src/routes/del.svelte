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

		<div class="ui">
			<div class="btn" id="autoRotate">AR</div>
			<div class="btn" id="autoRotateDirection">d</div>
			<input type="range" min="1" max="8" value="2" step="0.1" id="autoRotateSpeed" />
		</div>
	</div>
</Content>

<style>
	.block {
		position: relative;
	}
	/* iframe { */
		/* background-color: black; */
	/* } */
	.ui {
		position: absolute;
		display: flex;
		gap: 20px;

		top: 0;
		left: 0;
	}
	.btn {
		background-color: red;
		width: 50px;
		height: 50px;
	}
	/* ... */
</style>
