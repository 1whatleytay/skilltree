<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Homepage from "./Homepage.svelte";
  import SavedTrees from "./SavedTrees.svelte";

</script>

<Router>
  <main>

    <Route path="/">
      <Homepage />
    </Route>

    <Route path="skilltrees">
      <SavedTrees />
    </Route>

    <Route path="construct">
      <h1> Construct new skilltree </h1>
    </Route>
  </main>
</Router>
