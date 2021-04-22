import posts from './_posts.js';

export function get() {
	return {
		body: { posts }
	};
}
