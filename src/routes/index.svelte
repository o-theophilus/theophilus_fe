<script>
	import Home from './home.svelte';
	import About from './about.svelte';
	import Projects from './proj.svelte';
	
	import Breaker from '$lib/breaker.svelte';
</script>

<Home />
<!-- <Breaker title="Projects"> -->
	<Projects />
<!-- </Breaker>
<Breaker title="About"> -->
	<About />
<!-- </Breaker> -->

<svelte:head>
	<title>Home</title>
</svelte:head>
