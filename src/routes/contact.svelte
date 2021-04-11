<section id="title">
	<img src="/Images/site/Theophilus.jpg" alt="Theophilus" />
	<div>
		<h1>Contact</h1>
		<h6 className="desc" />
	</div>
</section>

<div className="content">
	Feel free to contact me with questions or anything else. I will do my best to respond to your
	query as soon as possible.
	<br />
	<br />
	<form method="post" autoComplete="off" action="https://formspree.io/theophilus.ogbolu@gmail.com">
		<div className="inputGroup required">
			<label htmlFor="name">Full Name</label>
			<br />
			<input placeholder="Your Name" type="text" id="name" name="name" required />
		</div>
		<div className="inputGroup required">
			<label htmlFor="email">Email Address</label>
			<br />
			<input placeholder="Your Email Address" type="email" id="email" name="email" required />
		</div>
		<div className="inputGroup required">
			<label htmlFor="message">Message</label>
			<br />
			<textarea placeholder="Your Message" id="message" name="message" required />
		</div>
		<div className="inputGroup submit">
			<input type="submit" className="btn" value="Send Message" />
		</div>
	</form>
</div>
