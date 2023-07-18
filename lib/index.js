/**
 * @typedef {import('xast').Element} Element
 * @typedef {import('xast').Nodes} Nodes
 * @typedef {import('xast').Root} Root
 */

/**
 * @typedef {Element | Root} Result
 *   Result from a `x` call.
 *
 * @typedef {boolean | number | string | null | undefined} Value
 *   Attribute value
 *
 * @typedef {{[attribute: string]: Value}} Attributes
 *   Acceptable value for element properties.
 *
 * @typedef {boolean | number | string | null | undefined} PrimitiveChild
 *   Primitive children, either ignored (nullish), or turned into text nodes.
 * @typedef {Array<Nodes | PrimitiveChild>} ArrayChild
 *   List of children.
 * @typedef {Nodes | PrimitiveChild | ArrayChild} Child
 *   Acceptable child value.
 */

// Define JSX.

/**
 * @typedef {import('./jsx-classic.js').Element} x.JSX.Element
 * @typedef {import('./jsx-classic.js').IntrinsicAttributes} x.JSX.IntrinsicAttributes
 * @typedef {import('./jsx-classic.js').IntrinsicElements} x.JSX.IntrinsicElements
 * @typedef {import('./jsx-classic.js').ElementChildrenAttribute} x.JSX.ElementChildrenAttribute
 */

/**
 * Create XML trees in xast.
 *
 * @param name
 *   Qualified name.
 *
 *   Case sensitive and can contain a namespace prefix (such as `rdf:RDF`).
 *   When string, an `Element` is built.
 *   When nullish, a `Root` is built instead.
 * @param attributes
 *   Attributes of the element or first child.
 * @param children
 *   Children of the node.
 * @returns
 *   `Element` or `Root`.
 */
export const x =
  // Note: not yet possible to use the spread `...children` in JSDoc overloads.
  /**
   * @type {{
   *   (): Root
   *   (name: null | undefined, ...children: Array<Child>): Root
   *   (name: string, attributes?: Attributes, ...children: Array<Child>): Element
   *   (name: string, ...children: Array<Child>): Element
   * }}
   */
  (
    /**
     * @param {string | null | undefined} [name]
     * @param {Attributes | Child | null | undefined} [attributes]
     * @param {Array<Child>} children
     * @returns {Result}
     */
    function (name, attributes, ...children) {
      let index = -1
      /** @type {Result} */
      let node

      if (name === undefined || name === null) {
        node = {type: 'root', children: []}
        // @ts-expect-error: Root builder doesn’t accept attributes.
        children.unshift(attributes)
      } else if (typeof name === 'string') {
        node = {type: 'element', name, attributes: {}, children: []}

        if (isAttributes(attributes)) {
          /** @type {string} */
          let key

          for (key in attributes) {
            // Ignore nullish and NaN values.
            if (
              attributes[key] !== undefined &&
              attributes[key] !== null &&
              (typeof attributes[key] !== 'number' ||
                !Number.isNaN(attributes[key]))
            ) {
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
 * Add children.
 *
 * @param {Array<Child>} nodes
 *   List of nodes.
 * @param {Child} value
 *   Child.
 * @returns {undefined}
 *   Nothing.
 */
function addChild(nodes, value) {
  let index = -1

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
 * Check if `value` is `Attributes`.
 *
 * @param {Attributes | Child} value
 *   Value.
 * @returns {value is Attributes}
 *   Whether `value` is `Attributes`.
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
