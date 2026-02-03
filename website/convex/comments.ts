import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getCommentsByPost = query({
  args: { postSlug: v.string() },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_postSlug", (q) => q.eq("postSlug", args.postSlug))
      .order("desc")
      .take(100);

    return comments;
  },
});

export const addComment = mutation({
  args: {
    postSlug: v.string(),
    name: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const commentId = await ctx.db.insert("comments", {
      postSlug: args.postSlug,
      name: args.name.slice(0, 50),
      content: args.content.slice(0, 1000),
      createdAt: Date.now(),
    });

    return commentId;
  },
});
