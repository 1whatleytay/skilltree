<script>
  import { createEventDispatcher } from 'svelte'

  // might be some binding problems
  // [[type { name String, completed Bool, link String }]]
  // i ignore link
  export let tree

  const dispatch = createEventDispatcher()

  // i think i dont know what im doing
  let selectedNode = null
  const select = (name) => selectedNode = name

  const completed = (layer) => layer.every(x => x.completed)

  const begin = (name) => dispatch('begin', { name })
</script>

<!-- Adjust Size As Needed In Parent Div-->
<div class="pb-4">
  {#each tree as level, index}
    <!-- Feel Free to Drop Background Effect -->
    <div class="{completed(level) ? 'bg-green-50' : ''}">
      <div class="flex items-center justify-around border-t pt-6 border-dotted max-w-4xl mx-auto">
        {#each level as node}
          <div class="flex flex-col">
            <button
              on:focus={select(node.name)}

              class="
                mx-auto
                transition duration-200
                 focus:ring-2
                rounded-full
                w-16 h-16
                flex items-center justify-center
                {node.completed
                  ? 'bg-green-200 text-green-800 ring-green-800'
                  : 'bg-gray-200 text-gray-800 ring-gray-800'}">
              <span class=" text-lg">
                {#if node.completed}
                  &check;
                {:else}
                  ?
                {/if}
              </span>
            </button>

            <div class="
              text-center mt-4 font-light
              z-10
              {node.completed ? 'text-green-800' : 'text-gray-800'}">

              {node.name}
            </div>

            <!-- Copying Button From Homepage for Look and Feel-->
            <button
              on:click={begin(node.name)}
              class="
                bg-blue-500 hover:bg-blue-700
                text-white text-xs font-medium
                w-16 py-1 mt-2 mx-auto
                rounded
                focus:outline-none focus:shadow-outline
                transition-all
                duration-300
                {node.name === selectedNode
                  ? 'opacity-1 translate-y-0'
                  : 'opacity-0 -translate-y-6'}">
              Begin
            </button>
          </div>
        {/each}
      </div>

      <div class="pt-5 text-center
        {completed(level) && index + 1 < tree.length && !completed(tree[index + 1]) ? 'animate-bounce' : ''}
        {completed(level) ? 'text-green-800' : 'text-gray-800'}">
        &darr;
      </div>
    </div>
  {/each}
</div>
