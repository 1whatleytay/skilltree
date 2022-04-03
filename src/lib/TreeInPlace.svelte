<script>
  import { onMount, createEventDispatcher } from 'svelte'

  import { Link } from 'svelte-navigator'

  export let name

  // might be some binding problems
  // [[type { name String, completed Bool }]]
  export let tree

  // vue does case conversion
  export let allow_save

  let saved = false
  let copied = false

  const dispatch = createEventDispatcher()

  // i think i dont know what im doing
  let selectedNode = null
  const select = (node) => selectedNode = node

  let debugCompletedSet = new Set()

  // for debug
  const completedNode = node => node.completed || node.node.completed || debugCompletedSet.has(node.name)
  const completedLayer = layer => layer.every(node => completedNode(node))

  $: countCompleted = tree.map(
    layer => layer.reduce(
      (sum, node) => sum + (completedNode(node, debugCompletedSet) ? 1 : 0), 0))
    .reduce(
      (x, y) => x + y, 0)
  $: countNodes = tree.map(layer => layer.length).reduce((x, y) => x + y, 0)

  $: proportionCompleted = countNodes > 0 ? countCompleted / countNodes : 1

  let statePercent = 0

  onMount(() => statePercent = Math.floor(proportionCompleted * 100 / 2))

  function startCountUp(to) {
    const timer = setInterval(() => {
      if (statePercent < to * 100) {
        statePercent++
      } else {
        clearInterval(timer)
      }
    }, 10)
  }

  $: startCountUp(proportionCompleted)

    function begin(node) {
    // debug, I'm not removing this before pushing
    debugCompletedSet.add(node.name)
    debugCompletedSet = debugCompletedSet // a

    if (node.node) {
      node.node.completed = true
    }

    dispatch('begin', { node })
  }

  function save() {
    console.log('trying to save')

    dispatch('save', { name })

    saved = true
  }

  function share() {
    copied = true

    navigator.clipboard.writeText(JSON.stringify(tree));
  }
</script>

<!-- Title Card -->
<div class="bg-green-100 rounded-lg w-auto max-w-4xl mx-auto uppercase font-bold flex items-center p-8 m-8">
  <div class="text-4xl text-gray-800">
    <Link to="/skilltrees" class="font-mono text-sm text-gray-600 hover:text-gray-500"> &#x2039; Skilltrees /</Link>
    { name }
  </div>

  <div class="ml-auto">
    <span class="text-gray-700 mr-4">
      ({ proportionCompleted < 1 ? `${statePercent}% Complete` : 'Done' })
    </span>

    <button
      on:click={share}
      class="
        bg-blue-500 hover:bg-blue-700
        text-white font-bold
        py-2 px-4
        rounded
        w-28
        focus:outline-none focus:shadow-outline">
      &uarr; {copied ? 'Copied' : 'Share'}
    </button>

    {#if allow_save}
      <button
        on:click={() => save()}
        class="
        bg-blue-500 hover:bg-blue-700
        text-white font-bold
        py-2 px-4
        rounded
        w-28
        focus:outline-none focus:shadow-outline
        { saved ? 'opacity-50' : '' }"
        disabled='{saved}'>
        &#9998; { saved ? 'Saved' : 'Save' }
      </button>
    {/if}
  </div>
</div>

<!-- Adjust Size As Needed In Parent Div-->
<div class="pb-4">
  {#each tree as level, index}
    <!-- Feel Free to Drop Background Effect -->
    <div class="transition-colors duration-300 {completedLayer(level, debugCompletedSet) ? 'bg-green-50' : ''}">
      <div class="
        flex flex-wrap border-t pt-6 border-dotted mx-auto max-w-4xl
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
              {completedNode(node, debugCompletedSet) ? 'Revisit' : 'Begin'}
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

  <div class="flex justify-center my-8">
    <span class="bg-green-100 rounded-lg p-8 uppercase font-bold">
      Completion
    </span>
  </div>
</div>
