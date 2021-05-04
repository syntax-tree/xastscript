/**
 * @typedef {import('xast').Root} Root
 * @typedef {import('xast').Element} Element
 * @typedef {Root['children'][number]} Child
 * @typedef {Child|Root} Node
 * @typedef {Root|Element} XResult
 * @typedef {string|number|boolean|null|undefined} XValue
 * @typedef {{[attribute: string]: XValue}} XAttributes Attributes to support JS primitive types
 *
 * @typedef {string|number|null|undefined} XPrimitiveChild
 * @typedef {Array.<Node|XPrimitiveChild>} XArrayChild
 * @typedef {Node|XPrimitiveChild|XArrayChild} XChild
 * @typedef {import('./jsx-classic').Element} x.JSX.Element
 * @typedef {import('./jsx-classic').IntrinsicAttributes} x.JSX.IntrinsicAttributes
 * @typedef {import('./jsx-classic').IntrinsicElements} x.JSX.IntrinsicElements
 * @typedef {import('./jsx-classic').ElementChildrenAttribute} x.JSX.ElementChildrenAttribute
 */

/**
 * Create XML trees in xast.
 *
 * @param name Qualified name. Case sensitive and can contain a namespace prefix (such as `rdf:RDF`). Pass `null|undefined` to build a root.
 * @param attributes Map of attributes. Nullish (null or undefined) or NaN values are ignored, other values (strings, booleans) are cast to strings.
 * @param children (Lists of) child nodes. When strings are encountered, they are mapped to Text nodes.
 */
export const x =
  /**
   * @type {{
   *   (): Root
   *   (name: null|undefined, ...children: XChild[]): Root
   *   (name: string, attributes: XAttributes, ...children: XChild[]): Element
   *   (name: string, ...children: XChild[]): Element
   * }}
   */
  (
    /**
     * Hyperscript compatible DSL for creating virtual xast trees.
     *
     * @param {string|null} [name]
     * @param {XAttributes|XChild} [attributes]
     * @param {XChild[]} children
     * @returns {XResult}
     */
    function (name, attributes, ...children) {
      var index = -1
      /** @type {XResult} */
      var node
      /** @type {string} */
      var key

      if (name === undefined || name === null) {
        node = {type: 'root', children: []}
        // @ts-ignore Root builder doesn’t accept attributes.
        children.unshift(attributes)
      } else if (typeof name === 'string') {
        node = {type: 'element', name, attributes: {}, children: []}

        if (isAttributes(attributes)) {
          for (key in attributes) {
            // Ignore nullish and NaN values.
            if (
              attributes[key] !== undefined &&
              attributes[key] !== null &&
              (typeof attributes[key] !== 'number' ||
                !Number.isNaN(attributes[key]))
            ) {
              // @ts-ignore Pretty sure we just set it.
              node.attributes[key] = String(attributes[key])
            }
          }
        } else {
          children.unshift(attributes)
        }
      } else {
        throw new TypeError('Expected element name, got `' + name + '`')
      }

      // Handle children.
      while (++index < children.length) {
        addChild(node.children, children[index])
      }

      return node
    }
  )

/**
 * @param {Array.<Child>} nodes
 * @param {XChild} value
 */
function addChild(nodes, value) {
  var index = -1

  if (value === undefined || value === null) {
    // Empty.
  } else if (typeof value === 'string' || typeof value === 'number') {
    nodes.push({type: 'text', value: String(value)})
  } else if (Array.isArray(value)) {
    while (++index < value.length) {
      addChild(nodes, value[index])
    }
  } else if (typeof value === 'object' && 'type' in value) {
    if (value.type === 'root') {
      addChild(nodes, value.children)
    } else {
      nodes.push(value)
    }
  } else {
    throw new TypeError('Expected node, nodes, string, got `' + value + '`')
  }
}

/**
 * @param {XAttributes|XChild} value
 * @returns {value is XAttributes}
 */
function isAttributes(value) {
  if (
    value === null ||
    value === undefined ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    return false
  }

  return true
}
