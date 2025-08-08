import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAiQuestionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Fans endpoints
  app.get("/api/fans", async (req, res) => {
    try {
      const { search } = req.query;
      let fans;
      
      if (search && typeof search === "string") {
        fans = await storage.searchFans(search);
      } else {
        fans = await storage.getFans();
      }
      
      res.json(fans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch fans" });
    }
  });

  app.get("/api/fans/:id", async (req, res) => {
    try {
      const fan = await storage.getFan(req.params.id);
      if (!fan) {
        return res.status(404).json({ error: "Fan not found" });
      }
      res.json(fan);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch fan" });
    }
  });

  // Conversations endpoints
  app.get("/api/conversations", async (req, res) => {
    try {
      const { fanId } = req.query;
      const conversations = await storage.getConversations(
        fanId && typeof fanId === "string" ? fanId : undefined
      );
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // AI Questions endpoints
  app.get("/api/ai-questions", async (req, res) => {
    try {
      const questions = await storage.getAiQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch AI questions" });
    }
  });

  // Ask AI question
  app.post("/api/ai-questions", async (req, res) => {
    try {
      const data = insertAiQuestionSchema.parse(req.body);
      
      // Check if question contains @username and resolve to fan
      let targetFan = null;
      const usernameMatch = data.question.match(/@(\w+)/);
      if (usernameMatch) {
        const username = usernameMatch[1];
        targetFan = await storage.getFanByUsername(username);
      }
      
      // Generate context-aware response based on the fan and question
      let response;
      if (targetFan) {
        response = {
          answer: `Based on conversations with ${targetFan.name}, I found relevant information about your query. The fan has ${targetFan.messageCount} messages and has spent $${targetFan.totalAmount}.`,
          confidence: 0.92,
          context: [
            { sender: targetFan.name, message: "Yesterday we had Italian food at that new restaurant downtown!" },
            { sender: "You", message: "That sounds delicious! What did you order?" }
          ],
          followUpQuestions: [
            `What other topics did you discuss with ${targetFan.name}?`,
            "What other restaurants were mentioned this week?"
          ]
        };
      } else {
        // General responses for non-specific queries
        const mockResponses = [
          {
            answer: "Based on recent conversations, fans mentioned several food discussions including Italian cuisine and dinner plans at new restaurants.",
            confidence: 0.88,
            context: [
              { sender: "TINA ❤️ LOVE", message: "Yes! We're going to that new Italian place downtown" },
              { sender: "Jessica Milano", message: "I love pasta, especially carbonara!" }
            ],
            followUpQuestions: [
              "What specific dishes were mentioned?",
              "Which restaurants were recommended most?"
            ]
          },
          {
            answer: "Recent gift discussions included a luxury watch mentioned by one fan and various birthday presents discussed throughout the week.",
            confidence: 0.95,
            context: [
              { sender: "TINA ❤️ LOVE", message: "My boyfriend got me this beautiful watch for my birthday..." }
            ],
            followUpQuestions: [
              "What other gifts were mentioned?",
              "What brands were discussed?"
            ]
          }
        ];
        response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      }
      
      const questionData = {
        ...data,
        fanId: targetFan?.id || null,
        response,
        confidence: response.confidence.toString(),
        context: response.context
      };

      const question = await storage.createAiQuestion(questionData);
      res.json(question);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to process AI question" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
