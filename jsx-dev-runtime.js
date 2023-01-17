/**
 * @typedef {import('xast').Element} Element
 * @typedef {import('xast').Root} Root
 * @typedef {import('./lib/index.js').Child} Child
 * @typedef {import('./lib/runtime.js').JSXProps} JSXProps
 */

import {jsx} from './lib/runtime.js'

// Export `JSX` as a global for TypeScript.
export * from './lib/jsx-automatic.js'

export {Fragment} from './jsx-runtime.js'

// eslint-disable-next-line unicorn/prefer-export-from
export const jsxDEV =
  /**
   * @type {{
   *   (name: null | undefined, props: {children?: Child}, key?: string, ...unused: Array<unknown>): Root
   *   (name: string, props: JSXProps, key?: string, ...unused: Array<unknown>): Element
   * }}
   */
  (jsx)
