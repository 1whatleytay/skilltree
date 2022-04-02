<script>
  import { adaptTreeLayers as adaptTree } from './adapt-tree.js'

  import TreeInPlace from './TreeInPlace.svelte'

  export let tree

  // Probably not super needed
  $: adaptedTree = adaptTree(tree)
</script>

<TreeInPlace tree={adaptedTree} />
