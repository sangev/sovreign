// This file contains mock data structures for development and testing
// In production, this data would come from real APIs

import { type DashboardStats, type Fan, type AiQuestion, type Conversation } from "@shared/schema";

export const mockDashboardStats: DashboardStats = {
  totalMessages: 24357,
  activeFans: 1247,
  revenue: "47892.00",
  aiQuestions: 2891,
};

export const mockFans: Fan[] = [
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
  },
  {
    id: "fan_5",
    name: "Ashley Rodriguez",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    messageCount: 89,
    paidMessages: 31,
    totalAmount: "156.75",
    lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    status: "active"
  },
  {
    id: "fan_6",
    name: "Michelle Chen",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    messageCount: 15,
    paidMessages: 3,
    totalAmount: "28.50",
    lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: "inactive"
  }
];

export const mockConversations: Conversation[] = [
  {
    id: "conv_1",
    fanId: "fan_1",
    messages: [
      { sender: "TINA ❤️ LOVE", message: "My boyfriend got me this beautiful watch for my birthday..." },
      { sender: "You", message: "That sounds amazing! Any special dinner plans?" },
      { sender: "TINA ❤️ LOVE", message: "Yes! We're going to that new Italian place downtown" }
    ],
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: "conv_2",
    fanId: "fan_2",
    messages: [
      { sender: "Jessica Milano", message: "I love pasta, especially carbonara!" },
      { sender: "You", message: "Have you tried making it at home?" },
      { sender: "Jessica Milano", message: "Not yet, but I'd love to learn!" }
    ],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
  }
];

export const mockAiQuestions: AiQuestion[] = [
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
  },
  {
    id: "q_3",
    question: "What activities did we plan for today?",
    fanId: "fan_2",
    response: {
      answer: "Jessica mentioned wanting to learn cooking, particularly making carbonara pasta at home.",
      confidence: 0.92,
      context: [
        { sender: "Jessica Milano", message: "I love pasta, especially carbonara!" },
        { sender: "Jessica Milano", message: "Not yet, but I'd love to learn!" }
      ],
      followUpQuestions: [
        "What other cooking activities were discussed?",
        "Did fans mention any cooking shows or recipes?"
      ]
    },
    confidence: "0.92",
    context: [
      { sender: "Jessica Milano", message: "I love pasta, especially carbonara!" },
      { sender: "Jessica Milano", message: "Not yet, but I'd love to learn!" }
    ],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
];

export const questionTemplates = [
  { text: "What food did we discuss yesterday?", emoji: "🍕", category: "food" },
  { text: "What appointments did we mention?", emoji: "📅", category: "appointments" },
  { text: "What gifts did fans mention?", emoji: "🎁", category: "gifts" },
  { text: "What activities did we do today?", emoji: "🎯", category: "activities" },
  { text: "What plans did we make for the weekend?", emoji: "🗓️", category: "plans" },
  { text: "What compliments did fans give?", emoji: "💕", category: "compliments" },
  { text: "What travel destinations were discussed?", emoji: "✈️", category: "travel" },
  { text: "What movies or shows did fans recommend?", emoji: "🎬", category: "entertainment" }
];
