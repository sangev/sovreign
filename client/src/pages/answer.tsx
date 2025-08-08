import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
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
  const [answer, setAnswer] = useState("");
  const [snippet, setSnippet] = useState<Message[]>([]);
  const [fan, setFan] = useState("");
  const [model, setModel] = useState("");
  const [fromModelPage, setFromModelPage] = useState(false);
  const { toast } = useToast();

  // Parse URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const answerParam = urlParams.get('answer');
    const snippetParam = urlParams.get('snippet');
    const fanParam = urlParams.get('fan');
    const modelParam = urlParams.get('model');
    const fromParam = urlParams.get('from');

    if (answerParam && snippetParam && fanParam && modelParam) {
      setAnswer(decodeURIComponent(answerParam));
      setSnippet(JSON.parse(decodeURIComponent(snippetParam)));
      setFan(fanParam);
      setModel(modelParam);
      setFromModelPage(fromParam === 'model');
    } else {
      // Redirect to home if no valid params
      setLocation('/');
    }
  }, [location, setLocation]);

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

        {/* Conversation Snippet Card */}
        <Card className="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20 dark:border-gray-700/20 shadow-xl">
          <CardContent className="pt-6 pb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Conversation Snippet
            </h2>
            <div className="space-y-4">
              {snippet.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg font-mono text-sm border-l-4 ${
                    message.speaker === "fan"
                      ? "bg-blue-50/70 dark:bg-blue-900/20 border-l-blue-400 text-blue-900 dark:text-blue-100"
                      : "bg-primary/10 border-l-primary text-primary dark:text-primary-foreground"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-semibold text-xs uppercase tracking-wide opacity-80">
                      {message.speaker}
                    </span>
                    {message.timestamp && (
                      <span className="text-xs opacity-60">
                        {message.timestamp}
                      </span>
                    )}
                  </div>
                  <p className="font-normal leading-relaxed text-base">
                    "{message.text}"
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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