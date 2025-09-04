import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { getAuthUserId } from '@convex-dev/auth/server';

export const getGratitudeLogs = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const logs = await ctx.db
      .query('gratitudeLogs')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect();

    // Sort by date in descending order (latest first)
    return logs.sort((a, b) => b.date.localeCompare(a.date));
  },
});

export const getGratitudeLogByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const log = await ctx.db
      .query('gratitudeLogs')
      .withIndex('by_user_and_date', (q) => q.eq('userId', userId).eq('date', args.date))
      .unique();

    return log;
  },
});

export const saveGratitudeLog = mutation({
  args: {
    date: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const existingLog = await ctx.db
      .query('gratitudeLogs')
      .withIndex('by_user_and_date', (q) => q.eq('userId', userId).eq('date', args.date))
      .unique();

    if (args.content.trim() === '') {
      // Delete the log if content is empty
      if (existingLog) {
        await ctx.db.delete(existingLog._id);
      }
      return null;
    }

    if (existingLog) {
      // Update existing log
      await ctx.db.patch(existingLog._id, {
        content: args.content,
      });
      return existingLog._id;
    } else {
      // Create new log
      return await ctx.db.insert('gratitudeLogs', {
        userId,
        date: args.date,
        content: args.content,
      });
    }
  },
});

export const importGratitudeEntries = mutation({
  args: {
    entries: v.array(
      v.object({
        date: v.string(),
        content: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error('User not authenticated');
    }

    let imported = 0;
    let updated = 0;

    for (const entry of args.entries) {
      // Validate date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) {
        continue; // Skip invalid dates
      }

      // Check if entry already exists
      const existingLog = await ctx.db
        .query('gratitudeLogs')
        .withIndex('by_user_and_date', (q) =>
          q.eq('userId', userId).eq('date', entry.date),
        )
        .unique();

      if (existingLog) {
        // Update existing entry
        await ctx.db.patch(existingLog._id, {
          content: entry.content,
        });
        updated++;
      } else {
        // Create new entry
        await ctx.db.insert('gratitudeLogs', {
          userId,
          date: entry.date,
          content: entry.content,
        });
        imported++;
      }
    }

    return { imported, updated };
  },
});
