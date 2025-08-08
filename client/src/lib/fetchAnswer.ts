// API Data Contract
interface FetchAnswerRequest {
  fan: string;
  agencyModel?: string; // This is the agency model (e.g., sophia_lee), not the AI model
  question: string;
}

interface FetchAnswerResponse {
  answer: string;
  snippet: Array<{
    speaker: "fan" | "model";
    text: string;
    timestamp?: string;
  }>;
  fan: {
    username: string;
    displayName: string;
    age: number;
    platformUsername?: string;
  };
  model: {
    name: string; // This is the agency model name (e.g., sophia_lee)
  };
}

// Backend Prompt Template (for reference when implementing real API):
// "@{fan} for {agencyModel} → {question}. Return a concise answer and the exact conversation snippet that supports it."

// Mock data for development - easy to swap to real endpoint later
const mockResponses: Record<string, FetchAnswerResponse[]> = {
  "sophia_lee": [
    {
      answer: "Based on the conversation with Tina, you discussed having Italian food at a new restaurant downtown yesterday. She mentioned going there for dinner and seemed excited about trying their pasta dishes, specifically the carbonara.",
      snippet: [
        {
          speaker: "fan",
          text: "Yesterday we had Italian food at that new restaurant downtown!",
          timestamp: "2:30 PM"
        },
        {
          speaker: "model", 
          text: "That sounds delicious! What did you order?",
          timestamp: "2:31 PM"
        },
        {
          speaker: "fan",
          text: "I got the carbonara and it was amazing! The sauce was so creamy.",
          timestamp: "2:33 PM"
        }
      ],
      fan: { 
        username: "tina", 
        displayName: "Christina", 
        age: 28, 
        platformUsername: "christina_xoxo" 
      },
      model: { name: "sophia_lee" }
    },
    {
      answer: "Jessica mentioned receiving a luxury Cartier watch as a birthday gift from her boyfriend. She was very excited about it and had wanted one for a long time.",
      snippet: [
        {
          speaker: "fan",
          text: "My boyfriend got me this beautiful watch for my birthday!",
          timestamp: "Yesterday 3:15 PM"
        },
        {
          speaker: "model",
          text: "That's wonderful! It looks really elegant. What brand is it?",
          timestamp: "Yesterday 3:16 PM" 
        },
        {
          speaker: "fan",
          text: "It's a Cartier! I've wanted one for so long.",
          timestamp: "Yesterday 3:18 PM"
        }
      ],
      fan: { 
        username: "jessica", 
        displayName: "Jessica", 
        age: 32, 
        platformUsername: "jess_luxe" 
      },
      model: { name: "sophia_lee" }
    }
  ],
  "default": [
    {
      answer: "Based on available conversations, I found a discussion about weekend activities and travel plans with this fan.",
      snippet: [
        {
          speaker: "fan",
          text: "I'm planning this amazing weekend trip to Malibu!",
          timestamp: "Today 10:15 AM"
        },
        {
          speaker: "model",
          text: "That sounds incredible! What activities are you planning?",
          timestamp: "Today 10:16 AM"
        },
        {
          speaker: "fan",
          text: "Definitely want to try surfing for the first time. The ocean views there are supposed to be breathtaking!",
          timestamp: "Today 10:18 AM"
        }
      ],
      fan: { 
        username: "sarah", 
        displayName: "Sarah", 
        age: 26, 
        platformUsername: "sarahlive" 
      },
      model: { name: "default_model" }
    }
  ]
};

export async function fetchAnswer({ fan, agencyModel = "default", question }: FetchAnswerRequest): Promise<FetchAnswerResponse> {
  // Simulate realistic API call delay
  await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
  
  // Production implementation (ready to swap):
  // const response = await fetch('/api/answer', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ 
  //     fan, 
  //     agencyModel, 
  //     question,
  //     // Prompt template: "@{fan} for {agencyModel} → {question}. Return a concise answer and the exact conversation snippet that supports it."
  //   })
  // });
  // 
  // if (!response.ok) {
  //   throw new Error(`API error: ${response.status}`);
  // }
  // 
  // return response.json();

  // Mock implementation for development:
  const fanMatch = question.toLowerCase().match(/@(\w+)/);
  const targetFan = fanMatch ? fanMatch[1] : fan;
  
  // Get responses for the specific agency model
  const modelResponses = mockResponses[agencyModel] || mockResponses["default"];
  
  // Find matching mock response or return first one
  let matchingResponse = modelResponses.find(r => 
    r.fan.username.toLowerCase().includes(targetFan.toLowerCase())
  );
  
  // If no match found, use first response but update with target fan
  if (!matchingResponse) {
    matchingResponse = modelResponses[0];
  }
  
  return {
    ...matchingResponse,
    fan: { 
      username: targetFan,
      displayName: matchingResponse.fan.displayName,
      age: matchingResponse.fan.age,
      platformUsername: matchingResponse.fan.platformUsername
    },
    model: { name: agencyModel }
  };
}