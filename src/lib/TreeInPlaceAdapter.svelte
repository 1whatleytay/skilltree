<script>
  import { adaptAdapter, adaptTreeLayers as adaptTree } from './adapt-tree.js'

  import TreeInPlace from './TreeInPlace.svelte'

  export let tree
  export let allow_save

  // Probably not super needed
  $: adaptedTree = adaptAdapter(adaptTree(tree))
</script>

<TreeInPlace
  allow_save={allow_save}
  name={adaptedTree.name}
  tree={adaptedTree.tree}
  on:begin on:save />
