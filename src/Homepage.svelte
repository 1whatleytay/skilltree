<script>
    import { Router, Route, Link, useNavigate } from "svelte-navigator";

    let prompt = "";

    const navigate = useNavigate()
  
  </script>

<main>
  <div class="flex justify-center">
    <div class="text-center text-gray-700 mt-32 text-5xl sm:text-8xl px-16 py-8 bg-green-100 w-auto rounded-xl">
      Skilltree
    </div>
  </div>
  
  <div class="text-center text-gray-600 mt-6">
    Make learning easier.
  </div>

  <!-- Add a search bar with a button to its right in a row -->
  <div class="flex justify-center mt-24">
    <div class="w-full max-w-sm">
      <form class="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4" on:submit={() => navigate(`/construct/${prompt}`)}>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Build a skilltree
          </label>
          <div class="flex items-center">
            <input bind:value={prompt} class="shadow mr-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="skill" type="text" placeholder="Enter topic here...">
            <Link to="/construct/{prompt}">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
                  Build
              </button>
          </Link>
          </div>
        </div>
        <div class="flex items-center justify-between">
            <Link to="/skilltrees" class="mx-auto">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            My Skilltrees
          </button>
          </Link>
        </div>
      </form>
    </div>
  </div>
</main>
  
