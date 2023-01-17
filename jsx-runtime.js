/**
 * @typedef {import('./lib/runtime.js').JSXProps}} JSXProps
 */

// Export `JSX` as a global for TypeScript.
export * from './lib/jsx-automatic.js'

export {jsx, jsxs, Fragment} from './lib/runtime.js'
