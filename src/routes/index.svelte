<script>
	import Home from './home.svelte';
	import About from './about.svelte';
	import Projects from './projects/index.svelte';
	
	import Breaker from '$lib/breaker.svelte';
</script>

<Home />
<Breaker title="Projects">
	<Projects mini />
</Breaker>
<Breaker title="About">
	<About />
</Breaker>

<svelte:head>
	<title>Home</title>
</svelte:head>
