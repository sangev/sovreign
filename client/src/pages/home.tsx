import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MessageSquare, Send } from "lucide-react";
import { type AiQuestion, type AiResponse } from "@shared/schema";
import AiResponseComponent from "@/components/ai-response";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [currentResponse, setCurrentResponse] = useState<AiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const askAiMutation = useMutation({
    mutationFn: async (data: { question: string; fanId?: string }) => {
      const response = await apiRequest("POST", "/api/ai-questions", data);
      return response.json();
    },
    onSuccess: (data: AiQuestion) => {
      setCurrentResponse(data.response as AiResponse);
      queryClient.invalidateQueries({ queryKey: ["/api/ai-questions"] });
      setIsLoading(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process your question. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsLoading(true);
    setCurrentResponse(null);
    
    // Parse @username from the question
    const usernameMatch = question.match(/@(\w+)/);
    const fanUsername = usernameMatch ? usernameMatch[1] : null;
    
    askAiMutation.mutate({
      question: question.trim(),
      fanId: fanUsername ? `fan_${fanUsername}` : undefined,
    });
  };

  const handleTemplateClick = (template: string) => {
    setQuestion(template);
  };

  const templates = [
    { text: "🖼️ Create Image", action: "create-image" },
    { text: "⚡ Surprise Me", action: "surprise" },
    { text: "💡 Get Advice", action: "advice" },
    { text: "🧠 Brainstorm", action: "brainstorm" },
    { text: "📊 Analyze Images", action: "analyze" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="w-16 h-16 mx-auto mb-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg flex items-center justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
          </div>
          
          {/* Greeting */}
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Hey Armando!
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Can I help you with anything?
          </h2>
          <p className="text-gray-600 text-lg">
            Ready to assist you with anything you need.
          </p>
        </div>

        {/* Search Input */}
        <Card className="p-6 mb-8 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <form onSubmit={handleSubmit} className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Ask anything you need"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="h-12 pr-12 border-0 bg-gray-50/50 text-base placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-purple-500/20"
              />
            </div>
            <Button 
              type="submit" 
              disabled={!question.trim() || isLoading}
              className="h-12 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Send
            </Button>
          </form>
        </Card>

        {/* Quick Action Templates */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {templates.map((template, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleTemplateClick(template.text)}
              className="bg-white/70 backdrop-blur-sm border-white/20 hover:bg-white/90 text-gray-700 shadow-sm"
            >
              {template.text}
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <Card className="p-8 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <p className="text-gray-600">Analyzing conversations...</p>
            </div>
          </Card>
        )}

        {/* AI Response */}
        {currentResponse && !isLoading && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border-white/20 shadow-xl">
            <AiResponseComponent 
              response={currentResponse} 
              onFollowUp={(followUp) => setQuestion(followUp)}
            />
          </div>
        )}

        {/* Example Prompts */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Try these conversation analysis examples:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setQuestion("@tinaLove what did we say we ate for dinner yesterday to him?")}
              className="text-gray-600 hover:text-gray-900 hover:bg-white/30"
            >
              @tinaLove what did we say we ate for dinner yesterday?
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setQuestion("@jessica what gifts did she mention this week?")}
              className="text-gray-600 hover:text-gray-900 hover:bg-white/30"
            >
              @jessica what gifts did she mention this week?
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setQuestion("@sarah what activities did we discuss today?")}
              className="text-gray-600 hover:text-gray-900 hover:bg-white/30"
            >
              @sarah what activities did we discuss today?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}