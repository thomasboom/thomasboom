import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const addQuote = mutation({
  args: {
    text: v.string(),
    scheduledDate: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('quotes', {
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
    try {
      return await ctx.db
        .query('quotes')
        .withIndex('by_scheduledDate', (q) => q.eq('scheduledDate', args.date))
        .first();
    } catch (e) {
      console.error('Error fetching quote for date:', e);
      return null;
    }
  },
});

export const getAllQuotes = query({
  handler: async (ctx) => {
    return await ctx.db.query('quotes').collect();
  },
});

export const deleteQuote = mutation({
  args: {
    id: v.id('quotes'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateQuote = mutation({
  args: {
    id: v.id('quotes'),
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
    try {
      const quotes = await ctx.db.query('quotes').collect();
      if (quotes.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    } catch (e) {
      console.error('Error fetching random quote:', e);
      return null;
    }
  },
});

export const vote = mutation({
  args: {
    quoteId: v.id('quotes'),
    userId: v.string(),
    vote: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      const existingVote = await ctx.db
        .query('quoteVotes')
        .withIndex('by_quote_user', (q) =>
          q.eq('quoteId', args.quoteId).eq('userId', args.userId)
        )
        .first();

      if (existingVote) {
        if (existingVote.vote === args.vote) {
          await ctx.db.delete(existingVote._id);
          return { action: 'removed' };
        } else {
          await ctx.db.patch(existingVote._id, { vote: args.vote });
          return { action: 'updated' };
        }
      }

      await ctx.db.insert('quoteVotes', {
        quoteId: args.quoteId,
        userId: args.userId,
        vote: args.vote,
      });
      return { action: 'added' };
    } catch (e) {
      console.error('Error voting:', e);
      throw e;
    }
  },
});

export const getVoteCounts = query({
  args: {
    quoteId: v.id('quotes'),
  },
  handler: async (ctx, args) => {
    try {
      const votes = await ctx.db
        .query('quoteVotes')
        .withIndex('by_quote_user', (q) => q.eq('quoteId', args.quoteId))
        .collect();

      let upvotes = 0;
      let downvotes = 0;
      for (const v of votes) {
        if (v.vote === 1) upvotes++;
        else if (v.vote === -1) downvotes++;
      }
      return { upvotes, downvotes, score: upvotes - downvotes };
    } catch (e) {
      console.error('Error fetching vote counts:', e);
      return { upvotes: 0, downvotes: 0, score: 0 };
    }
  },
});

export const getUserVote = query({
  args: {
    quoteId: v.id('quotes'),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const vote = await ctx.db
        .query('quoteVotes')
        .withIndex('by_quote_user', (q) =>
          q.eq('quoteId', args.quoteId).eq('userId', args.userId)
        )
        .first();
      return vote?.vote ?? 0;
    } catch (e) {
      console.error('Error fetching user vote:', e);
      return 0;
    }
  },
});
