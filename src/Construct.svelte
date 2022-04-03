<script>
  import { Router, Route, Link } from "svelte-navigator";
  import {skillTrees} from './store.js';
  import TreeInPlaceAdapter from './lib/TreeInPlaceAdapter.svelte'
  import {onMount} from 'svelte'

  import NProgress from 'nprogress'
  import 'nprogress/nprogress.css'

  import { Configuration, OpenAIApi } from 'openai';

  // I have no soul
  let saveName = null

  function addTree(fileName, skills) {
    saveName = fileName

    console.log({fileName, skills})
    let activeObj = $skillTrees;
    console.log($skillTrees);

    if ($skillTrees === 'null') {
      let obj = {};
      obj[fileName] = skills;
      skillTrees.set(JSON.stringify(obj));
      console.log("new json: " + JSON.parse($skillTrees));
    } else {
      let new_json = JSON.parse($skillTrees);
      console.log("promise file" + skills + $skillTrees);
      new_json[fileName] = skills;
      skillTrees.set(JSON.stringify(new_json));
      console.log("new json: " + JSON.stringify(JSON.parse($skillTrees)));
    }
  }

  function makeTree(prompt) {
    return {
      topic: prompt,
      children: [],
      completed: false
    };
  };

  const key = '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'//'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'

  const openai = new OpenAIApi(new Configuration({
    apiKey: key
  }))

  export let prompt = "";

  // Send a request to the server to query for prompt

  // Write a function to take the prompt and send it to the node server and await a response

  async function getList() {
    console.log('nprogress?')
    NProgress.start()

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

    NProgress.inc(0.03)

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
      if (list_list[i].charAt(0) === "-") {
        list_list[i] = list_list[i].slice(1);
        // console.log(list_list);
        i++;
      } else if (list_list[i].charAt(1) === ".") {
        list_list[i] = list_list[i].slice(2);
        // console.log(list_list);
        i++;
      } else {
        rep++;
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

        NProgress.inc()

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

    for (let i = 0; i < list_list.length; i++) {
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

      NProgress.inc()

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
        } else {
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

          NProgress.inc()

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
        for (let j = 0; j < list_list.length; j++) {
            topicTree["children"][k]["children"].push(makeTree(list_list[j]));
        }
      }
    }

    NProgress.done(true)
    console.log('done')

    return topicTree;
  }

  let promise = getList()
    .catch(() => NProgress.done());
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<html>
  {#await promise}
    <!-- I got bored watching it so I made it pulse -->
    <div class="mt-12 text-6xl text-center animate-pulse"> Building... </div>
  {:then response}
    <TreeInPlaceAdapter allow_save={true} tree={response}
      on:begin={() => saveName && addTree(saveName, response)}
      on:save={event => addTree(event.detail.name, response)} />
  {/await}
</html>