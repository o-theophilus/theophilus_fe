<div class="pageContent">
	<slot />
</div>

<style>
	.pageContent {
		max-width: var(--mobileWidth);
		margin: auto;

		padding: var(--pad);
		line-height: var(--lineHeight);
	}

	:global(.pageContent img) {
		border-radius: var(--bRadius);
	}
</style>
