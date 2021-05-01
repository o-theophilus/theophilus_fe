<script>
	import { slide } from 'svelte/transition';
	export let title = 'title';

	let tabOpened = false;

	let duration = 300;

	const handleTab = (e) => {
		if (tabOpened === false) {
			e.target.scrollIntoView({ behavior: 'smooth' });
		}

		tabOpened = !tabOpened;
	};
</script>

<div class="tab" class:tabOpened on:click={(e) => handleTab(e)}>
	<div class="btn">
		<div class="bar one" />
		<div class="bar two" />
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
		color: $fColor1;
		font-size: 1.3rem;

		transition: all $animTime1;
	}

	$buttonSize: 50px;
	$topRight: 10px;

	$barHeight: calc(#{$buttonSize}/ 10);
	$barWidth: calc(#{$buttonSize} - #{$buttonSize}/ 5);
	$barPos: calc(#{$buttonSize}/ 5);
	$barCenter: calc(#{$buttonSize}/ 2 - #{$barHeight}/ 2);

	.btn {
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

	.bar {
		position: absolute;

		height: $barHeight;
		width: $barWidth;

		border-radius: calc(#{$barHeight} / 2);
		background-color: $color1;

		transition: all $animTime1;
	}
	.two {
		transform: rotate(90deg);
	}

	.btn:hover {
		background-color: $color4;
	}

	.tabOpened {
		.tab__title {
			font-size: 2rem;
			font-weight: bolder;
		}
		.one {
			transform: rotate(45deg);
		}
		.two {
			transform: rotate(-45deg);
		}
	}
</style>
