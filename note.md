# My Note

## Getting Started

```cmd
npm init svelte@next
npm install
npm run dev

npm run dev -- --open

```


```cmd

npm i svelte-kit-cookie-session

```

## Getting Started Sapper

```cmd
npm i -g degit
npx degit "sveltejs/sapper-template#rollup" firstapp
cd firstapp
npm install
```

## Running App

```cmd
npm run dev
```

## Building App

```cmd
npm run build
```

## Setting up sass

```cmd
npm install svelte-preprocess node-sass
```

_then_

`rollup.config.js`

```javascript

// add this import at the top:
import preprocess from 'svelte-preprocess';


/* ... */


// and add preprocess as a plugin:
export default {
  /* ... */
  plugins: [
    svelte({
      /* ... */
      preprocess: preprocess()
    })
  }),
  /* ... */
}
```

_then_

```javascript
<style type="text/scss">
```

## Concepts

-   {}
-   $:
-   on:click={() => handleClick(-1)}
-   bind:value={name}

# Tasks

- [  ] authentication mail SignatureExpired

