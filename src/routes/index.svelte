<script>
	import Home from './_home.svelte';
	import Projects from './_project.svelte';
	import Image from '$lib/pageImage.svelte';
	import Title from '$lib/pageTitle.svelte';
	import Meta from '$lib/meta.svelte';

	// import { onMount } from 'svelte';
	// let img;
	// let ready = false;

	// onMount(() => {
	// 	img.onload = function () {
	// 		ready = true;
	// 	};
	// 	img.src = '/site/akropol_001.jpg';
	// 	img.alt = 'akropol_001.jpg';
	// });
</script>

<Meta
	title="Theophilus"
	description="Welcome to my personal portfolio website."
	image="/site/akropol_001.jpg"
/>

<Image src="/site/akropol_001.jpg" />
<!-- <img bind:this={img} alt="" /> -->
<Title>
	<h1>Welcome!</h1>
</Title>
<Home />
<Projects />
