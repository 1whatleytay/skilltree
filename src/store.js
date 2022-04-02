import { writable } from "svelte/store";

const storedTrees = localStorage.getItem("skilltrees");
export const skillTrees = writable(storedTrees);
skillTrees.subscribe(value => {
    localStorage.setItem("skilltrees", value);
});

// To use this must JSON.parse when reading and JSON.stringify when writing