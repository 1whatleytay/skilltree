<script>
  import { Router, Route, Link } from "svelte-navigator";
  import Homepage from "./Homepage.svelte";

</script>

<Router>
  <main>

    <Route path="/">
      <Homepage />
    </Route>

    <Route path="skilltrees">
      <h1> My Skilltrees </h1>
    </Route>

    <Route path="construct">
      <h1> Construct new skilltree </h1>
    </Route>
  </main>
</Router>
