<script>
  import TreeInPlaceAdapter from './lib/TreeInPlaceAdapter.svelte'

  export let obj_key;

  import {skillTrees} from './store.js';

  // this is treated as state, unfortunately its bound
  let tree_obj = JSON.parse($skillTrees)[obj_key];

  function handleBegin() {
    let new_json = JSON.parse($skillTrees);
    new_json[obj_key] = tree_obj;
    skillTrees.set(JSON.stringify(new_json));
    console.log("new json: " + JSON.stringify(JSON.parse($skillTrees)));

    tree_obj = tree_obj // svelte trust me :D
  }
</script>

<TreeInPlaceAdapter tree={tree_obj} on:begin={handleBegin} />

