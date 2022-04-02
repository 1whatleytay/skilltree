<script>
    import { Configuration, OpenAIApi } from 'openai';
    import axios from "axios";

    const key = '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'

    const openai = new OpenAIApi(new Configuration({
    apiKey: key
    }))

    export let prompt = "";

    // console.log(prompt);

    // Send a request to the server to query for prompt

    // Write a function to take the prompt and send it to the node server and await a response

    async function getList() {
        const request = "make a long list of topics i need to learn to learn " + prompt; 
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

    let dashes = result.split("-").length;
        let nums = result.split(".").length;
        if (dashes > nums) {
            result = result.split("-");
        } else {
            result = result.split(".");
        }
        if (result.length >= 2) {
            parsed = true;
        }

    while (!parsed) {
        
        completion = await openai.createCompletion('text-davinci-002', {
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

    result = completion.data.choices[0]["text"];

        let dashes = result.split("-").length;
        let nums = result.split(".").length;
        if (dashes > nums) {
            result = result.split("-");
        } else {
            // let start_index = result.indexOf("1");
            // let end_index = result.indexOf("2");

            result = "." + result;
            result = result.split(".");
            result.shift();
            result[0] = result[0].substring(1);
            
        }
        if (result.length >= 2) {
            parsed = true;

<<<<<<< Updated upstream
            let toDrop = [];

            for (let i = 0; i < result.length; i++) {
                if (result[i].trim() == "") {
                    toDrop.push(i);
                }
            }
            let modifier = 0;
            for (let i = toDrop.length - 1; i >= 0; i--) {
                result.shift(toDrop[i]-modifier);
                modifier++;
=======
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
>>>>>>> Stashed changes
            }
        }
    }

    return result[0];

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