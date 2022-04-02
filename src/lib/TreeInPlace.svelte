<script>
  import { createEventDispatcher } from 'svelte'

  // might be some binding problems
  // [[type { name String, completed Bool }]]
  export let tree

  const dispatch = createEventDispatcher()

  // i think i dont know what im doing
  let selectedNode = null
  const select = (node) => selectedNode = node

  let debugCompletedSet = new Set()

  // for debug
  const completedNode = node => node.completed || debugCompletedSet.has(node.name)
  const completedLayer = layer => layer.every(node => completedNode(node))

  const begin = (node) => {
    dispatch('begin', { node })
    // debug, I'm not removing this before pushing
    debugCompletedSet.add(name)
    debugCompletedSet = debugCompletedSet // a

    node.node.completed = true
  }
</script>

<!-- Adjust Size As Needed In Parent Div-->
<div class="pb-4">
  {#each tree as level, index}
    <!-- Feel Free to Drop Background Effect -->
    <div class="transition-colors duration-300 {completedLayer(level, debugCompletedSet) ? 'bg-green-50' : ''}">
      <div class="
        flex border-t pt-6 border-dotted mx-auto max-w-4xl
        {level.length > 4 ? 'overflow-x-scroll pb-8' : 'justify-around'}">
        {#each level as node}
          <div class="flex flex-col mx-4">
            <button
              on:focus={select(node)}

              class="
                mx-auto
                transition duration-200
                focus:ring-2
                rounded-full
                w-16 h-16
                flex items-center justify-center
                {(completedNode(node, debugCompletedSet))
                  ? 'bg-green-200 text-green-800 ring-green-800'
                  : 'bg-gray-200 text-gray-800 ring-gray-800'}">
              <span class=" text-lg">
                {#if completedNode(node, debugCompletedSet)}
                  &check;
                {:else}
                  ?
                {/if}
              </span>
            </button>

            <div class="
              text-center mt-4 font-light
              z-10 w-40
              {completedNode(node, debugCompletedSet) ? 'text-green-800' : 'text-gray-800'}">

              {node.name}
            </div>

            <!-- Copying Button From Homepage for Look and Feel-->
            <button
              on:click={() => begin(node)}
              class="
                bg-blue-500 hover:bg-blue-700
                text-white text-xs font-medium
                w-16 py-1 mt-2 mx-auto
                rounded
                focus:outline-none focus:shadow-outline
                transition-all
                duration-300
                {node === selectedNode
                  ? 'opacity-1 translate-y-0'
                  : 'opacity-0 -translate-y-6'}">
              Begin
            </button>
          </div>
        {/each}
      </div>

      <div class="pt-5 text-center
        {completedLayer(level, debugCompletedSet)
          && index + 1 < tree.length
          && !completedLayer(tree[index + 1], debugCompletedSet) ? 'animate-bounce' : ''}
        {completedLayer(level, debugCompletedSet) ? 'text-green-800' : 'text-gray-800'}">
        &darr;
      </div>
    </div>
  {/each}
</div>
