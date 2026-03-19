import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const addQuote = mutation({
  args: {
    text: v.string(),
    scheduledDate: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("quotes", {
      text: args.text,
      scheduledDate: args.scheduledDate,
      createdAt: Date.now(),
    });
  },
});

export const getQuoteForDate = query({
  args: {
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const quotes = await ctx.db
      .query("quotes")
      .withIndex("by_scheduledDate", (q) => q.eq("scheduledDate", args.date))
      .collect();
    return quotes[0] || null;
  },
});

export const getAllQuotes = query({
  handler: async (ctx) => {
    return await ctx.db.query("quotes").collect();
  },
});

export const deleteQuote = mutation({
  args: {
    id: v.id("quotes"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateQuote = mutation({
  args: {
    id: v.id("quotes"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});

export const getRandomQuote = query({
  handler: async (ctx) => {
    const quotes = await ctx.db.query("quotes").collect();
    if (quotes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  },
});
