<script>
    import { Configuration, OpenAIApi } from 'openai';

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

        const completion = await openai.createCompletion('text-davinci-002', {
        prompt: request,

        // playground settings
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    })

    console.log(completion);
    console.log(completion.data.choices[0]["text"]);

    const result = completion.data.choices[0]["text"];
    return result;
    }

    let promise = getList();

    
</script>

<html>
    {#await promise}
    <h1> Waiting... </h1>
    {:then response}
    <h1> Response: {response} </h1>
    {/await}
</html>