<script>
	import {skillTrees} from './store.js';

    let trees = [];

    let tree1 = {
        name: 'test',
        skills: []
    };

    let tree2 = {
        name: 'test2',
        skills: []
    };

    $: activeObj = $skillTrees;
</script>

<h1>Theme: {JSON.parse(activeObj).name}</h1>

<button on:click={() => skillTrees.set(JSON.stringify(tree1))}>
	tree1
</button>
<button on:click={() => skillTrees.set(JSON.stringify(tree2))}>
	tree2
</button>

<!-- This code was used for testing the store, should be redone, nothing in relation to the actual page -->