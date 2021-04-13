<script>
	import Home from './home.svelte';
	import About from './about.svelte';
	import Projects from './projects.svelte';
	import Contact from './contact.svelte';
	import Breaker from './breaker.svelte';
</script>


<Home />
<Breaker title="About" />
<About />
<Breaker title="Projects" />
<Projects mini />
<Breaker title="Contact" />
<Contact />


<svelte:head>
	<title>Home</title>
</svelte:head>