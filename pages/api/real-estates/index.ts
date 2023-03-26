// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

// const data = require("./2023-01-12T19-53-00.727Z.json");

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },

  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found')
  },
})
  .get((req, res) => {
    res.send('Hello')
  })
  .post((req, res) => {
    res.json({ hello: 'world' })
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!')
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.')
  })

export default handler
