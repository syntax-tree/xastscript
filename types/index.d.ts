// TypeScript Version: 3.7

import * as xast from 'xast'

type Children = string | xast.Node | Children[]

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
 * @param attributes Map of attributes. Nullish (null or undefined) or NaN values are ignored, other values are turned to strings.
 * @param children (Lists of) child nodes. When strings are encountered, they are mapped to Text nodes.
 */
declare function xastscript(
  name: string,
  attributes?: xast.Attributes,
  ...children: Children[]
): xast.Element

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
   * This disallows the use of
   */
  type IntrinsicAttributes = never

  /**
   * This defines the prop types for known elements.
   *
   * For `xastscript` this defines any string may be used in combination with `xast` `Attributes`.
   */
  interface IntrinsicElements {
    [key: string]: xast.Attributes & {
      /**
       * The prop that matches `ElementChildrenAttribute` key defines the type of JSX children, defines the children type.
       */
      ''?: Children
    }
  }

  /**
   * The key of this interface  defines as what prop children are passed.
   */
  interface ElementChildrenAttribute {
    /**
     * Only the key matters, not the value.
     */
    '': never
  }
}

export = xastscript
