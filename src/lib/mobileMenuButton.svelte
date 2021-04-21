<script>
	export let mobileMenuOpened = false;
	export let isMobile = true;
</script>

<div class="mmb" class:mobileMenuOpened class:isMobile on:click>
	<div class="mmb__bar mmb__bar--one" />
	<div class="mmb__bar mmb__bar--two" />
	<div class="mmb__bar mmb__bar--three" />
</div>

<style type="text/scss">
	@import '../variable';

	$buttonSize: 50px;
	$topRight: 10px;

	$barHeight: calc(#{$buttonSize}/ 10);
	$barWidth: calc(#{$buttonSize} - #{$buttonSize}/ 5);
	$barPos: calc(#{$buttonSize}/ 5);
	$barCenter: calc(#{$buttonSize}/ 2 - #{$barHeight}/ 2);
	
	.mmb {
		display: none;
		justify-content: center;
		align-items: center;
		
		position: fixed;
		top: $topRight;
		right: $topRight;

		width: $buttonSize;
		height: $buttonSize;
		
		border-radius: $bRadius;
		cursor: pointer;
		background-color: $color4;
		
		transition: all $animTime1;
	}
	.isMobile{
		display: flex;
	}
	// @media screen and (min-width: $mobileWidth2) {
	// }

	.mmb__bar {
		position: absolute;

		height: $barHeight;
		width: $barWidth;

		border-radius: calc(#{$barHeight} / 2);
		background-color: $color3;

		transition: all $animTime1;
	}
	.mmb__bar--one {
		top: $barPos;
	}
	.mmb__bar--three {
		bottom: $barPos;
	}

	.mmb:hover {
		background-color: $color3;
		.mmb__bar {
			background-color: $color1;
		}
	}

	.mobileMenuOpened {
		.mmb__bar--one {
			top: $barCenter;
		}
		.mmb__bar--three {
			bottom: $barCenter;
		}
		.mmb__bar--one,
		.mmb__bar--three {
			transform: rotate(45deg);
		}
		.mmb__bar--two {
			transform: rotate(-45deg);
		}
	}

</style>
