import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  quotes: defineTable({
    text: v.string(),
    scheduledDate: v.string(),
    createdAt: v.number(),
  }).index("by_scheduledDate", ["scheduledDate"]),
  quoteVotes: defineTable({
    quoteId: v.id("quotes"),
    userId: v.string(),
    vote: v.number(),
  }).index("by_quote_user", ["quoteId", "userId"]),
});
