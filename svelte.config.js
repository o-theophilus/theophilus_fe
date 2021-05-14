import sveltePreprocess from 'svelte-preprocess'
// const node = require('@sveltejs/adapter-node');
import  vercel from '@sveltejs/adapter-vercel';
// import  pkg from './package.json';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess(),
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		// adapter: node(),
		adapter: vercel(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		// vite: () => ({})
	}
};

export default config;