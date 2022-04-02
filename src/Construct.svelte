<script>
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
        const request = "Make me a list of topics to learn " + prompt + " in array format"; 
        // console.log(prompt);

        let completion = await openai.createCompletion('text-curie-001', {
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
    while (i < list_list.length) {
        // console.log(list_list[i]);
        // console.log(list_list[i].charAt(0), list_list[i].charAt(1), list_list[i].charAt(0) == String("-"));
        if (list_list[i].charAt(0) == "-"){
            list_list[i] = list_list[i].slice(1);
            console.log(list_list);
            i++;
        }else if (list_list[i].charAt(1) == "."){
            list_list[i] = list_list[i].slice(2);
            console.log(list_list);
            i++;
        }else{
            completion = await openai.createCompletion('text-curie-001', {
                prompt: request,

                // playground settings
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            })
            result = completion.data.choices[0]["text"];
            i = 2
            console.log("its been reset")
        }
    }

    return list_list;

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
        <h1> Response: {response} </h1>
    {/await}
</html>