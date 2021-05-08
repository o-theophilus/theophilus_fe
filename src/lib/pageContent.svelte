<div class="content">
	<slot />
</div>

<style type="text/scss">
	@import '../variable';

	.content {
		max-width: $mobileWidth;
		margin: auto;
		padding: $pad;

		line-height: 30px;
	}
</style>
