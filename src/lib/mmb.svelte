<div class="mmb">
	<div class="mmb__bar mmb__bar--one" />
	<div class="mmb__bar mmb__bar--two" />
	<div class="mmb__bar mmb__bar--three" />
</div>

<style type="text/scss">
	@import '../variable';

	$barHeight: 5px;
	$buttonSize: 50px;

	.mmb {
		background-color: red;
		position: fixed;
		top: 0;
		right: 0;

		width: $buttonSize;
		height: $buttonSize;
	}
	.mmb__bar {
		height: $barHeight;
		width: calc(#{$buttonSize} - 10px);
		background-color: white;

		border-radius: calc(#{$barHeight} / 2);
	}

	@media screen and (max-width: $mobileWidth) {
		// .nav {
		// 	height: 100vh;
		// 	background-color: lightblue;
		// }
	}
</style>
