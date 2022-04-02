<script>
  import { skillTrees } from '../store.js'
  import { onMount } from 'svelte'

  import { DataSet } from 'vis-data'
  import { Network } from 'vis-network'

  let container // : HtmlElement

  // Provided
  export let tree

  function adaptTreeVSN(input) {
    const labels = {}

    const nodes = []
    const edges = []

    let id = 0

    const helper = (tree) => {
      // Double Lookup is Bad
      if (!labels[tree.topic]) {
        const current = id++

        labels[tree.topic] = current
        nodes.push({ id: current, label: tree.topic })
      }

      console.log(tree)

      const current = labels[tree.topic]

      tree.children
        .forEach(child => {
          const destination = helper(child)

          edges.push({ from: current, to: destination })
        })

      return current // return id
    }

    helper(input)

    console.log({nodes, edges})

    return { nodes: new DataSet(nodes), edges: new DataSet(edges) }
  }

  onMount(() => {
    // Play with these settings?
    const network = new Network(container, adaptTreeVSN(tree), {
      nodes: {
        color: {
          border: 'rgb(21 128 61)',
          background: 'rgb(134 239 172)',

          highlight: {
            border: 'rgb(20 83 45)',
            background: 'rgb(134 239 172)'
          }
        },
        heightConstraint: {
          minimum: 20
        }
      },
      physics: {
        repulsion: {
          nodeDistance: 400,
          springLength: 400
        }
      }
    })
  })
</script>

<div bind:this={container} class="w-full h-96">

</div>
