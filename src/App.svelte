<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Homepage from "./Homepage.svelte";
  import SavedTrees from "./SavedTrees.svelte";
  import Construct from "./Construct.svelte";

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
  </main>
</Router>
