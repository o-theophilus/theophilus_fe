<script>
	export let project;
</script>

<a href="/projects/{project.slug}">
	<div class="project">
		<img class="project__img" src="/Images/project/{project.img}" alt={project.name} />
		<div class="project__details">
			{project.name}
			<br />
			{project.summary}
		</div>
	</div>
</a>

<style type="text/scss">
	@import '../variable';

	.project {
		border-radius: $bRadius;
		// box-shadow: 0 0 20px 1px; 
	}
	.project__img {
		border-radius: $bRadius $bRadius 0 0;
		width: 100%;
	}
	.project__details {
		padding: 30px;
	}
</style>
