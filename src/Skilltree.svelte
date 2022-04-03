<script>
    export let obj_key;

    import {skillTrees} from './store.js';

    let tree_obj = JSON.parse($skillTrees)[obj_key];
</script>