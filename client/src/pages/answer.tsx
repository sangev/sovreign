import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import AnswerCard from "@/components/AnswerCard";
import SnippetCard from "@/components/SnippetCard";
import HeroSearch from "@/components/HeroSearch";
import LoadingOverlay from "@/components/LoadingOverlay";
import Footer from "@/components/Footer";
import Pill from "@/components/Pill";
import { fetchAnswer } from "@/lib/fetchAnswer";

interface Message {
  speaker: "fan" | "model";
  text: string;
  timestamp?: string;
}

export default function AnswerPage() {
  const [location, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [snippet, setSnippet] = useState<Message[]>([]);
  const [fan, setFan] = useState("");
  const [model, setModel] = useState("");

  // Parse URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const answerParam = urlParams.get('answer');
    const snippetParam = urlParams.get('snippet');
    const fanParam = urlParams.get('fan');
    const modelParam = urlParams.get('model');

    if (answerParam && snippetParam && fanParam && modelParam) {
      setAnswer(decodeURIComponent(answerParam));
      setSnippet(JSON.parse(decodeURIComponent(snippetParam)));
      setFan(fanParam);
      setModel(modelParam);
    } else {
      // Redirect to home if no valid params
      setLocation('/');
    }
  }, [location, setLocation]);

  const handleNewSearch = async (query: string) => {
    setIsLoading(true);
    
    try {
      // Parse @username from the query
      const usernameMatch = query.match(/@(\w+)/);
      const fanUsername = usernameMatch ? usernameMatch[1] : "unknown";
      
      // Fetch new answer
      const result = await fetchAnswer({
        fan: fanUsername,
        model: model,
        question: query
      });
      
      // Update state with new results
      setAnswer(result.answer);
      setSnippet(result.snippet);
      setFan(result.fan.username);
      setModel(result.model.name);
      
      // Update URL
      setLocation(`/answer?fan=${result.fan.username}&model=${result.model.name}&answer=${encodeURIComponent(result.answer)}&snippet=${encodeURIComponent(JSON.stringify(result.snippet))}`);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch answer:", error);
      setIsLoading(false);
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
        {/* Context Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Pill variant="fan">Fan: @{fan}</Pill>
          <Pill variant="model">Model: {model}</Pill>
        </div>

        {/* Answer Card */}
        <AnswerCard answer={answer} />
        
        {/* Snippet Card */}
        <SnippetCard messages={snippet} />
        
        {/* Follow-up Search */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Ask another question
          </h3>
          <HeroSearch 
            onSubmit={handleNewSearch}
            loading={isLoading}
            placeholder={`@${fan} what else did we talk about?`}
            modelContext={model}
          />
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}