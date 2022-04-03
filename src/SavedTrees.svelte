<script>
	import {skillTrees} from './store.js';
  import { Router, Route, Link } from "svelte-navigator";

  console.log(1);

  let activeObj = $skillTrees;

  console.log($skillTrees);
  console.log(activeObj);

  if (typeof(activeObj) == "undefined") {
      activeObj = JSON.stringify({});
  };

  // I could be fuckin' something up here
  const parsedObject = JSON.parse(activeObj)

  let layout = Object.keys(parsedObject);
</script>

<!--<div class="flex flex-wrap items-center justify-center mt-32">-->
<!--    <Link to="/">-->
<!--        <button class="mr-12 w-24 bg-gray-200 px-4 py-2 my-4 rounded-lg">-->
<!--            &#x2039; Back-->
<!--        </button>-->
<!--    </Link>-->

<!--    <div class="text-center text-gray-700 text-6xl">-->
<!--        Saved Skilltrees-->
<!--    </div>-->

<div class="bg-green-100 rounded-lg w-auto max-w-4xl mx-auto uppercase font-bold flex items-center p-8 m-8">
    <div class="text-4xl text-gray-800">
        <Link to="/" class="font-mono text-sm text-gray-600 hover:text-gray-500"> &#x2039; Back /</Link>
        Saved Skilltrees
    </div>
</div>
<!--</div>-->

<div class="max-w-4xl mx-auto flex flex-wrap mt-32">
    {#each layout as cell}
        <Link to="/skilltree/{cell}">
            <div class="bg-green-100 rounded-lg w-64 h-32 p-6 uppercase text-gray-800 font-medium text-xl flex flex-col mt-4 mx-4">
                <div>{cell}</div>
                <div class="text-gray-600 text-sm mt-auto">Learn &rarr;</div>
            </div>
        </Link>
    {/each}
</div>
