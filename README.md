# Clone da Netflix em Vue.js

## Documentation

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Compile and Minify for Production with Docker

```sh
  docker compose up
```

The application will be exposed at `http://localhost:3003` on your computer.

### Run Unit Tests with [Vitest](https://vitest.dev/) (NOT IMPLEMENTED)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/) (NOT IMPLEMENTED)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
