import type {Attributes, Child, Result} from './index.js'

export namespace JSX {
  /**
   * This defines the return value of JSX syntax.
   */
  type Element = Result

  /**
   * This disallows the use of functional components.
   */
  type IntrinsicAttributes = never

  /**
   * This defines the prop types for known elements.
   *
   * For `xastscript` this defines any string may be used in combination with `xast` `Attributes`.
   *
   * This **must** be an interface.
   */
  interface IntrinsicElements {
    [name: string]:
      | Attributes
      | {
          /**
           * The prop that matches `ElementChildrenAttribute` key defines the type of JSX children, defines the children type.
           */
          children?: Child
        }
  }

  /**
   * The key of this interface defines as what prop children are passed.
   */
  interface ElementChildrenAttribute {
    /**
     * Only the key matters, not the value.
     */
    children?: never
  }
}
