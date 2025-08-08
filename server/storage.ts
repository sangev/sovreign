import { type User, type InsertUser, type Fan, type InsertFan, type Conversation, type InsertConversation, type AiQuestion, type InsertAiQuestion, type DashboardStats } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Fan operations
  getFans(): Promise<Fan[]>;
  getFan(id: string): Promise<Fan | undefined>;
  getFanByUsername(username: string): Promise<Fan | undefined>;
  createFan(fan: InsertFan): Promise<Fan>;
  updateFan(id: string, updates: Partial<InsertFan>): Promise<Fan | undefined>;
  searchFans(query: string): Promise<Fan[]>;

  // Conversation operations
  getConversations(fanId?: string): Promise<Conversation[]>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;

  // AI Question operations
  getAiQuestions(): Promise<AiQuestion[]>;
  createAiQuestion(question: InsertAiQuestion): Promise<AiQuestion>;

  // Dashboard stats
  getDashboardStats(): Promise<DashboardStats>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private fans: Map<string, Fan>;
  private conversations: Map<string, Conversation>;
  private aiQuestions: Map<string, AiQuestion>;

  constructor() {
    this.users = new Map();
    this.fans = new Map();
    this.conversations = new Map();
    this.aiQuestions = new Map();
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize with sample fans
    const sampleFans = [
      {
        id: "fan_1",
        name: "TINA ❤️ LOVE",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e7a96c?w=100&h=100&fit=crop&crop=face",
        messageCount: 66,
        paidMessages: 22,
        totalAmount: "119.96",
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: "active"
      },
      {
        id: "fan_2", 
        name: "Jessica Milano",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        messageCount: 42,
        paidMessages: 15,
        totalAmount: "87.50",
        lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        status: "active"
      },
      {
        id: "fan_3",
        name: "Sarah Cooper", 
        avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100&h=100&fit=crop&crop=face",
        messageCount: 38,
        paidMessages: 12,
        totalAmount: "65.20",
        lastActivity: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        status: "active"
      },
      {
        id: "fan_4",
        name: "Emma Watson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        messageCount: 24,
        paidMessages: 8,
        totalAmount: "45.30",
        lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        status: "inactive"
      }
    ];

    sampleFans.forEach(fan => {
      this.fans.set(fan.id, fan as Fan);
    });

    // Initialize sample conversations
    const sampleConversations = [
      {
        id: "conv_1",
        fanId: "fan_1",
        messages: [
          { sender: "TINA ❤️ LOVE", message: "My boyfriend got me this beautiful watch for my birthday..." },
          { sender: "You", message: "That sounds amazing! Any special dinner plans?" },
          { sender: "TINA ❤️ LOVE", message: "Yes! We're going to that new Italian place downtown" }
        ],
        createdAt: new Date()
      }
    ];

    sampleConversations.forEach(conv => {
      this.conversations.set(conv.id, conv as Conversation);
    });

    // Initialize sample AI questions
    const sampleQuestions = [
      {
        id: "q_1",
        question: "What gifts did fans mention this week?",
        fanId: null,
        response: {
          answer: "Based on the conversations, TINA mentioned receiving a luxury watch from her boyfriend for her birthday.",
          confidence: 0.95,
          context: [
            { sender: "TINA ❤️ LOVE", message: "My boyfriend got me this beautiful watch for my birthday..." }
          ],
          followUpQuestions: [
            "What other gifts did this fan mention this week?",
            "What brands of watches were discussed?"
          ]
        },
        confidence: "0.95",
        context: [
          { sender: "TINA ❤️ LOVE", message: "My boyfriend got me this beautiful watch for my birthday..." }
        ],
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: "q_2",
        question: "What food did we discuss yesterday?",
        fanId: null,
        response: {
          answer: "Yesterday's conversations included discussions about Italian food, specifically mentions of a new Italian restaurant downtown.",
          confidence: 0.88,
          context: [
            { sender: "TINA ❤️ LOVE", message: "Yes! We're going to that new Italian place downtown" }
          ],
          followUpQuestions: [
            "What specific Italian dishes were mentioned?",
            "Which restaurants were recommended?"
          ]
        },
        confidence: "0.88",
        context: [
          { sender: "TINA ❤️ LOVE", message: "Yes! We're going to that new Italian place downtown" }
        ],
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
      }
    ];

    sampleQuestions.forEach(q => {
      this.aiQuestions.set(q.id, q as AiQuestion);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getFans(): Promise<Fan[]> {
    return Array.from(this.fans.values());
  }

  async getFan(id: string): Promise<Fan | undefined> {
    return this.fans.get(id);
  }

  async getFanByUsername(username: string): Promise<Fan | undefined> {
    // Convert common username patterns to fan IDs
    const usernameToIdMap: { [key: string]: string } = {
      'tinalove': 'fan_1',
      'tina': 'fan_1',
      'jessica': 'fan_2',
      'sarah': 'fan_3',
      'emma': 'fan_4',
      'ashley': 'fan_5',
      'michelle': 'fan_6'
    };
    
    const fanId = usernameToIdMap[username.toLowerCase()];
    return fanId ? this.fans.get(fanId) : undefined;
  }

  async createFan(insertFan: InsertFan): Promise<Fan> {
    const id = randomUUID();
    const fan: Fan = { 
      ...insertFan, 
      id,
      lastActivity: new Date(),
      status: insertFan.status || "active",
      avatar: insertFan.avatar || null,
      messageCount: insertFan.messageCount || 0,
      paidMessages: insertFan.paidMessages || 0,
      totalAmount: insertFan.totalAmount || "0.00"
    };
    this.fans.set(id, fan);
    return fan;
  }

  async updateFan(id: string, updates: Partial<InsertFan>): Promise<Fan | undefined> {
    const fan = this.fans.get(id);
    if (!fan) return undefined;
    
    const updatedFan = { ...fan, ...updates };
    this.fans.set(id, updatedFan);
    return updatedFan;
  }

  async searchFans(query: string): Promise<Fan[]> {
    const allFans = Array.from(this.fans.values());
    if (!query) return allFans;
    
    return allFans.filter(fan => 
      fan.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getConversations(fanId?: string): Promise<Conversation[]> {
    const allConversations = Array.from(this.conversations.values());
    if (fanId) {
      return allConversations.filter(conv => conv.fanId === fanId);
    }
    return allConversations;
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = randomUUID();
    const conversation: Conversation = {
      ...insertConversation,
      id,
      createdAt: new Date()
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async getAiQuestions(): Promise<AiQuestion[]> {
    return Array.from(this.aiQuestions.values())
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createAiQuestion(insertQuestion: InsertAiQuestion): Promise<AiQuestion> {
    const id = randomUUID();
    const question: AiQuestion = {
      ...insertQuestion,
      id,
      createdAt: new Date(),
      fanId: insertQuestion.fanId || null,
      confidence: insertQuestion.confidence || "0.90",
      context: insertQuestion.context || null
    };
    this.aiQuestions.set(id, question);
    return question;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const fans = Array.from(this.fans.values());
    const conversations = Array.from(this.conversations.values());
    const questions = Array.from(this.aiQuestions.values());
    
    const totalMessages = fans.reduce((sum, fan) => sum + (fan.messageCount || 0), 0);
    const activeFans = fans.filter(fan => fan.status === "active").length;
    const revenue = fans.reduce((sum, fan) => sum + parseFloat(fan.totalAmount || "0"), 0).toFixed(2);
    
    return {
      totalMessages,
      activeFans,
      revenue,
      aiQuestions: questions.length
    };
  }
}

export const storage = new MemStorage();
