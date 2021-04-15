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

## Using SCSS
```javascript
<style type="text/scss">
```



# Session cookie
```npm
npm i svelte-kit-cookie-session
```

# Deploy static site


```node
npm i -D @sveltejs/adapter-static
```

in `svelte.config.cjs`, set the adapter

```javascript
const static = require('@sveltejs/adapter-static');

adapter: static(),
```

# Concepts to know

-   {}
-   $:
-   on:click={() => handleClick(-1)}
-   bind:value={name}

# Tasks

- [  ] authentication mail SignatureExpired
