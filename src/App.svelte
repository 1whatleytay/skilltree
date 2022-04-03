<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Homepage from "./Homepage.svelte";
  import SavedTrees from "./SavedTrees.svelte";
  import Construct from "./Construct.svelte";
  import Skilltree from "./Skilltree.svelte";

</script>

<Router>
  <main>

    <Route path="/">
      <Homepage />
    </Route>

    <Route path="/skilltrees">
      <SavedTrees />
    </Route>

    <Route path="/construct/:prompt" let:params>
      <Construct prompt={params.prompt}/>
    </Route>

    <Route path="/skilltree/:obj" let:params>
      <Skilltree obj_key={params.obj}/>
    </Route>
  </main>
</Router>

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
