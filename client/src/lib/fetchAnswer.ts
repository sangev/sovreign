interface FetchAnswerRequest {
  fan: string;
  model?: string;
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
  };
  model: {
    name: string;
  };
}

// Mock data for development - easy to swap to real endpoint later
const mockResponses: FetchAnswerResponse[] = [
  {
    answer: "Based on the conversation with Tina, you discussed having Italian food at a new restaurant downtown yesterday. She mentioned going there for dinner and seemed excited about trying their pasta dishes.",
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
    fan: { username: "tina" },
    model: { name: "example_model" }
  },
  {
    answer: "Jessica mentioned receiving a luxury watch as a birthday gift from her boyfriend. She was very excited about it and shared photos of the watch during your conversation.",
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
    fan: { username: "jessica" },
    model: { name: "example_model" }
  }
];

export async function fetchAnswer({ fan, model, question }: FetchAnswerRequest): Promise<FetchAnswerResponse> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In production, this would be:
  // const response = await fetch('/api/answer', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ fan, model, question })
  // });
  // return response.json();

  // For now, return mock data based on fan mentioned
  const fanMatch = question.toLowerCase().match(/@(\w+)/);
  const targetFan = fanMatch ? fanMatch[1] : fan;
  
  // Find matching mock response or return default
  const matchingResponse = mockResponses.find(r => 
    r.fan.username.toLowerCase().includes(targetFan.toLowerCase())
  ) || mockResponses[0];
  
  return {
    ...matchingResponse,
    fan: { username: targetFan },
    model: { name: model || "default_model" }
  };
}