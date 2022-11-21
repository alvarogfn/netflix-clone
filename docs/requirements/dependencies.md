# Dependencies

## Vue 3

Vue Js is a very light and pleasant framework to use. It's very opinionated in its folder and component structure, plus it comes with global state management, and a routing library.

::: warning
In development, I ended up not using typescript or the Composition API.
:::

## Dexie

Dexie is a local database that works with the Browser's indexedb API, which is very similar to a MongoDB database.

## Vitest and Cypress

Both viteste and cypress are libraries that come by default in the vue scaffold.

- The vitest for unit tests;
- Cypress for e2e tests;

::: error
Unfortunately, this was a test requirement that I ended up not implementing.
:::

## Sass

Sass is a CSS preprocessor that extends the functionality of standard CSS3.

::: tip
I also used the BEM class naming methodology for most of the components. And the CSS library normalizes to ensure style consistency across browsers.
:::

## Vitepress

Vitepress is a Static Site Generator that I used to build the software documentation.
