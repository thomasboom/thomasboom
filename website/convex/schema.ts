import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  comments: defineTable({
    postSlug: v.string(),
    name: v.string(),
    content: v.string(),
    parentId: v.optional(v.id("comments")),
    createdAt: v.number(),
  })
    .index("by_postSlug", ["postSlug"])
    .index("by_createdAt", ["createdAt"]),
});
