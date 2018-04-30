import { html, GluonElement } from '../node_modules/gluonjs/gluon.js';

const webfontsPath = 'https://use.fontawesome.com/releases/v5.0.10/webfonts/';
const cssPath = 'https://use.fontawesome.com/releases/v5.0.10/css/all.css';

// We have to place @font-face definitions in the global space. This is the CSS text for the @font-face definitions.
const styleText = document.createTextNode(`
  /*!
  * Font Awesome Free 5.0.10 by @fontawesome - https://fontawesome.com
  * License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  */
  @font-face {
    font-family: Font Awesome\\ 5 Brands;
    font-style: normal;
    font-weight: 400;
    src: url(${webfontsPath}fa-brands-400.eot);
    src: url(${webfontsPath}fa-brands-400.eot?#iefix) format('embedded-opentype'), url(${webfontsPath}fa-brands-400.woff2) format('woff2'),
      url(${webfontsPath}fa-brands-400.woff) format('woff'), url(fonts/font-awesome/fa-brands-400.ttf) format('truetype'),
      url(${webfontsPath}fa-brands-400.svg#fontawesome) format('svg');
  }
  @font-face {
    font-family: Font Awesome\\ 5 Free;
    font-style: normal;
    font-weight: 400;
    src: url(${webfontsPath}fa-regular-400.eot);
    src: url(${webfontsPath}fa-regular-400.eot?#iefix) format('embedded-opentype'), url(${webfontsPath}fa-regular-400.woff2) format('woff2'),
      url(${webfontsPath}fa-regular-400.woff) format('woff'), url(${webfontsPath}fa-regular-400.ttf) format('truetype'),
      url(${webfontsPath}fa-regular-400.svg#fontawesome) format('svg');
  }
  @font-face {
    font-family: Font Awesome\\ 5 Free;
    font-style: normal;
    font-weight: 900;
    src: url(${webfontsPath}fa-solid-900.eot);
    src: url(${webfontsPath}fa-solid-900.eot?#iefix) format('embedded-opentype'), url(${webfontsPath}fa-solid-900.woff2) format('woff2'),
      url(${webfontsPath}fa-solid-900.woff) format('woff'), url(${webfontsPath}fa-solid-900.ttf) format('truetype'),
      url(${webfontsPath}fa-solid-900.svg#fontawesome) format('svg');
  }
`);

// Here we create a <style> node in the document head with the above text as content.
const style = document.createElement('style');
style.appendChild(styleText);
document.head.appendChild(style);

// This is our new FontAwesome WebComponent
class FontAwesome extends GluonElement {
  get template() {
    return html`
      <link rel="stylesheet" href="${cssPath}" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
      <i id="icon" class$=${this.icon}></i>
    `;
  }

  // Set the 'icon' attribute like you would use <i class="[font-awesome options]">
  static get observedAttributes() {
    return ['icon'];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
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
