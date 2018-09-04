(function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};









var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// The first argument to JS template tags retain identity across multiple
// calls to a tag for the same literal, so we can cache work done per literal
// in a Map.
var templateCaches = new Map();
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */

/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */

/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
var TemplateResult = function () {
    function TemplateResult(strings, values, type) {
        var partCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultPartCallback;
        classCallCheck(this, TemplateResult);

        this.strings = strings;
        this.values = values;
        this.type = type;
        this.partCallback = partCallback;
    }
    /**
     * Returns a string of HTML used to create a <template> element.
     */


    createClass(TemplateResult, [{
        key: 'getHTML',
        value: function getHTML() {
            var l = this.strings.length - 1;
            var html = '';
            var isTextBinding = true;
            for (var i = 0; i < l; i++) {
                var s = this.strings[i];
                html += s;
                // We're in a text position if the previous string closed its tags.
                // If it doesn't have any tags, then we use the previous text position
                // state.
                var closing = findTagClose(s);
                isTextBinding = closing > -1 ? closing < s.length : isTextBinding;
                html += isTextBinding ? nodeMarker : marker;
            }
            html += this.strings[l];
            return html;
        }
    }, {
        key: 'getTemplateElement',
        value: function getTemplateElement() {
            var template = document.createElement('template');
            template.innerHTML = this.getHTML();
            return template;
        }
    }]);
    return TemplateResult;
}();
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTMl in an <svg> tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the <svg> tag so that
 * clones only container the original fragment.
 */
var SVGTemplateResult = function (_TemplateResult) {
    inherits(SVGTemplateResult, _TemplateResult);

    function SVGTemplateResult() {
        classCallCheck(this, SVGTemplateResult);
        return possibleConstructorReturn(this, (SVGTemplateResult.__proto__ || Object.getPrototypeOf(SVGTemplateResult)).apply(this, arguments));
    }

    createClass(SVGTemplateResult, [{
        key: 'getHTML',
        value: function getHTML() {
            return '<svg>' + get(SVGTemplateResult.prototype.__proto__ || Object.getPrototypeOf(SVGTemplateResult.prototype), 'getHTML', this).call(this) + '</svg>';
        }
    }, {
        key: 'getTemplateElement',
        value: function getTemplateElement() {
            var template = get(SVGTemplateResult.prototype.__proto__ || Object.getPrototypeOf(SVGTemplateResult.prototype), 'getTemplateElement', this).call(this);
            var content = template.content;
            var svgElement = content.firstChild;
            content.removeChild(svgElement);
            reparentNodes(content, svgElement.firstChild);
            return template;
        }
    }]);
    return SVGTemplateResult;
}(TemplateResult);
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */

/**
 * Renders a template to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result a TemplateResult created by evaluating a template tag like
 *     `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param templateFactory a function to create a Template or retreive one from
 *     cache.
 */

/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
var marker = '{{lit-' + String(Math.random()).slice(2) + '}}';
/**
 * An expression marker used text-positions, not attribute positions,
 * in template.
 */
var nodeMarker = '<!--' + marker + '-->';
var markerRegex = new RegExp(marker + '|' + nodeMarker);
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#attributes-0
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-character
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
var lastAttributeNameRegex = /[ \x09\x0a\x0c\x0d]([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)[ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*)$/;
/**
 * Finds the closing index of the last closed HTML tag.
 * This has 3 possible return values:
 *   - `-1`, meaning there is no tag in str.
 *   - `string.length`, meaning the last opened tag is unclosed.
 *   - Some positive number < str.length, meaning the index of the closing '>'.
 */
function findTagClose(str) {
    var close = str.lastIndexOf('>');
    var open = str.indexOf('<', close + 1);
    return open > -1 ? str.length : close;
}
/**
 * A placeholder for a dynamic expression in an HTML template.
 *
 * There are two built-in part types: AttributePart and NodePart. NodeParts
 * always represent a single dynamic expression, while AttributeParts may
 * represent as many expressions are contained in the attribute.
 *
 * A Template's parts are mutable, so parts can be replaced or modified
 * (possibly to implement different template semantics). The contract is that
 * parts can only be replaced, not removed, added or reordered, and parts must
 * always consume the correct number of values in their `update()` method.
 *
 * TODO(justinfagnani): That requirement is a little fragile. A
 * TemplateInstance could instead be more careful about which values it gives
 * to Part.update().
 */
var TemplatePart = function TemplatePart(type, index, name, rawName, strings) {
    classCallCheck(this, TemplatePart);

    this.type = type;
    this.index = index;
    this.name = name;
    this.rawName = rawName;
    this.strings = strings;
};
var isTemplatePartActive = function isTemplatePartActive(part) {
    return part.index !== -1;
};
/**
 * An updateable Template that tracks the location of dynamic parts.
 */
var Template = function Template(result, element) {
    classCallCheck(this, Template);

    this.parts = [];
    this.element = element;
    var content = this.element.content;
    // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
    var walker = document.createTreeWalker(content, 133 /* NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT |
                                                        NodeFilter.SHOW_TEXT */, null, false);
    var index = -1;
    var partIndex = 0;
    var nodesToRemove = [];
    // The actual previous node, accounting for removals: if a node is removed
    // it will never be the previousNode.
    var previousNode = void 0;
    // Used to set previousNode at the top of the loop.
    var currentNode = void 0;
    while (walker.nextNode()) {
        index++;
        previousNode = currentNode;
        var node = currentNode = walker.currentNode;
        if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (!node.hasAttributes()) {
                    continue;
                }
                var attributes = node.attributes;
                // Per https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                // attributes are not guaranteed to be returned in document order. In
                // particular, Edge/IE can return them out of order, so we cannot assume
                // a correspondance between part index and attribute index.
                var count = 0;
                for (var i = 0; i < attributes.length; i++) {
                    if (attributes[i].value.indexOf(marker) >= 0) {
                        count++;
                    }
                }
                while (count-- > 0) {
                    // Get the template literal section leading up to the first
                    // expression in this attribute
                    var stringForPart = result.strings[partIndex];
                    // Find the attribute name
                    var attributeNameInPart = lastAttributeNameRegex.exec(stringForPart)[1];
                    // Find the corresponding attribute
                    // TODO(justinfagnani): remove non-null assertion
                    var attribute = attributes.getNamedItem(attributeNameInPart);
                    var stringsForAttributeValue = attribute.value.split(markerRegex);
                    this.parts.push(new TemplatePart('attribute', index, attribute.name, attributeNameInPart, stringsForAttributeValue));
                    node.removeAttribute(attribute.name);
                    partIndex += stringsForAttributeValue.length - 1;
                }
            } else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                var nodeValue = node.nodeValue;
                if (nodeValue.indexOf(marker) < 0) {
                    continue;
                }
                var parent = node.parentNode;
                var strings = nodeValue.split(markerRegex);
                var lastIndex = strings.length - 1;
                // We have a part for each match found
                partIndex += lastIndex;
                // Generate a new text node for each literal section
                // These nodes are also used as the markers for node parts
                for (var _i = 0; _i < lastIndex; _i++) {
                    parent.insertBefore(strings[_i] === '' ? document.createComment('') : document.createTextNode(strings[_i]), node);
                    this.parts.push(new TemplatePart('node', index++));
                }
                parent.insertBefore(strings[lastIndex] === '' ? document.createComment('') : document.createTextNode(strings[lastIndex]), node);
                nodesToRemove.push(node);
            } else if (node.nodeType === 8 /* Node.COMMENT_NODE */ && node.nodeValue === marker) {
            var _parent = node.parentNode;
            // Add a new marker node to be the startNode of the Part if any of the
            // following are true:
            //  * We don't have a previousSibling
            //  * previousSibling is being removed (thus it's not the
            //    `previousNode`)
            //  * previousSibling is not a Text node
            //
            // TODO(justinfagnani): We should be able to use the previousNode here
            // as the marker node and reduce the number of extra nodes we add to a
            // template. See https://github.com/PolymerLabs/lit-html/issues/147
            var previousSibling = node.previousSibling;
            if (previousSibling === null || previousSibling !== previousNode || previousSibling.nodeType !== Node.TEXT_NODE) {
                _parent.insertBefore(document.createComment(''), node);
            } else {
                index--;
            }
            this.parts.push(new TemplatePart('node', index++));
            nodesToRemove.push(node);
            // If we don't have a nextSibling add a marker node.
            // We don't have to check if the next node is going to be removed,
            // because that node will induce a new marker if so.
            if (node.nextSibling === null) {
                _parent.insertBefore(document.createComment(''), node);
            } else {
                index--;
            }
            currentNode = previousNode;
            partIndex++;
        }
    }
    // Remove text binding nodes after the walk to not disturb the TreeWalker
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = nodesToRemove[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var n = _step.value;

            n.parentNode.removeChild(n);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};
/**
 * Returns a value ready to be inserted into a Part from a user-provided value.
 *
 * If the user value is a directive, this invokes the directive with the given
 * part. If the value is null, it's converted to undefined to work better
 * with certain DOM APIs, like textContent.
 */
var getValue = function getValue(part, value) {
    // `null` as the value of a Text node will render the string 'null'
    // so we convert it to undefined
    if (isDirective(value)) {
        value = value(part);
        return noChange;
    }
    return value === null ? undefined : value;
};

var isDirective = function isDirective(o) {
    return typeof o === 'function' && o.__litDirective === true;
};
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
var noChange = {};
var isPrimitiveValue = function isPrimitiveValue(value) {
    return value === null || !((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || typeof value === 'function');
};
var AttributePart = function () {
    function AttributePart(instance, element, name, strings) {
        classCallCheck(this, AttributePart);

        this.instance = instance;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.size = strings.length - 1;
        this._previousValues = [];
    }

    createClass(AttributePart, [{
        key: '_interpolate',
        value: function _interpolate(values, startIndex) {
            var strings = this.strings;
            var l = strings.length - 1;
            var text = '';
            for (var i = 0; i < l; i++) {
                text += strings[i];
                var v = getValue(this, values[startIndex + i]);
                if (v && v !== noChange && (Array.isArray(v) || typeof v !== 'string' && v[Symbol.iterator])) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = v[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var t = _step2.value;

                            // TODO: we need to recursively call getValue into iterables...
                            text += t;
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                } else {
                    text += v;
                }
            }
            return text + strings[l];
        }
    }, {
        key: '_equalToPreviousValues',
        value: function _equalToPreviousValues(values, startIndex) {
            for (var i = startIndex; i < startIndex + this.size; i++) {
                if (this._previousValues[i] !== values[i] || !isPrimitiveValue(values[i])) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'setValue',
        value: function setValue(values, startIndex) {
            if (this._equalToPreviousValues(values, startIndex)) {
                return;
            }
            var s = this.strings;
            var value = void 0;
            if (s.length === 2 && s[0] === '' && s[1] === '') {
                // An expression that occupies the whole attribute value will leave
                // leading and trailing empty strings.
                value = getValue(this, values[startIndex]);
                if (Array.isArray(value)) {
                    value = value.join('');
                }
            } else {
                value = this._interpolate(values, startIndex);
            }
            if (value !== noChange) {
                this.element.setAttribute(this.name, value);
            }
            this._previousValues = values;
        }
    }]);
    return AttributePart;
}();
var NodePart = function () {
    function NodePart(instance, startNode, endNode) {
        classCallCheck(this, NodePart);

        this.instance = instance;
        this.startNode = startNode;
        this.endNode = endNode;
        this._previousValue = undefined;
    }

    createClass(NodePart, [{
        key: 'setValue',
        value: function setValue(value) {
            value = getValue(this, value);
            if (value === noChange) {
                return;
            }
            if (isPrimitiveValue(value)) {
                // Handle primitive values
                // If the value didn't change, do nothing
                if (value === this._previousValue) {
                    return;
                }
                this._setText(value);
            } else if (value instanceof TemplateResult) {
                this._setTemplateResult(value);
            } else if (Array.isArray(value) || value[Symbol.iterator]) {
                this._setIterable(value);
            } else if (value instanceof Node) {
                this._setNode(value);
            } else if (value.then !== undefined) {
                this._setPromise(value);
            } else {
                // Fallback, will render the string representation
                this._setText(value);
            }
        }
    }, {
        key: '_insert',
        value: function _insert(node) {
            this.endNode.parentNode.insertBefore(node, this.endNode);
        }
    }, {
        key: '_setNode',
        value: function _setNode(value) {
            if (this._previousValue === value) {
                return;
            }
            this.clear();
            this._insert(value);
            this._previousValue = value;
        }
    }, {
        key: '_setText',
        value: function _setText(value) {
            var node = this.startNode.nextSibling;
            value = value === undefined ? '' : value;
            if (node === this.endNode.previousSibling && node.nodeType === Node.TEXT_NODE) {
                // If we only have a single text node between the markers, we can just
                // set its value, rather than replacing it.
                // TODO(justinfagnani): Can we just check if _previousValue is
                // primitive?
                node.textContent = value;
            } else {
                this._setNode(document.createTextNode(value));
            }
            this._previousValue = value;
        }
    }, {
        key: '_setTemplateResult',
        value: function _setTemplateResult(value) {
            var template = this.instance._getTemplate(value);
            var instance = void 0;
            if (this._previousValue && this._previousValue.template === template) {
                instance = this._previousValue;
            } else {
                instance = new TemplateInstance(template, this.instance._partCallback, this.instance._getTemplate);
                this._setNode(instance._clone());
                this._previousValue = instance;
            }
            instance.update(value.values);
        }
    }, {
        key: '_setIterable',
        value: function _setIterable(value) {
            // For an Iterable, we create a new InstancePart per item, then set its
            // value to the item. This is a little bit of overhead for every item in
            // an Iterable, but it lets us recurse easily and efficiently update Arrays
            // of TemplateResults that will be commonly returned from expressions like:
            // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
            // If _previousValue is an array, then the previous render was of an
            // iterable and _previousValue will contain the NodeParts from the previous
            // render. If _previousValue is not an array, clear this part and make a new
            // array for NodeParts.
            if (!Array.isArray(this._previousValue)) {
                this.clear();
                this._previousValue = [];
            }
            // Lets us keep track of how many items we stamped so we can clear leftover
            // items from a previous render
            var itemParts = this._previousValue;
            var partIndex = 0;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = value[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    // Try to reuse an existing part
                    var itemPart = itemParts[partIndex];
                    // If no existing part, create a new one
                    if (itemPart === undefined) {
                        // If we're creating the first item part, it's startNode should be the
                        // container's startNode
                        var itemStart = this.startNode;
                        // If we're not creating the first part, create a new separator marker
                        // node, and fix up the previous part's endNode to point to it
                        if (partIndex > 0) {
                            var previousPart = itemParts[partIndex - 1];
                            itemStart = previousPart.endNode = document.createTextNode('');
                            this._insert(itemStart);
                        }
                        itemPart = new NodePart(this.instance, itemStart, this.endNode);
                        itemParts.push(itemPart);
                    }
                    itemPart.setValue(item);
                    partIndex++;
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            if (partIndex === 0) {
                this.clear();
                this._previousValue = undefined;
            } else if (partIndex < itemParts.length) {
                var lastPart = itemParts[partIndex - 1];
                // Truncate the parts array so _previousValue reflects the current state
                itemParts.length = partIndex;
                this.clear(lastPart.endNode.previousSibling);
                lastPart.endNode = this.endNode;
            }
        }
    }, {
        key: '_setPromise',
        value: function _setPromise(value) {
            var _this2 = this;

            this._previousValue = value;
            value.then(function (v) {
                if (_this2._previousValue === value) {
                    _this2.setValue(v);
                }
            });
        }
    }, {
        key: 'clear',
        value: function clear() {
            var startNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.startNode;

            removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
        }
    }]);
    return NodePart;
}();
var defaultPartCallback = function defaultPartCallback(instance, templatePart, node) {
    if (templatePart.type === 'attribute') {
        return new AttributePart(instance, node, templatePart.name, templatePart.strings);
    } else if (templatePart.type === 'node') {
        return new NodePart(instance, node, node.nextSibling);
    }
    throw new Error('Unknown part type ' + templatePart.type);
};
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
var TemplateInstance = function () {
    function TemplateInstance(template, partCallback, getTemplate) {
        classCallCheck(this, TemplateInstance);

        this._parts = [];
        this.template = template;
        this._partCallback = partCallback;
        this._getTemplate = getTemplate;
    }

    createClass(TemplateInstance, [{
        key: 'update',
        value: function update(values) {
            var valueIndex = 0;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this._parts[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var part = _step4.value;

                    if (!part) {
                        valueIndex++;
                    } else if (part.size === undefined) {
                        part.setValue(values[valueIndex]);
                        valueIndex++;
                    } else {
                        part.setValue(values, valueIndex);
                        valueIndex += part.size;
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: '_clone',
        value: function _clone() {
            // Clone the node, rather than importing it, to keep the fragment in the
            // template's document. This leaves the fragment inert so custom elements
            // won't upgrade until after the main document adopts the node.
            var fragment = this.template.element.content.cloneNode(true);
            var parts = this.template.parts;
            if (parts.length > 0) {
                // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
                // null
                var _walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT |
                                                                      NodeFilter.SHOW_TEXT */, null, false);
                var _index = -1;
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    var partActive = isTemplatePartActive(part);
                    // An inactive part has no coresponding Template node.
                    if (partActive) {
                        while (_index < part.index) {
                            _index++;
                            _walker.nextNode();
                        }
                    }
                    this._parts.push(partActive ? this._partCallback(this, part, _walker.currentNode) : undefined);
                }
            }
            return fragment;
        }
    }]);
    return TemplateInstance;
}();
/**
 * Reparents nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), into another container (could be the same container), before
 * `beforeNode`. If `beforeNode` is null, it appends the nodes to the
 * container.
 */
var reparentNodes = function reparentNodes(container, start) {
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var before = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var node = start;
    while (node !== end) {
        var n = node.nextSibling;
        container.insertBefore(node, before);
        node = n;
    }
};
/**
 * Removes nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), from `container`.
 */
var removeNodes = function removeNodes(container, startNode) {
    var endNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var node = startNode;
    while (node !== endNode) {
        var n = node.nextSibling;
        container.removeChild(node);
        node = n;
    }
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var walkerNodeFilter = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1, removed 4 nodes)
 */
function removeNodesFromTemplate(template, nodesToRemove) {
    var content = template.element.content,
        parts = template.parts;

    var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    var partIndex = 0;
    var part = parts[0];
    var nodeIndex = -1;
    var removeCount = 0;
    var nodesToRemoveInTemplate = [];
    var currentRemovingNode = null;
    while (walker.nextNode()) {
        nodeIndex++;
        var node = walker.currentNode;
        // End removal if stepped past the removing node
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        // A node to remove was found in the template
        if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node);
            // Track node we're removing
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        // When removing, increment count by which to adjust subsequent part indices
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            part = parts[++partIndex];
        }
    }
    nodesToRemoveInTemplate.forEach(function (n) {
        return n.parentNode.removeChild(n);
    });
}
var countNodes = function countNodes(node) {
    var count = 1;
    var walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
    while (walker.nextNode()) {
        count++;
    }
    return count;
};
var nextActiveIndexInTemplateParts = function nextActiveIndexInTemplateParts(parts) {
    var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

    for (var i = startIndex + 1; i < parts.length; i++) {
        var part = parts[i];
        if (isTemplatePartActive(part)) {
            return i;
        }
    }
    return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function insertNodeIntoTemplate(template, node) {
    var refNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var content = template.element.content,
        parts = template.parts;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.

    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    var partIndex = nextActiveIndexInTemplateParts(parts);
    var insertCount = 0;
    var walkerIndex = -1;
    while (walker.nextNode()) {
        walkerIndex++;
        var walkerNode = walker.currentNode;
        if (walkerNode === refNode) {
            refNode.parentNode.insertBefore(node, refNode);
            insertCount = countNodes(node);
        }
        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
                while (partIndex !== -1) {
                    parts[partIndex].index += insertCount;
                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                }
                return;
            }
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }
    }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// Get a key to lookup in `templateCaches`.
var getTemplateCacheKey = function getTemplateCacheKey(type, scopeName) {
    return type + '--' + scopeName;
};
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
var shadyTemplateFactory = function shadyTemplateFactory(scopeName) {
    return function (result) {
        var cacheKey = getTemplateCacheKey(result.type, scopeName);
        var templateCache = templateCaches.get(cacheKey);
        if (templateCache === undefined) {
            templateCache = new Map();
            templateCaches.set(cacheKey, templateCache);
        }
        var template = templateCache.get(result.strings);
        if (template === undefined) {
            var element = result.getTemplateElement();
            if (_typeof(window.ShadyCSS) === 'object') {
                window.ShadyCSS.prepareTemplateDom(element, scopeName);
            }
            template = new Template(result, element);
            templateCache.set(result.strings, template);
        }
        return template;
    };
};
var TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */
function removeStylesFromLitTemplates(scopeName) {
    TEMPLATE_TYPES.forEach(function (type) {
        var templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.forEach(function (template) {
                var content = template.element.content;

                var styles = content.querySelectorAll('style');
                removeNodesFromTemplate(template, new Set(Array.from(styles)));
            });
        }
    });
}
var shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered output.
 */
var ensureStylesScoped = function ensureStylesScoped(fragment, template, scopeName) {
    // only scope element template once per scope name
    if (!shadyRenderSet.has(scopeName)) {
        shadyRenderSet.add(scopeName);
        var styleTemplate = document.createElement('template');
        Array.from(fragment.querySelectorAll('style')).forEach(function (s) {
            styleTemplate.content.appendChild(s);
        });
        window.ShadyCSS.prepareTemplateStyles(styleTemplate, scopeName);
        // Fix templates: note the expectation here is that the given `fragment`
        // has been generated from the given `template` which contains
        // the set of templates rendered into this scope.
        // It is only from this set of initial templates from which styles
        // will be scoped and removed.
        removeStylesFromLitTemplates(scopeName);
        // ApplyShim case
        if (window.ShadyCSS.nativeShadow) {
            var style = styleTemplate.content.querySelector('style');
            if (style !== null) {
                // Insert style into rendered fragment
                fragment.insertBefore(style, fragment.firstChild);
                // Insert into lit-template (for subsequent renders)
                insertNodeIntoTemplate(template, style.cloneNode(true), template.element.content.firstChild);
            }
        }
    }
};
// NOTE: We're copying code from lit-html's `render` method here.
// We're doing this explicitly because the API for rendering templates is likely
// to change in the near term.
function render$1(result, container, scopeName) {
    var templateFactory = shadyTemplateFactory(scopeName);
    var template = templateFactory(result);
    var instance = container.__templateInstance;
    // Repeat render, just call update()
    if (instance !== undefined && instance.template === template && instance._partCallback === result.partCallback) {
        instance.update(result.values);
        return;
    }
    // First render, create a new TemplateInstance and append it
    instance = new TemplateInstance(template, result.partCallback, templateFactory);
    container.__templateInstance = instance;
    var fragment = instance._clone();
    instance.update(result.values);
    var host = container instanceof ShadowRoot ? container.host : undefined;
    // If there's a shadow host, do ShadyCSS scoping...
    if (host !== undefined && _typeof(window.ShadyCSS) === 'object') {
        ensureStylesScoped(fragment, template, scopeName);
        window.ShadyCSS.styleElement(host);
    }
    removeNodes(container, container.firstChild);
    container.appendChild(fragment);
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Interprets a template literal as a lit-extended HTML template.
 */
var html$1 = function html$$1(strings) {
    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
    }

    return new TemplateResult(strings, values, 'html', extendedPartCallback);
};
/**
 * Interprets a template literal as a lit-extended SVG template.
 */

/**
 * A PartCallback which allows templates to set properties and declarative
 * event handlers.
 *
 * Properties are set by default, instead of attributes. Attribute names in
 * lit-html templates preserve case, so properties are case sensitive. If an
 * expression takes up an entire attribute value, then the property is set to
 * that value. If an expression is interpolated with a string or other
 * expressions then the property is set to the string result of the
 * interpolation.
 *
 * To set an attribute instead of a property, append a `$` suffix to the
 * attribute name.
 *
 * Example:
 *
 *     html`<button class$="primary">Buy Now</button>`
 *
 * To set an event handler, prefix the attribute name with `on-`:
 *
 * Example:
 *
 *     html`<button on-click=${(e)=> this.onClickHandler(e)}>Buy Now</button>`
 *
 */
var extendedPartCallback = function extendedPartCallback(instance, templatePart, node) {
    if (templatePart.type === 'attribute') {
        if (templatePart.rawName.substr(0, 3) === 'on-') {
            var eventName = templatePart.rawName.slice(3);
            return new EventPart(instance, node, eventName);
        }
        var lastChar = templatePart.name.substr(templatePart.name.length - 1);
        if (lastChar === '$') {
            var name = templatePart.name.slice(0, -1);
            return new AttributePart(instance, node, name, templatePart.strings);
        }
        if (lastChar === '?') {
            var _name = templatePart.name.slice(0, -1);
            return new BooleanAttributePart(instance, node, _name, templatePart.strings);
        }
        return new PropertyPart(instance, node, templatePart.rawName, templatePart.strings);
    }
    return defaultPartCallback(instance, templatePart, node);
};
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
var BooleanAttributePart = function (_AttributePart) {
    inherits(BooleanAttributePart, _AttributePart);

    function BooleanAttributePart() {
        classCallCheck(this, BooleanAttributePart);
        return possibleConstructorReturn(this, (BooleanAttributePart.__proto__ || Object.getPrototypeOf(BooleanAttributePart)).apply(this, arguments));
    }

    createClass(BooleanAttributePart, [{
        key: 'setValue',
        value: function setValue(values, startIndex) {
            var s = this.strings;
            if (s.length === 2 && s[0] === '' && s[1] === '') {
                var value = getValue(this, values[startIndex]);
                if (value === noChange) {
                    return;
                }
                if (value) {
                    this.element.setAttribute(this.name, '');
                } else {
                    this.element.removeAttribute(this.name);
                }
            } else {
                throw new Error('boolean attributes can only contain a single expression');
            }
        }
    }]);
    return BooleanAttributePart;
}(AttributePart);
var PropertyPart = function (_AttributePart2) {
    inherits(PropertyPart, _AttributePart2);

    function PropertyPart() {
        classCallCheck(this, PropertyPart);
        return possibleConstructorReturn(this, (PropertyPart.__proto__ || Object.getPrototypeOf(PropertyPart)).apply(this, arguments));
    }

    createClass(PropertyPart, [{
        key: 'setValue',
        value: function setValue(values, startIndex) {
            var s = this.strings;
            var value = void 0;
            if (this._equalToPreviousValues(values, startIndex)) {
                return;
            }
            if (s.length === 2 && s[0] === '' && s[1] === '') {
                // An expression that occupies the whole attribute value will leave
                // leading and trailing empty strings.
                value = getValue(this, values[startIndex]);
            } else {
                // Interpolation, so interpolate
                value = this._interpolate(values, startIndex);
            }
            if (value !== noChange) {
                this.element[this.name] = value;
            }
            this._previousValues = values;
        }
    }]);
    return PropertyPart;
}(AttributePart);
var EventPart = function () {
    function EventPart(instance, element, eventName) {
        classCallCheck(this, EventPart);

        this.instance = instance;
        this.element = element;
        this.eventName = eventName;
    }

    createClass(EventPart, [{
        key: 'setValue',
        value: function setValue(value) {
            var listener = getValue(this, value);
            if (listener === this._listener) {
                return;
            }
            if (listener == null) {
                this.element.removeEventListener(this.eventName, this);
            } else if (this._listener == null) {
                this.element.addEventListener(this.eventName, this);
            }
            this._listener = listener;
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(event) {
            if (typeof this._listener === 'function') {
                this._listener.call(this.element, event);
            } else if (typeof this._listener.handleEvent === 'function') {
                this._listener.handleEvent(event);
            }
        }
    }]);
    return EventPart;
}();

/**
 * @license
 * MIT License
 *
 * Copyright (c) 2017 Goffert van Gool
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// Key to store the HTML tag in a custom element class
var TAG = Symbol('tag');

// Key to store render status in a custom element instance
var NEEDSRENDER = Symbol('needsRender');

// Transforms a camelCased string into a kebab-cased string
var camelToKebab = function camelToKebab(camel) {
  return camel.replace(/([a-z](?=[A-Z]))|([A-Z](?=[A-Z][a-z]))/g, '$1$2-').toLowerCase();
};

// Creates an ID cache in the `$` property of a custom element instance
var createIdCache = function createIdCache(element) {
  element.$ = {};
  element.shadowRoot.querySelectorAll('[id]').forEach(function (node) {
    element.$[node.id] = node;
  });
};

/**
 * A lightweight base class for custom elements
 *
 * Features:
 *
 *  - Determines an appropriate HTML tagname based on an element's class name
 *  - Efficient rendering engine using lit-html (https://github.com/Polymer/lit-html)
 *  - Creates a cache for descendant nodes with an `id` in the `$` property
 */
var GluonElement = function (_HTMLElement) {
  inherits(GluonElement, _HTMLElement);

  function GluonElement() {
    classCallCheck(this, GluonElement);
    return possibleConstructorReturn(this, (GluonElement.__proto__ || Object.getPrototypeOf(GluonElement)).apply(this, arguments));
  }

  createClass(GluonElement, [{
    key: 'connectedCallback',


    /**
     * Called when an element is connected to the DOM
     *
     * When an element has a `template`, attach a shadowRoot to the element,
     * and render the template. Once the template is rendered, creates an ID cache
     * in the `$` property
     *
     * When adding a `connectedCallback` to your custom element, you should call
     * `super.connectedCallback()` before doing anything other than actions
     * that alter the result of the template rendering.
     */
    value: function connectedCallback() {
      if ('template' in this) {
        this.attachShadow({ mode: 'open' });
        this.render({ sync: true });
        createIdCache(this);
      }
    }

    /**
     * Renders the template for this element into the shadowRoot
     *
     * @param { sync }: perform a synchronous (blocking) render. The default render
     *     is asynchronous, and multiple calls to `render()` are batched by default
     *
     * @returns a Promise that resolves once template has been rendered
     */

  }, {
    key: 'render',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$sync = _ref2.sync,
            sync = _ref2$sync === undefined ? false : _ref2$sync;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this[NEEDSRENDER] = true;

                if (sync) {
                  _context.next = 4;
                  break;
                }

                _context.next = 4;
                return 0;

              case 4:
                if (this[NEEDSRENDER]) {
                  this[NEEDSRENDER] = false;
                  render$1(this.template, this.shadowRoot, this.constructor.is);
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function render$$1() {
        return _ref.apply(this, arguments);
      }

      return render$$1;
    }()
  }], [{
    key: 'is',

    /**
     * Returns the HTML tagname for elements of this class
     *
     * It defaults to the kebab-cased version of the class name. To override,
     * defined a `static get is()` property on your custom element class, and return
     * whatever string you want to use for the HTML tagname
     */
    get: function get$$1() {
      return this.hasOwnProperty(TAG) && this[TAG] || (this[TAG] = camelToKebab(this.name));
    }
  }]);
  return GluonElement;
}(HTMLElement);

var _templateObject = taggedTemplateLiteral(['\n      <style> :host {display: inline}</style>\n      <link rel="stylesheet" href="', '" crossorigin="anonymous">\n      <i id="icon" class$=', '></i>\n    '], ['\n      <style> :host {display: inline}</style>\n      <link rel="stylesheet" href="', '" crossorigin="anonymous">\n      <i id="icon" class$=', '></i>\n    ']);

var fontAwesomeVersion = 'v5.3.1';

var pro = window.FontAwesome && window.FontAwesome.pro;
var cdn = 'https://' + (pro ? 'pro' : 'use') + '.fontawesome.com/releases/' + fontAwesomeVersion;

var path = window.FontAwesome && window.FontAwesome.path || cdn;

var cssPath = path + '/css/all.css';

// We have to place @font-face definitions in the global space. This creates the CSS text for the @font-face definitions
var fontFace = function fontFace(_ref) {
  var name = _ref.name,
      weight = _ref.weight,
      file = _ref.file;
  return '\n@font-face {\n  font-family: \'' + name + '\';\n  font-style: normal;\n  font-weight: ' + weight + ';\n  src: url(' + path + '/webfonts/' + file + '.eot);\n  src: url(' + path + '/webfonts/' + file + '.eot?#iefix) format(\'embedded-opentype\'), url(' + path + '/webfonts/' + file + '.woff2) format(\'woff2\'),\n    url(' + path + '/webfonts/' + file + '.woff) format(\'woff\'), url(' + path + '/webfonts/' + file + '.ttf) format(\'truetype\'),\n    url(' + path + '/webfonts/' + file + '.svg#fontawesome) format(\'svg\');\n}';
};

// Create a textNode that contains the necessary @font-face definitions
var styleText = document.createTextNode('\n  /*!\n  * Font Awesome ' + fontAwesomeVersion + ' by @fontawesome - https://fontawesome.com\n  * License - https://fontawesome.com/license (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n  */\n  ' + [{ name: 'Font Awesome 5 Brands', weight: 'normal', file: 'fa-brands-400' }, !pro && { name: 'Font Awesome 5 Free', weight: '400', file: 'fa-regular-400' }, !pro && { name: 'Font Awesome 5 Free', weight: '900', file: 'fa-solid-900' }, pro && { name: 'Font Awesome 5 Pro', weight: '300', file: 'fa-light-300' }, pro && { name: 'Font Awesome 5 Pro', weight: '400', file: 'fa-regular-400' }, pro && { name: 'Font Awesome 5 Pro', weight: '900', file: 'fa-solid-900' }].filter(Boolean).map(fontFace).join('') + '\n');

// Create a <style> node in the document head with the generated @font-face definitions
var style = document.createElement('style');
style.appendChild(styleText);
document.head.appendChild(style);

// This is our new FontAwesome WebComponent

var FontAwesome = function (_GluonElement) {
  inherits(FontAwesome, _GluonElement);

  function FontAwesome() {
    classCallCheck(this, FontAwesome);
    return possibleConstructorReturn(this, (FontAwesome.__proto__ || Object.getPrototypeOf(FontAwesome)).apply(this, arguments));
  }

  createClass(FontAwesome, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attr) {
      if (attr == 'icon') {
        this.render();
      }
    }

    // Change the icon with javaScript: fontAwesomeElement.icon = "far fa-bookmark";

  }, {
    key: 'template',
    get: function get$$1() {
      return html$1(_templateObject, cssPath, this.icon);
    }

    // Set the 'icon' attribute like you would use <i class="[font-awesome options]">

  }, {
    key: 'icon',
    set: function set$$1(value) {
      this.setAttribute('icon', value);
    },
    get: function get$$1() {
      return this.getAttribute('icon');
    }
  }], [{
    key: 'observedAttributes',
    get: function get$$1() {
      return ['icon'];
    }
  }]);
  return FontAwesome;
}(GluonElement);

customElements.define(FontAwesome.is, FontAwesome);

}());
