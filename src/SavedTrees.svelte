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
</script>

<h1>Theme: {$skillTrees}</h1>

<button on:click={() => skillTrees.set(JSON.stringify(tree1))}>
	tree1
</button>
<button on:click={() => skillTrees.set(JSON.stringify(tree2))}>
	tree2
</button>