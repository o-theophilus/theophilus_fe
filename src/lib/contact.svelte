<div class="contact">
	<div class="contact__block">
		<div class="contact__block__name">
			<p>Phone</p>
			<p>Email</p>
			<p>Location</p>
		</div>
		<div class="contact__block__value">
			<p>08067397793</p>
			<p>theophilus.ogbolu@gmail.com</p>
			<p>Lagos, Nigeria.</p>
		</div>
	</div>
</div>

<style type="text/scss">
	@import '../variable';

	.contact {
		background-color: $color2;
	}
	.contact__block {
		display: flex;
		justify-content: center;

		max-width: $mobileWidth;

		margin: auto;
		padding: 40px;

		color: $color1;
	}

	$gap: 10px;
	.contact__block__name {
		margin-right: $gap;
	}
	.contact__block__value {
		margin-left: $gap;
	}
</style>
