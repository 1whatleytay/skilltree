function adaptRoot(input) {
  return {
    name: input.topic,
    completed: input.completed,
    node: input // apparently mutability is okay?
  }
}

export function adaptTreeFlatten(input) {
  const root = adaptRoot(input)

  const remaining = []

  input.children
    .map(child => adaptTreeFlatten(child))
    .forEach(subtree => {
      subtree.forEach((elements, index) => {
        // A bit strange...
        while (index >= remaining.length)
          remaining.push([])

        // Classic Svelte
        remaining[index] = [...remaining[index], ...elements]
      })
    })

  return [[root], ...remaining]
}


export function adaptTreeLayers(input) {
  const root = adaptRoot(input)

  // array of arrays
  const layers = [[[root]]]

  const visited = new Set([])

  const helper = (children, index) => {
    if (children.length <= 0) // !children i'm dumb??
      return

    while (index >= layers.length)
      layers.push([])

    layers[index].push(children
      .filter(child => !visited.has(child.topic) && visited.add(child.topic))
      .map(child => adaptRoot(child)))

    children.forEach(child => {
      helper(child.children, index + 1)
    })
  }

  helper(input.children, 1)

  const temporary = layers.flat().filter(x => x.length > 0)
  const result = []

  temporary.forEach(list => {
    let index = 0

    while (index < list.length) {
      const copy = Math.min(4, list.length - index)

      result.push(list.slice(index, index + copy))
      index += copy
    }
  })

  return result
}
