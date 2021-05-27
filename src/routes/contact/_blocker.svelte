<div class="blocker">
	<video class="busy" loop autoplay muted>
		<source src="/site/busy.mp4" type="video/mp4" />
	</video>
	<br />
	<br />
	<h2>Sending . . .</h2>
</div>

<style>
	.blocker {
		position: absolute;
		background-color: var(--color1);

		z-index: 1;
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.busy {
		max-width: 200px;
	}
</style>
