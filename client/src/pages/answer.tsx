import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Pill from "@/components/Pill";
import ChatInterface from "@/components/ChatInterface";
import { fetchAnswer } from "@/lib/fetchAnswer";

interface Message {
  speaker: "fan" | "model";
  text: string;
  timestamp?: string;
}

export default function AnswerPage() {
  const [location, setLocation] = useLocation();
  const [answer, setAnswer] = useState("");
  const [snippet, setSnippet] = useState<Message[]>([]);
  const [fan, setFan] = useState("");
  const [fanData, setFanData] = useState<{username: string; displayName: string; age: number; platformUsername?: string} | null>(null);
  const [model, setModel] = useState("");
  const [fromModelPage, setFromModelPage] = useState(false);
  const { toast } = useToast();

  // Load data from sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem('atlas_answer_data');
    
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setAnswer(data.answer);
        setSnippet(data.snippet);
        setFan(data.fan.username || data.fan);
        setFanData(typeof data.fan === 'object' ? data.fan : null);
        setModel(data.model);
        setFromModelPage(data.fromModelPage || false);
        
        // Clear the data after loading to prevent stale data
        sessionStorage.removeItem('atlas_answer_data');
      } catch (error) {
        console.error('Error parsing stored data:', error);
        setLocation('/');
      }
    } else {
      // Redirect to home if no stored data
      setLocation('/');
    }
  }, [setLocation]);

  const copyAnswerAndSnippet = async () => {
    const snippetText = snippet
      .map(msg => `${msg.speaker}: "${msg.text}"${msg.timestamp ? ` (${msg.timestamp})` : ''}`)
      .join('\n');
    
    const textToCopy = `Answer: ${answer}\n\nConversation Snippet:\n${snippetText}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Copied!",
        description: "Answer and conversation snippet copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleAskAnother = () => {
    if (fromModelPage) {
      setLocation(`/model/${model}`);
    } else {
      setLocation('/');
    }
  };

  if (!answer || !snippet.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {fromModelPage && (
          <div className="mb-6">
            <div className="text-lg text-gray-600 dark:text-gray-400">
              Aruna Talent / <span className="font-semibold text-primary capitalize">{model.replace('_', ' ')}</span>
            </div>
          </div>
        )}

        {/* Context Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Pill variant="fan">@{fan}</Pill>
          <Pill variant="model">{model}</Pill>
        </div>

        {/* Big Answer Card - ChatGPT style */}
        <Card className="mb-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20 dark:border-gray-700/20 shadow-xl">
          <CardContent className="pt-8 pb-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Answer</h1>
            </div>
            <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {answer}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Conversation Snippet - OnlyFans Style Interface */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Conversation Snippet
          </h2>
          <ChatInterface 
            messages={snippet}
            fanName={fanData?.displayName || "Javier"}
            fanUsername={fanData?.platformUsername || fan}
            fanAge={fanData?.age || 35}
            modelName={model.replace('_', ' ')}
            className="mx-auto"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button
            onClick={handleAskAnother}
            variant="outline"
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20 dark:border-gray-700/20 hover:bg-white/90 dark:hover:bg-gray-700/90"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ask Another
          </Button>
          <Button
            onClick={copyAnswerAndSnippet}
            className="bg-primary hover:bg-primary/90 text-white shadow-lg"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Answer
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}