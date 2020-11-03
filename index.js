'use strict'

module.exports = x

// Creating xast elements.
function x(name, attributes) {
  var node =
    name == null
      ? {type: 'root', children: []}
      : {type: 'element', name: name, attributes: {}, children: []}
  var index = 1
  var key

  if (name != null && typeof name !== 'string') {
    throw new Error('Expected element name, got `' + name + '`')
  }

  // Handle props.
  if (attributes) {
    if (
      name == null ||
      typeof attributes === 'string' ||
      typeof attributes === 'number' ||
      'length' in attributes
    ) {
      // Nope, it’s something for `children`.
      index--
    } else {
      for (key in attributes) {
        // Ignore nullish and NaN values.
        if (attributes[key] != null && attributes[key] === attributes[key]) {
          node.attributes[key] = String(attributes[key])
        }
      }
    }
  }

  // Handle children.
  while (++index < arguments.length) {
    addChild(node.children, arguments[index])
  }

  return node
}

function addChild(nodes, value) {
  var index = -1

  if (value == null) {
    // Empty.
  } else if (typeof value === 'string' || typeof value === 'number') {
    nodes.push({type: 'text', value: String(value)})
  } else if (typeof value === 'object' && 'length' in value) {
    while (++index < value.length) {
      addChild(nodes, value[index])
    }
  } else if (typeof value === 'object' && value.type) {
    if (value.type === 'root') {
      addChild(nodes, value.children)
    } else {
      nodes.push(value)
    }
  } else {
    throw new TypeError('Expected node, nodes, string, got `' + value + '`')
  }
}
