<div class="content">
	<slot />
</div>

<style>
	.content {
		max-width: var(--mobileWidth);
		margin: auto;
		padding: var(--pad);

		line-height: 30px;
	}

	:global(.content *) {
		margin: 0;
		padding: 0;
	}
</style>
