<div class="contact">
	<div class="contact__block">
		<div>
			<p>Phone</p>
			<p>Email</p>
			<p>Location</p>
		</div>
		<div>
			<p>08067397793</p>
			<p>theophilus.ogbolu@gmail.com</p>
			<p>Lagos, Nigeria.</p>
		</div>
	</div>
</div>

<style type="text/scss">
	@import '../../variable';

	.contact {
		background-color: $color2;
	}
	.contact__block {
		display: flex;
		justify-content: center;
		gap: 20px;

		max-width: $mobileWidth;

		margin: auto;
		padding: $pad;

		color: $color1;
	}
</style>
