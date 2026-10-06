# gluon-font-awesome

[![NPM Latest version](https://img.shields.io/npm/v/@gluon/font-awesome.svg)](https://www.npmjs.com/package/@gluon/font-awesome)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

_A lightweight Web Component wrapper for Font Awesome_

---

- Supports **Free** and **Pro** icon sets
- Uses the Font Awesome **CDN**
- Supports **self-hosted** font-awesome assets

## Examples

### Basic usage

```html
<script type="module" src="/node_modules/@gluon/font-awesome/font-awesome.js"></script>

<font-awesome icon="fas fa-camera-retro fa-7x"></font-awesome>
```

### In other Web Components

```javascript
import '/node_modules/@gluon/font-awesome/font-awesome.js';

class MyElement extends HTMLElement {
  get template() {
    return html`<p>Take a picture! <font-awesome icon="fas fa-camera-retro"></font-awesome></p>`;
  }
  // ...
}
```

### Using font-awesome Pro

```html
<script>window.FontAwesome = { pro: true };</script>
<script type="module" src="/node_modules/@gluon/font-awesome/font-awesome.js"></script>

<font-awesome icon="fal fa-camera-retro fa-7x"></font-awesome>
```

### Using self-hosted assets

```bash
npm install @fortawesome/fontawesome-free
```

```html
<script>window.FontAwesome = { path: '/node_modules/@fortawesome/fontawesome-free' };</script>
<script type="module" src="/node_modules/@gluon/font-awesome/font-awesome.js"></script>

<font-awesome icon="fal fa-camera-retro fa-7x"></font-awesome>
```

## Installation

Gluon-font-awesome is available from [npm](https://www.npmjs.com) as `@gluon/font-awesome`

```bash
npm install @gluon/font-awesome
```

## Compatibility

Works on all modern browsers. The module imports `@gluon/gluon` with a bare specifier, so use a bundler
(such as Vite) or an import map when loading it directly in the browser.

## Development

```bash
npm install
npm run dev      # start the Vite dev server with the demo page (index.html)
npm run build    # build font-awesome.js (Vite library mode)
npm test         # run tests with Vitest
npm run release  # build and publish a new version with np
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright © 2017-present, Goffert van Gool
