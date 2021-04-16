<footer class="footer">
	<div class="footer__block">
		<div class="footer__block__contact">
			<div>
				<p>Phone</p>
				<p>Email</p>
				<p>Location</p>
			</div>
			<div>
				<p>08067397793</p>
				<p>theophilus.ogbolu@gmail.com</p>
				<p>Lagos, Nigeria.</p>
			</div>
		</div>
		<br />
		<hr />

		<ul class="footer__block__social">
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
		<br />
		<br />

		<p class="copyright">&copy theophilus.website 2021</p>
	</div>
</footer>

<style type="text/scss">
	@import '../variable';

	.footer {
		background-color: black;
		color: white;
	}
	.footer__block {
		box-sizing: border-box;
		max-width: $mobileWidth;
		margin: auto;

		padding: 30px;
		margin: auto;
	}

	.footer__block__contact {
		display: flex;
		justify-content: center;
	}

	.footer__block__social {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		list-style-type: none;

		padding: 0;
		// margin: 50px 0;
		margin: 0;
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
		box-shadow: 0 0 1em orange;
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
