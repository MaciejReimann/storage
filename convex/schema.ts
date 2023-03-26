import { defineSchema, defineTable, s } from 'convex/schema'

export default defineSchema({
  messages: defineTable({
    author: s.string(),
    body: s.string(),
  }),
  logs: defineTable({
    timestamp: s.string(),
    sender: s.string(),
    message: s.string(),
  }),
})
