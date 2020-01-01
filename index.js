'use strict'

module.exports = x

var slice = [].slice

// Creating xast elements.
function x(name, attributes) {
  var attrs = {}
  var childrenIndex = 2
  var attribute
  var value
  var node

  if (typeof name !== 'string' || name === '') {
    throw new Error('Expected element name, got `' + name + '`')
  }

  node = {type: 'element', name: name, attributes: attrs, children: []}

  // Note that we do not accept a node instead of attributes.
  if (
    typeof attributes === 'number' ||
    typeof attributes === 'string' ||
    (attributes && 'length' in attributes)
  ) {
    childrenIndex = 1
    attributes = null
  }

  if (attributes !== null && attributes !== undefined) {
    for (attribute in attributes) {
      value = attributes[attribute]

      // Ignore nully and NaN values.
      if (value !== null && value !== undefined && value === value) {
        attrs[attribute] = String(value)
      }
    }
  }

  add(node.children, slice.call(arguments, childrenIndex))

  return node
}

function add(siblings, value) {
  var index
  var length

  if (value === null || value === undefined) {
    // Empty.
  } else if (typeof value === 'string' || typeof value === 'number') {
    siblings.push({type: 'text', value: String(value)})
  } else if (typeof value === 'object' && 'length' in value) {
    index = -1
    length = value.length

    while (++index < length) {
      add(siblings, value[index])
    }
  } else if (typeof value === 'object' && typeof value.type === 'string') {
    siblings.push(value)
  } else {
    throw new TypeError('Expected node, nodes, string, got `' + value + '`')
  }
}
