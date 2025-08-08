import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const fans = pgTable("fans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  avatar: text("avatar"),
  messageCount: integer("message_count").default(0),
  paidMessages: integer("paid_messages").default(0),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).default("0.00"),
  lastActivity: timestamp("last_activity").defaultNow(),
  status: text("status").default("active"), // active, inactive, offline
});

export const conversations = pgTable("conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fanId: varchar("fan_id").notNull().references(() => fans.id),
  messages: jsonb("messages").notNull(), // Array of message objects
  createdAt: timestamp("created_at").defaultNow(),
});

export const aiQuestions = pgTable("ai_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  fanId: varchar("fan_id").references(() => fans.id), // Optional - can be for all fans
  response: jsonb("response").notNull(), // AI response object
  confidence: decimal("confidence", { precision: 3, scale: 2 }).default("0.95"),
  context: jsonb("context"), // Relevant message snippets
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertFanSchema = createInsertSchema(fans).omit({
  id: true,
  lastActivity: true,
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
});

export const insertAiQuestionSchema = createInsertSchema(aiQuestions).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Fan = typeof fans.$inferSelect;
export type InsertFan = z.infer<typeof insertFanSchema>;

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;

export type AiQuestion = typeof aiQuestions.$inferSelect;
export type InsertAiQuestion = z.infer<typeof insertAiQuestionSchema>;

// Additional types for frontend
export type DashboardStats = {
  totalMessages: number;
  activeFans: number;
  revenue: string;
  aiQuestions: number;
};

export type AiResponse = {
  answer: string;
  confidence: number;
  context: Array<{
    sender: string;
    message: string;
  }>;
  followUpQuestions: string[];
};
