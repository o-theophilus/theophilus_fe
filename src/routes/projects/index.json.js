import projects from './_projects.js';

export function get() {
	return {
		body: { projects }
	};
}
