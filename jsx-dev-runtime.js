/**
 * @typedef {import('xast').Element} Element
 * @typedef {import('xast').Root} Root
 * @typedef {import('./lib/index.js').XChild} XChild
 * @typedef {import('./lib/runtime.js').JSXProps} JSXProps
 */

import {jsx} from './jsx-runtime.js'

export const jsxDEV =
  /**
   * @type {{
   *   (name: null|undefined, props: {children?: XChild}, ...unused: unknown[]): Root
   *   (name: string, props: JSXProps, ...unused: unknown[]): Element
   * }}
   */
  (
    function (name, props) {
      return jsx(/** @type {string} */ (name), props)
    }
  )
export {Fragment} from './jsx-runtime.js'
