<script>
	import { openMobileMenu, isMobile } from '$lib/store.js';
</script>

<div class="topBar" class:notMobile={!$isMobile}>
	<div class="block">
		<div
			class="mmb"
			class:openMobileMenu={$openMobileMenu}
			on:click={() => {
				$openMobileMenu = !$openMobileMenu;
			}}
		>
			<div class="bar one" />
			<div class="bar two" />
			<div class="bar three" />
		</div>
	</div>
</div>

<style type="text/scss">
	@import '../variable';

	.topBar {
		position: fixed;
		top: 0;
		height: $headerHeight;

		width: 100%;
		pointer-events: none;

		z-index: 3;

		&.notMobile {
			display: none;
		}
	}

	.block {
		position: relative;
		max-width: $mobileWidth2;
		height: 100%;

		margin: auto;
	}

	$buttonSize: 50px;

	$barHeight: calc(#{$buttonSize}/ 10);
	$barWidth: calc(#{$buttonSize} - #{$buttonSize}/ 5);
	$barPos: calc(#{$buttonSize}/ 5);
	$barCenter: calc(#{$buttonSize}/ 2 - #{$barHeight}/ 2);

	.mmb {
		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		top: 10px;
		right: $pad;

		width: $buttonSize;
		height: $buttonSize;

		border-radius: $bRadius;
		cursor: pointer;
		background-color: $color4;

		transition: all $animTime1;

		pointer-events: auto;
	}

	// @media screen and (min-width: $mobileWidth2) {
	// }

	.bar {
		position: absolute;

		height: $barHeight;
		width: $barWidth;

		border-radius: calc(#{$barHeight} / 2);
		background-color: $color3;

		transition: all $animTime1;
	}
	.one {
		top: $barPos;
	}
	.three {
		bottom: $barPos;
	}

	.mmb:hover {
		background-color: $color3;
		.bar {
			background-color: $color1;
		}
	}

	.openMobileMenu {
		.one {
			top: $barCenter;
		}
		.three {
			bottom: $barCenter;
		}
		.one,
		.three {
			transform: rotate(45deg);
		}
		.two {
			transform: rotate(-45deg);
		}
	}
</style>
