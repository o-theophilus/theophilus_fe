<script>
	import Content from '$lib/pageContent.svelte';
	import Title from '$lib/pageTitle.svelte';
</script>

<svelte:head>
	<title>Message Sent - Theophilus</title>
</svelte:head>

<Title>
	<h1>Message Sent</h1>
</Title>

<Content>

	<p>Thank You</p>
	<br />
	<br />
	<video loop autoplay muted >
		<source src="/site/done.mp4" type="video/mp4" />
	</video>
	<br />
	<br />
	Back to <a href="/">Home</a>
</Content>
