# My Note

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

1. [ ] fix home default title image size
1. [ ] review form message
1. [ ] change site images

### features

1. [ ] add blog to home
1. [ ] dark mode
1. [ ] site search

git add -A && git commit -m "mod note" && git push
