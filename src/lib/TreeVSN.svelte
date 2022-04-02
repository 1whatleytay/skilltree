<script>
  import { skillTrees } from '../store.js'
  import { onMount } from 'svelte'

  import { DataSet } from 'vis-data'
  import { Network } from 'vis-network'

  let container // : HtmlElement

  onMount(() => {
    // incomplete, leaving in case
    const nodes = new DataSet([
      { id: 1, label: 'Intro to Node.js' },
      { id: 2, label: 'Intermediate Node.js' },
      { id: 3, label: 'Advanced Node.js' },
      { id: 4, label: 'First Http Server' },
    ])

    const edges = new DataSet([
      { from: 1, to: 2 },
      { from: 1, to: 4 },
      { from: 2, to: 3 },
      { from: 4, to: 3 },
    ])

    const network = new Network(container, { nodes, edges }, {})
  })
</script>

<div>
  Two Roots
</div>

<div bind:this={container} class="w-64 h-64 bg-red-100">

</div>
