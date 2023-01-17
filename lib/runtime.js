/**
 * @typedef {import('./index.js').Element} Element
 * @typedef {import('./index.js').Root} Root
 * @typedef {import('./index.js').Result} Result
 * @typedef {import('./index.js').Child} Child
 * @typedef {import('./index.js').Attributes} Attributes
 * @typedef {import('./index.js').Value} Value
 *
 * @typedef {{[x: string]: Value | Child}} JSXProps
 */

import {x} from './index.js'

/**
 * Create XML trees in xast through JSX.
 *
 * @param name
 *   Qualified name.
 *
 *   Case sensitive and can contain a namespace prefix (such as `rdf:RDF`).
 *   When string, an `Element` is built.
 *   When nullish, a `Root` is built instead.
 * @param props
 *   Map of attributes.
 *
 *   Nullish (`null` or `undefined`) or `NaN` values are ignored, other values
 *   are turned to strings.
 *
 *   Cannot be given if building a `Root`.
 *   Cannot be omitted when building an `Element` if the first child is a
 *   `Node`.
 */
export const jsx =
  /**
   * @type {{
   *   (name: null | undefined, props: {children?: Child}, key?: string): Root
   *   (name: string, props: JSXProps, key?: string): Element
   * }}
   */
  (
    /**
     * @param {string | null} name
     * @param {Attributes & {children?: Child}} props
     * @returns {Result}
     */
    function (name, props) {
      const {children, ...properties} = props
      return name === null ? x(name, children) : x(name, properties, children)
    }
  )

export const jsxs = jsx

export const Fragment = null
