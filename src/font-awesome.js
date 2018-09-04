import { html, GluonElement } from '../node_modules/@gluon/gluon/gluon.js';

const fontAwesomeVersion = 'v5.3.1';

const pro = window.FontAwesome && window.FontAwesome.pro;
const cdn = `https://${pro ? 'pro' : 'use'}.fontawesome.com/releases/${fontAwesomeVersion}`;

const path = (window.FontAwesome && window.FontAwesome.path) || cdn;

const cssPath = `${path}/css/all.css`;

// We have to place @font-face definitions in the global space. This creates the CSS text for the @font-face definitions
const fontFace = ({ name, weight, file }) => `
@font-face {
  font-family: '${name}';
  font-style: normal;
  font-weight: ${weight};
  src: url(${path}/webfonts/${file}.eot);
  src: url(${path}/webfonts/${file}.eot?#iefix) format('embedded-opentype'), url(${path}/webfonts/${file}.woff2) format('woff2'),
    url(${path}/webfonts/${file}.woff) format('woff'), url(${path}/webfonts/${file}.ttf) format('truetype'),
    url(${path}/webfonts/${file}.svg#fontawesome) format('svg');
}`;

// Create a textNode that contains the necessary @font-face definitions
const styleText = document.createTextNode(`
  /*!
  * Font Awesome ${fontAwesomeVersion} by @fontawesome - https://fontawesome.com
  * License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  */
  ${[
    { name: 'Font Awesome 5 Brands', weight: 'normal', file: 'fa-brands-400' },
    !pro && { name: 'Font Awesome 5 Free', weight: '400', file: 'fa-regular-400' },
    !pro && { name: 'Font Awesome 5 Free', weight: '900', file: 'fa-solid-900' },
    pro && { name: 'Font Awesome 5 Pro', weight: '300', file: 'fa-light-300' },
    pro && { name: 'Font Awesome 5 Pro', weight: '400', file: 'fa-regular-400' },
    pro && { name: 'Font Awesome 5 Pro', weight: '900', file: 'fa-solid-900' }
  ]
    .filter(Boolean)
    .map(fontFace)
    .join('')}
`);

// Create a <style> node in the document head with the generated @font-face definitions
const style = document.createElement('style');
style.appendChild(styleText);
document.head.appendChild(style);

// This is our new FontAwesome WebComponent
class FontAwesome extends GluonElement {
  get template() {
    return html`
      <style> :host {display: inline}</style>
      <link rel="stylesheet" href="${cssPath}" crossorigin="anonymous">
      <i id="icon" class$=${this.icon}></i>
    `;
  }

  // Set the 'icon' attribute like you would use <i class="[font-awesome options]">
  static get observedAttributes() {
    return ['icon'];
  }

  attributeChangedCallback(attr) {
    if (attr == 'icon') {
      this.render();
    }
  }

  // Change the icon with javaScript: fontAwesomeElement.icon = "far fa-bookmark";
  set icon(value) {
    this.setAttribute('icon', value);
  }

  get icon() {
    return this.getAttribute('icon');
  }
}

customElements.define(FontAwesome.is, FontAwesome);
