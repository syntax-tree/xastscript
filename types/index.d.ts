// TypeScript Version: 3.7

import {Attributes, Element, Node} from 'xast'

type Children = string | Node | Children[]

/**
 * Create XML trees in xast.
 *
 * @param name Qualified name. Case sensitive and can contain a namespace prefix (such as rdf:RDF).
 * @param children (Lists of) child nodes. When strings are encountered, they are mapped to Text nodes.
 */
declare function xastscript(name: string, ...children: Children[]): Element

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
): Element

export = xastscript
