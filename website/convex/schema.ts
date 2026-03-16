import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  quotes: defineTable({
    text: v.string(),
    scheduledDate: v.string(),
    createdAt: v.number(),
  }).index("by_scheduledDate", ["scheduledDate"]),
});
