import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const Schema = defineSchema({
  ...authTables,
  usersDetails: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
    image: v.string(),
  }),
});

export default Schema;
