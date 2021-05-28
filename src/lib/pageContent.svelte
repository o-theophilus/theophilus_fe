<script>
	export let noMargin = false;
</script>

<div class="pageContent" class:removeMargin={!noMargin}>
	<slot />
</div>

<style>
	.pageContent {
		max-width: var(--mobileWidth);
		margin: auto;

		padding: var(--pad);
		line-height: var(--lineHeight);
	}
</style>
