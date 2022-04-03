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

    console.log(1);
    console.log(activeObj);
    console.log(JSON.parse(activeObj));

    let num_trees = Object.keys(JSON.parse(activeObj)).length;

    let num_rows = Math.ceil(num_trees/4);
    let final_row_num_cols = num_trees % 4;

    let layout = [];

    for (let i = 0; i < num_rows; i++) {
        let row = [];
        if (i == num_rows - 1) {
            for (let j = 0; j < final_row_num_cols; j++) {
                let key = Object.keys(JSON.parse(activeObj))[i*4 + j];
                console.log(typeof(key));
                // console.log("keys: " + JSON.stringify(Object.keys(JSON.parse(activeObj))));
                let value = JSON.parse(activeObj)[key];
                console.log([key, value]);
                row.push([key, value]);
            }
        } else {
            for (let j = 0; j < 4; j++) {
                let key = Object.keys(JSON.parse(activeObj))[i*4 + j];
                let value = JSON.parse(activeObj)[key];
                row.push([key, value]);
            }
        }
        layout.push(row);
    }

    console.log(layout);
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<html>
    <div class="text-center text-gray-700 mt-32 text-8xl">
        Saved Skilltrees
      </div>
    <body class="justify-center mt-32">
        {#each layout as row}
            <div class="row mt-4">
                {#each row as cell}
                    <Link to="/skilltree/{cell[0]}">
                        <div class="column mt-6">
                            <div class="card"> {cell[0]} </div>
                        </div>
                    </Link>
                {/each}
            </div>
        {/each}
    </body>
</html>

<style>
    * {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Float four columns side by side */
.column {
  float: left;
  width: 25%;
  padding: 0 10px;
}

/* Remove extra left and right margins, due to padding in columns */
.row {margin: 0 -5px;}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
}

/* Responsive columns - one column layout (vertical) on small screens */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}
</style>