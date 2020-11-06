// TypeScript Version: 3.7

import {Element as XastElement, Node, Root} from 'xast'

type Children = string | Node | number | Children[]

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
declare function xastscript(name: string, ...children: Children[]): XastElement

/**
 * Create XML trees in xast.
 *
 * @param name Qualified name. Case sensitive and can contain a namespace prefix (such as rdf:RDF).
 * @param children (Lists of) child nodes. When strings are encountered, they are mapped to Text nodes.
 */
declare function xastscript(name: null, ...children: Children[]): Root

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
): XastElement

declare namespace xastscript.JSX {
  /**
   * This defines the return value of JSX syntax.
   */
  type Element = XastElement

  /**
   * This disallows the use of intrinsics
   */
  type IntrinsicAttributes = never

  /**
   * This defines the prop types for known elements.
   *
   * For `xastscript` this defines any string may be used in combination with `xast` `Attributes`.
   */
  type IntrinsicElements = Record<string, Attributes>

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
