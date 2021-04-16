<script>
	import Image from '$lib/pageImage.svelte';
	import Content from '$lib/pageContent.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<p id="home" />

<Image img="/project/akropol_001.jpeg" />

<Content>
	<h6 class="desc">Welcome!</h6>

	<div class="center">
		<h4>
			<strong>Hi.</strong>
		</h4>
		Welcome to my personal portfolio website.
		<br />I am a web developer / graphics designer based in Lagos. I have a passion for designing
		and I love to create for web and mobile devices.
	</div>

	<div class="left">
		<h4>
			<strong>What I can do.</strong>
		</h4>
		<br />
		<strong>Design what you want.</strong>
		<br />
		I like to keep it simple. My goals are focused on details, content and conveying the message that
		you want to send.
		<br />
		<br />
		<strong>Develop what you need.</strong>
		<br />I am a developer, so I know how to create your website to run accross devices using the
		latest technologies available.
	</div>

	<div class="right">
		<h4>
			<strong>I can help.</strong>
		</h4>
		I am currently available for freelance work. If you have a project that you want to get started,
		think you need my help with something or just fancy saying hey, then get in touch.
	</div>
</Content>