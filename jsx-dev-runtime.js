/**
 * @typedef {import('xast').Element} Element
 * @typedef {import('xast').Root} Root
 * @typedef {import('./lib/index.js').XChild} XChild
 * @typedef {import('./lib/runtime.js').JSXProps} JSXProps
 */

import {jsx} from './jsx-runtime.js'

export {Fragment} from './jsx-runtime.js'

// eslint-disable-next-line unicorn/prefer-export-from
export const jsxDEV =
  /**
   * @type {{
   *   (name: null|undefined, props: {children?: XChild}, ...unused: unknown[]): Root
   *   (name: string, props: JSXProps, ...unused: unknown[]): Element
   * }}
   */
  (jsx)
