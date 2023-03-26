import { mutation, query } from './_generated/server'

export const add = mutation(({ db }, timestamp, sender, message) => {
  db.insert('logs', { timestamp, sender, message })
})

export const get = query(async ({ db }) => {
  return await db.query('logs').collect()
})
