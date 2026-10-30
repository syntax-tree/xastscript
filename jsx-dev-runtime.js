/**
 * @import {Element, Root} from 'xast'
 * @import {Child} from './lib/index.js'
 * @import {JSXProps} from './lib/runtime.js'
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
