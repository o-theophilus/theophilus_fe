# My Note

## Getting Started

```npm
npm init svelte@next
npm install
npm run dev

//or

npm i
npm run dev -- --open
```


## Building App

```npm
npm run build
```

## Testing Build

```npm
npm start
```


# Deploy on vercel

Add "@sveltejs/adapter-vercel": "next" to the devDependencies in your package.json and run npm install.

in `svelte.config.cjs`, set the adapter

```javascript
const vercel = require('@sveltejs/adapter-vercel');

module.exports = {
	kit: {
		...
		adapter: vercel()
	}
};
```


# Tasks

1. [ ] page title images
1. [ ] populate proj and blog content
1. [ ] review form message
1. [ ] purchase theophilus.website

1. [ ] index animation
1. [ ] project title static
1. [ ] add blog to home
1. [ ] dark mode
