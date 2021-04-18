<script>
	import { slide } from 'svelte/transition';
	export let title = 'title';

	export let tabOpened = false;

	let duration = 300;

	let element;
	const handleTab = () => {
		tabOpened = !tabOpened;

		if (tabOpened === false) {
			element.scrollIntoView(true);
		}
		// setTimeout(scroll(), 400);
	};
	// const scroll = () => {
	// };
</script>

<div class="tab" class:tab--open={tabOpened} on:click={handleTab} bind:this={element}>
	<div class="tab__btn">
		<div class="tab__btn__bar tab__btn__bar--one" />
		<div class="tab__btn__bar tab__btn__bar--two" />
	</div>
	<p class="tab__title">
		{title}
	</p>
</div>

{#if tabOpened}
	<div transition:slide={{ duration }}>
		<slot />
	</div>
{/if}

<style type="text/scss">
	@import '../variable';

	.tab {
		display: flex;
		justify-content: center;
		align-items: center;

		position: relative;

		height: 70px;

		background-color: $color3;
		border-bottom-style: solid;
		border-color: $color1;
	}

	.tab__title {
		color: $color1;
		font-size: 1.3em;

		transition: all $animTime1;
	}

	$buttonSize: 50px;
	$topRight: 10px;

	$barHeight: calc(#{$buttonSize}/ 10);
	$barWidth: calc(#{$buttonSize} - #{$buttonSize}/ 5);
	$barPos: calc(#{$buttonSize}/ 5);
	$barCenter: calc(#{$buttonSize}/ 2 - #{$barHeight}/ 2);

	.tab__btn {
		display: flex;
		justify-content: center;
		align-items: center;

		position: absolute;
		top: $topRight;
		left: $topRight;

		width: $buttonSize;
		height: $buttonSize;

		border-radius: 5px;
		cursor: pointer;
		background-color: $colorNill;

		transition: all $animTime1;
	}

	.tab__btn__bar {
		position: absolute;

		height: $barHeight;
		width: $barWidth;

		border-radius: calc(#{$barHeight} / 2);
		background-color: $color1;

		transition: all $animTime1;
	}
	.tab__btn__bar--two {
		transform: rotate(90deg);
	}

	.tab__btn:hover {
		background-color: $color4;
	}

	.tab--open {
		.tab__title {
			font-size: 2em;
			font-weight: bolder;
		}
		.tab__btn__bar--one {
			transform: rotate(45deg);
		}
		.tab__btn__bar--two {
			transform: rotate(-45deg);
		}
	}
</style>
