<script>
	import Home from './_home.svelte';
	import Projects from './_project.svelte';
	import Image from '$lib/pageImage.svelte';

	import Title from '$lib/pageTitle.svelte';
</script>

<svelte:head>
	<title>Theophilus</title>
</svelte:head>

<Image src="/images/akropol_001.jpeg" />
<Title>
	<h1>Welcome!</h1>
</Title>
<Home />
<Projects />
