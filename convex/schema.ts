import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
import { authTables } from '@convex-dev/auth/server';

const applicationTables = {
  gratitudeLogs: defineTable({
    userId: v.id('users'),
    date: v.string(), // Format: YYYY-MM-DD
    content: v.string(),
  })
    .index('by_user', ['userId'])
    .index('by_user_and_date', ['userId', 'date']),

  userProfiles: defineTable({
    userId: v.id('users'),
    displayName: v.optional(v.string()),
    profilePictureUrl: v.optional(v.string()),
  }).index('by_user', ['userId']),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
