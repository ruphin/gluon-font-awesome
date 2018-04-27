# gluon-font-awesome

[![NPM Latest version](https://img.shields.io/npm/v/gluon-font-awesome.svg)](https://www.npmjs.com/package/gluon-font-awesome)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

_A lightweight Web Component wrapper for Font Awesome_

## Examples

Simple usage:

```html
<script type="module" src="/node_modules/gluon-font-awesome/fontAwesome.js"></script>

<font-awesome icon="fas fa-camera-retro fa-7x"></font-awesome>
```

Easy to use in other Web Components:

```javascript
import { GluonElement, html } from '/node_modules/gluonjs/gluon.js';
import '/node_modules/gluon-font-awesome/fontAwesome.js';

class MyElement extends GluonElement {
  get template() {
    return html`<font-awesome icon="fas fa-camera-retro"></font-awesome><span>With some text!</span>`;
  }
}

customElements.define(MyElement.is, MyElement);
```

## Installation

Gluon-font-awesome is available through [npm](https://www.npmjs.com) as `gluon-font-awesome`.
See `rollup.config.js` and `index.html` for bundling and cross-browser compatibility.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright © 2017-present, Goffert van Gool
