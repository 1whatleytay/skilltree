import { writable } from "svelte/store";

const storedTrees = localStorage.getItem("skilltrees");
export const skillTrees = writable(storedTrees);
skillTrees.subscribe(value => {
    localStorage.setItem("skilltrees", value);
});