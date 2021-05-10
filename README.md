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

- [  ] project title static
- [  ] about skills
- [  ] svg mmb
- [  ] blog .md
- [  ] add blog to home
- [  ] populate proj and blog content
- [  ] npm mailer
- [  ] page title images
