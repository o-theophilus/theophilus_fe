<script>
	import Home from './_home.svelte';
	import Projects from './_project.svelte';
	import Image from '$lib/pageImage.svelte';

	import Title from '$lib/pageTitle.svelte';

	// import { onMount } from 'svelte';
	// let img;
	// let ready = false;

	// onMount(() => {
	// 	img.onload = function () {
	// 		ready = true;
	// 	};
	// 	img.src = '/images/akropol_001.jpg';
	// 	img.alt = 'akropol_001.jpg';
	// });
</script>

<svelte:head>
	<title>Theophilus</title>
</svelte:head>

<Image src="/images/akropol_001.jpg" />
<!-- <img bind:this={img} alt="" /> -->
<Title>
	<h1>Welcome!</h1>
</Title>
<Home />
<Projects />
