import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentUser = query({
  handler: async (ctx) => {
    const user = await getAuthUserId(ctx);

    if (!user) {
      return null;
    }

    const userId = await ctx.db.get(user);

    return userId;
  },
});

export const getUserByUserId = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      return null;
    }

    return user;
  },
});
