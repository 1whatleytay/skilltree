<script>
    import { Router, Route, Link } from "svelte-navigator";
    import {skillTrees} from './store.js';
    let fileName = "";

    function addTree(fileName, skills){
        let activeObj = $skillTrees;
        console.log(!$skillTrees);
        if (skillTrees){
            skillTrees.set(JSON.stringify({fileName: skills}));
            console.log("new json: " + JSON.parse($skillTrees));
        }else{
            let new_json = JSON.parse($skillTrees);
            console.log("promise file" + skills + $skillTrees);
            new_json[fileName] = skills;
            skillTrees.set(JSON.stringify(new_json));
            console.log("new json: " + JSON.stringify(JSON.parse($skillTrees)));
        }
    }

    function makeTree(prompt) {
        return {"topic": prompt,
                "children": [],
                "completed": false};
    };

    import { Configuration, OpenAIApi } from 'openai';
    import axios from "axios";
import { listen } from 'svelte/internal';

    const key = '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'//'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'

    const openai = new OpenAIApi(new Configuration({
    apiKey: key
    }))

    export let prompt = "";

    // console.log(prompt);

    // Send a request to the server to query for prompt

    // Write a function to take the prompt and send it to the node server and await a response

    async function getList() {
        let request = "Make me a list of topics to learn " + prompt; 
        // console.log(prompt);

        let completion = await openai.createCompletion('text-davinci-002', {
        prompt: request,

        // playground settings
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    })

    // console.log(completion);
    console.log(completion.data.choices[0]["text"]);

    let result = completion.data.choices[0]["text"];
    
    let parsed = false;

    let list_list = result.split("\n");
    let i = 2
    let rep = 0;
    while (i < list_list.length) {
        // console.log(list_list[i]);
        // console.log(list_list[i].charAt(0), list_list[i].charAt(1), list_list[i].charAt(0) == String("-"));
        if (list_list[i].charAt(0) == "-"){
            list_list[i] = list_list[i].slice(1);
            // console.log(list_list);
            i++;
        }else if (list_list[i].charAt(1) == "."){
            list_list[i] = list_list[i].slice(2);
            // console.log(list_list);
            i++;
        }else{
            rep ++;
            console.log(request);
            completion = await openai.createCompletion('text-davinci-002', {
                prompt: request,

                // playground settings
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            })
            result = completion.data.choices[0]["text"];
            // console.log(result);
            i = 2
            console.log("its been reset")
            if (rep >= 2) {
                console.log("end");
                i = list_list.length;
            }
        }
    }

    let topicTree = makeTree(prompt);

    list_list.shift();
    list_list.shift();

    for (let i = 0; i < list_list.length; i++){
        topicTree["children"].push(makeTree(list_list[i]));
    }

    for (let k = 0; k < topicTree["children"].length; k++){
        let request = "Make me a list of topics to learn " + topicTree["children"][k]["topic"]; 
        // console.log(prompt);

        let completion = await openai.createCompletion('text-davinci-002', {
        prompt: request,

        // playground settings
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    })

    // console.log(completion);
    // console.log(completion.data.choices[0]["text"]);


    //let list_list = result.split("\n");
    let rep = 0;
    //let result = completion.data.choices[0]["text"];
    let i1 = 2
    while (i1 < list_list.length) {
        // console.log(list_list[i]);
        // console.log(list_list[i].charAt(0), list_list[i].charAt(1), list_list[i].charAt(0) == String("-"));
        if (list_list[i1].charAt(0) == "-"){
            list_list[i1] = list_list[i1].slice(1);
            // console.log(list_list);
            i++;
        }else if (list_list[i1].charAt(1) == "."){
            list_list[i1] = list_list[i1].slice(2);
            // console.log(list_list);
            i++;
        }else{
            console.log(request);
            rep ++;
            completion = await openai.createCompletion('text-davinci-002', {
                prompt: request,

                // playground settings
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            })
            result = completion.data.choices[0]["text"];
            // console.log(result);
            i = 2
            console.log("its been reset")
            console.log(rep);
            if (rep >= 2) {
                console.log("end");
                i = list_list.length;
                break;
        }
    }

    list_list.shift();
    list_list.shift();
    for (let j = 0; j < list_list.length; j++){
        topicTree["children"][k]["children"].push(makeTree(list_list[j]));
    }
    }
}

    return topicTree;

        // const { data } = await axios.get('http://127.0.0.1:3001/prompt', {
        //     params: { text: request }
        // });

        // // hopefully this succeeeds!
        // const text = JSON.parse(data).response;
        // return text;
    }

    let promise = getList();

    
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<html>
    {#await promise}
        <h1> Waiting... </h1>
    {:then response}
        <h1> Response: {JSON.stringify(response)} </h1>
        <div class="flex justify-center mt-32">
            <div class="w-full max-w-sm">
              <form class="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4">
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2 textAlign-center" for="username">
                    Save this skilltree
                  </label>
                  <div class="flex items-center">
                    <input bind:value={fileName} class="shadow mr-3 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="skill" type="text" placeholder="Enter Skilltree name here">
                    <Link to="/construct/{prompt}">
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" on:click={() => addTree(fileName, response)}>
                          Save
                      </button>
                  </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
    {/await}
</html>