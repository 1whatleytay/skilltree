import './config.js'

import url from 'url'
import http from 'http'

import dispatch from './dispatch.js'

const server = http.createServer(async (req, res) => {
  const requestUrl = url.parse(req.url)

  const handler = dispatch[requestUrl.pathname]

  if (handler) {
    try {
      await handler(req, res, requestUrl)
    } catch (e) {
      console.error(e)
    }
  } else {
    res.statusCode = 404
    res.end('No Handler')
  }
})

server.listen(process.env.HOST_PORT, process.env.HOST_NAME, () => {
  console.log(`Server Live on ${process.env.HOST_NAME}:${process.env.HOST_PORT}.`)
})
