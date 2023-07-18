/**
 * @typedef {import('./index.js').Child} Child
 * @typedef {import('./index.js').Element} Element
 * @typedef {import('./index.js').Root} Root
 * @typedef {import('./index.js').Value} Value
 */

/**
 * @typedef {{[x: string]: Child | Value}} JSXProps
 */

import {x} from './index.js'

/**
 * Create XML trees in xast through JSX.
 *
 * @overload
 * @param {null} name
 * @param {{children?: Child}} props
 * @param {string} [key]
 * @returns {Root}
 *
 * @overload
 * @param {string} name
 * @param {JSXProps} props
 * @param {string} [key]
 * @returns {Element}
 *
 * @param {string | null}  name
 *   Qualified name.
 *
 *   Case sensitive and can contain a namespace prefix (such as `rdf:RDF`).
 *   When string, an `Element` is built.
 *   When nullish, a `Root` is built instead.
 * @param {JSXProps}  props
 *   Map of attributes.
 *
 *   Nullish (`null` or `undefined`) or `NaN` values are ignored, other values
 *   are turned to strings.
 *
 *   Cannot be given if building a `Root`.
 *   Cannot be omitted when building an `Element` if the first child is a
 *   `Node`.
 * @param {string | null | undefined}  [_key]
 *   Key (not used).
 * @returns {Element | Root}
 *   Result.
 */
export function jsx(name, props, _key) {
  const {children, ...properties} = props
  return name === null
    ? x(name, children)
    : // @ts-expect-error: overloads are complex.
      x(name, properties, children)
}

export const jsxs = jsx

export const Fragment = null
