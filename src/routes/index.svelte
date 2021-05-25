<script>
	import Home from './_home.svelte';
	import Projects from './_project.svelte';
	import Image from '$lib/pageImage.svelte';

	export let projects;
</script>

<svelte:head>
	<title>Theophilus</title>
</svelte:head>

<Image src="/images/akropol_001.jpeg" />

<Home />
<Projects {projects} />
