import { Configuration, OpenAIApi } from 'openai'

import querystring from 'querystring'

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_KEY
}))

export default async function (req, res, reqUrl) {
  const query = querystring.parse(reqUrl.query)

  console.log(query)

  const completion = await openai.createCompletion('text-davinci-002', {
    prompt: query.text,

    // playground settings
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  })

  const result = {
    response: completion.data.choices[0].text
  }

  res.statusCode = 200
  res.end(JSON.stringify(result))
}
