<div class="socials">
	<ul class="socials__block">
		<!-- <a href="assets/file/theophilus_cv.pdf" class="cv btn" download>
				<li>Download CV</li>
			</a> -->

		<a href="https://wa.me/2348067397793/?text=Hello%20Theophilus">
			<li class="whatsapp" />
		</a>
		<a href="https://m.facebook.com/Pheezie" target="_blank" rel="noopener noreferrer">
			<li class="facebook" />
		</a>
		<a href="https://twitter.com/Pheezie" target="_blank" rel="noopener noreferrer">
			<li class="twitter" />
		</a>
		<a
			href="https://www.linkedin.com/in/theophilus-ogbolu-977385136/"
			target="_blank"
			rel="noopener noreferrer"
		>
			<li class="linkedin" />
		</a>
		<a href="https://github.com/pheezie" target="_blank" rel="noopener noreferrer">
			<li class="github" />
		</a>
	</ul>
</div>

<style type="text/scss">
	@import '../variable';

	.socials {
		background-color: $color2;
	}
	
	.socials__block {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		
		box-sizing: border-box;
		max-width: $mobileWidth;
		
		padding: 40px;
		margin: auto;
		
		
		color: $color1;
		list-style-type: none;
	}
	


	li {
		flex-shrink: 0;
		width: 3em;
		height: 3em;

		border-radius: 50%;
		margin: 10px;

		background-color: white;
		background-size: cover;
		background-position: center;
		border-width: 1px;
		border-style: solid;
		border-color: white;

		box-shadow: 0 0 0 rgba(0, 0, 0, 0);

		transition-property: box-shadow;
		transition-duration: 300ms;
	}
	li:hover {
		box-shadow: 0 0 1em $color3;
	}

	.facebook {
		background-image: url('/Images/site/facebook.svg');
	}
	.twitter {
		background-image: url('/Images/site/twitter.svg');
	}
	.whatsapp {
		background-image: url('/Images/site/whatsapp.svg');
	}
	.linkedin {
		background-image: url('/Images/site/linkedin.svg');
	}
	.github {
		background-image: url('/Images/site/github.svg');
	}
	.copyright {
		text-align: center;
	}
</style>
