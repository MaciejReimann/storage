// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { ConvexHttpClient } from 'convex/browser'

const dbClient = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
)

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },

  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found')
  },
})
  .get(async (req, res) => {
    const logs = dbClient.mutation('logs:add')({
      timestamp: new Date().toLocaleString(),
      sender: 'GET real-estates/actions/harvest',
      message: `some message`,
    })

    res.status(200).send(logs)
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
