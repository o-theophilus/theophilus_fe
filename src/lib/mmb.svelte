<script>
	import { openMobileMenu, isMobile, showHeader } from '$lib/store.js';
</script>

<div class="topBar" class:notMobile={!$isMobile}>
	<div class="block">
		<div
			class="mmb"
			class:openMobileMenu={$openMobileMenu}
			class:hideHeader={!$showHeader}
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
	.topBar {
		position: fixed;
		top: 0;
		height: var(--headerHeight);

		width: 100%;
		pointer-events: none;

		z-index: 3;

		&.notMobile {
			display: none;
		}

		--buttonSize: 50px;

		--barHeight: calc(var(--buttonSize) / 10);
		--barWidth: calc(var(--buttonSize) - var(--buttonSize) / 5);
		--barPos: calc(var(--buttonSize) / 5);
		--barCenter: calc(var(--buttonSize) / 2 - var(--barHeight) / 2);
	}

	.block {
		position: relative;
		max-width: var(--mobileWidth2);
		height: 100%;

		margin: auto;
	}

	.mmb {
		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		top: 10px;
		right: var(--pad);

		width: var(--buttonSize);
		height: var(--buttonSize);

		border-radius: var(--bRadius);
		cursor: pointer;
		background-color: var(--colorNill);

		transition: all var(--animTime1);

		pointer-events: auto;
	}

	.hideHeader {
		background-color: var(--color4);
		.bar {
			background-color: var(--color5);
		}
	}

	.bar {
		position: absolute;

		height: var(--barHeight);
		width: var(--barWidth);

		border-radius: calc(var(--barHeight) / 2);
		background-color: var(--color1);

		transition: all var(--animTime1);

		// mix-blend-mode: exclusion;
		// mix-blend-mode: difference;
	}
	.one {
		top: var(--barPos);
	}
	.three {
		bottom: var(--barPos);
	}

	.mmb:hover {
		background-color: var(--color3);
		.bar {
			background-color: var(--color1);
		}
	}

	.openMobileMenu {
		.one {
			top: var(--barCenter);
		}
		.three {
			bottom: var(--barCenter);
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
