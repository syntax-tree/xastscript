// TypeScript Version: 3.7

import * as xast from 'xast'

type Children = string | xast.Node | number | Children[]

type Primitive = null | undefined | string | number

/**
 * Extending Attributes to Support JS Primitive Types
 */
type Attributes = Record<string, Primitive>

/**
 * Create XML trees in xast.
 *
 * @param name Qualified name. Case sensitive and can contain a namespace prefix (such as rdf:RDF).
 * @param children (Lists of) child nodes. When strings are encountered, they are mapped to Text nodes.
 */
declare function xastscript(name: string, ...children: Children[]): xast.Element

/**
 * Create XML trees in xast.
 *
 * @param name Qualified name. Case sensitive and can contain a namespace prefix (such as rdf:RDF).
 * @param children (Lists of) child nodes. When strings are encountered, they are mapped to Text nodes.
 */
declare function xastscript(name: null, ...children: Children[]): xast.Root

/**
 * Create XML trees in xast.
 *
 * @param name Qualified name. Case sensitive and can contain a namespace prefix (such as rdf:RDF).
 * @param attributes Map of attributes. Nullish (null or undefined) or NaN values are ignored, other values are turned to strings.
 * @param children (Lists of) child nodes. When strings are encountered, they are mapped to Text nodes.
 */
declare function xastscript(
  name: string,
  attributes?: Attributes,
  ...children: Children[]
): xast.Element

/**
 * This unique symbol is declared to specify the key on which JSX children are passed, without conflicting
 * with the Attributes type.
 */
declare const children: unique symbol

/**
 * This namespace allows to use `xastscript` as a JSX implementation.
 *
 * This namespace is only used to support the use as JSX. It’s **not** intended for direct usage.
 */
declare namespace xastscript.JSX {
  /**
   * This defines the return value of JSX syntax.
   */
  type Element = xast.Element

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
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  interface IntrinsicElements {
    [tagName: string]:
      | Attributes
      | {
          /**
           * The prop that matches `ElementChildrenAttribute` key defines the type of JSX children, defines the children type.
           */
          [children]?: Children
        }
  }

  /**
   * The key of this interface defines as what prop children are passed.
   */
  interface ElementChildrenAttribute {
    /**
     * Only the key matters, not the value.
     */
    [children]?: any
  }
}

export = xastscript
