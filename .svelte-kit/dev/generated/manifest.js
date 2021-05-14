const c = [
	() => import("..\\..\\..\\src\\routes\\__layout.svelte"),
	() => import("..\\..\\..\\src\\routes\\__error.svelte"),
	() => import("..\\..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\contact.svelte"),
	() => import("..\\..\\..\\src\\routes\\project\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\project\\[slug].svelte"),
	() => import("..\\..\\..\\src\\routes\\marked.svelte"),
	() => import("..\\..\\..\\src\\routes\\about.svelte"),
	() => import("..\\..\\..\\src\\routes\\blog\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\blog\\[slug].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/contact.svelte
	[/^\/contact\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/project/index.json.js
	[/^\/project\.json$/],

	// src/routes/project/index.svelte
	[/^\/project\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/project/[slug].svelte
	[/^\/project\/([^/]+?)\/?$/, [c[0], c[5]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/marked.svelte
	[/^\/marked\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/blog/index.json.js
	[/^\/blog\.json$/],

	// src/routes/blog/index.svelte
	[/^\/blog\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/blog/[slug].svelte
	[/^\/blog\/([^/]+?)\/?$/, [c[0], c[9]], [c[1]], (m) => ({ slug: d(m[1])})]
];

export const fallback = [c[0](), c[1]()];