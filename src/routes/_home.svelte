<script>
	import Content from '$lib/pageContent.svelte';
</script>

<Content>
	<h1>Welcome!</h1>
</Content>
<hr />
<Content>
	<div class="center">
		<h3>Hi.</h3>
		Welcome to my personal portfolio website.
		<br />I am a web developer / graphics designer based in Lagos. I have a passion for designing
		and I love to create for web and mobile devices.
	</div>
	<br />
	<br />
	<div class="left">
		<h3 class="type2">What I can do.</h3>
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
	<br />
	<br />
	<div class="right">
		<h3 class="type2">I can help.</h3>
		I am currently available for freelance work. If you have a project that you want to get started,
		think you need my help with something or just fancy saying hey, then
		<a href="/contact">get in touch</a>.
	</div>
	<br />
</Content>

<style>
	.type2 {
		color: var(--fColor3);
	}

	a {
		color: var(--fColor2);
	}
</style>
