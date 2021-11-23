# Toolchain for testing Svelte components written in TypeScript

**Note** All of this information is combined from different sources. This should help you not going through all these sources again.

## The toolchain

If you are fairly new to Svelte(kit) or web development, the process of setting up a test toolchain can be failry frustrating (at least it was for me).This guide will help you to setup a toolchain to write unit tests for Svelte Components and business logic within your api endpoints.

Here is what we will use to test our Sveltekit website/app/... .

- [Jest](https://jestjs.io/)
- [ts-node](https://typestrong.org/ts-node/)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [Svelte-Jester](https://github.com/mihar-22/svelte-jester#typescript)
- [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/intro)

## Setup

First things first we generate a new SvelteKit project.

```bash
npm init svelte@next my-app
cd my-app
npm install
```

Answer the questions as shown in the screenshot.

![init questions](./images/init-svelte.png)

Now we install all the devDependencies we need

```bash
npm install --save-dev jest ts-jest ts-node svelte-jester @testing-library/svelte @testing-library/jest-dom
```

Ok now we need to add some configuration to get everything up and running.

Create a [jest config file](./my-app/jest.config.cjs) file with the following content

```js
module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'jsdom',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        "preprocess": true
      }
    ],
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: [
    "js",
    "ts",
    "svelte"
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
```

To run the tests we add the following command to our package.json

```js
{
  "scripts": {
    "test": "jest src",
    "test:watch": "npm run test -- --watch"
  }
}
```

Now we run our first test

```bash
npm run test
```

The result should be similar to this
![first test run](./images/first-test.png)

## Writing our first test

Now it is time to write our first test for our SvelteKit app.
There are many opinions about tests (in which folder do they belong, which postfix should be used, ...).

We follow this pattern:
- Tests will be written in *.spec.ts files
- Tests belong into the same directory as the to be tested source code

So we have a [index.svelte](./my-app/src/routes/index.svelte) file. This Svelte Component creates a heading and a paragraph with text.
We will test if the heading is being displaid.

```js
/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'
import Index from './index.svelte'

test('shows proper heading when rendered', () => {
    const { getByText } = render(Index)

    expect(getByText('Welcome to SvelteKit')).toBeInTheDocument()
})
```

### Sources

- [Setup Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/setup)
- [Setup Svelte Jester](https://github.com/mihar-22/svelte-jester#typescript)
