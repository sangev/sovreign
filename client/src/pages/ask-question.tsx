import Navigation from "@/components/navigation";
import AiResponseComponent from "@/components/ai-response";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Zap, Calendar } from "lucide-react";
import { type Fan, type AiQuestion, type AiResponse } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

export default function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [selectedFan, setSelectedFan] = useState<string>("");
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [currentResponse, setCurrentResponse] = useState<AiResponse | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: fans = [] } = useQuery<Fan[]>({
    queryKey: ["/api/fans"],
  });

  const askAiMutation = useMutation({
    mutationFn: async (data: { question: string; fanId?: string }) => {
      const response = await apiRequest("POST", "/api/ai-questions", data);
      return response.json();
    },
    onSuccess: (data: AiQuestion) => {
      setCurrentResponse(data.response as AiResponse);
      queryClient.invalidateQueries({ queryKey: ["/api/ai-questions"] });
      toast({
        title: "AI Analysis Complete",
        description: "Your question has been processed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process your question. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAskAI = () => {
    if (!question.trim()) {
      toast({
        title: "Please enter a question",
        description: "You need to provide a question for AI analysis.",
        variant: "destructive",
      });
      return;
    }

    askAiMutation.mutate({
      question: question.trim(),
      fanId: selectedFan && selectedFan !== "all" ? selectedFan : undefined,
    });
  };

  const handleTemplateClick = (template: string) => {
    setQuestion(template);
  };

  const handleFollowUp = (followUpQuestion: string) => {
    setQuestion(followUpQuestion);
    setCurrentResponse(null);
  };

  const templates = [
    { text: "What food did we discuss yesterday?", emoji: "🍕", color: "primary" },
    { text: "What appointments did we mention?", emoji: "📅", color: "emerald" },
    { text: "What gifts did fans mention?", emoji: "🎁", color: "amber" },
    { text: "What activities did we do today?", emoji: "🎯", color: "purple" },
    { text: "What plans did we make for the weekend?", emoji: "🗓️", color: "blue" },
    { text: "What compliments did fans give?", emoji: "💕", color: "pink" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Ask Question</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask AI About Conversations</h1>
          <p className="text-gray-600">Get instant insights from your fan conversations using natural language queries</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fan Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Fan
                </label>
                <Select value={selectedFan} onValueChange={setSelectedFan}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Fans" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fans</SelectItem>
                    {fans.map((fan) => (
                      <SelectItem key={fan.id} value={fan.id}>
                        {fan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Timeline Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline Filter
                </label>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="48h">Last 48 Hours</SelectItem>
                    <SelectItem value="72h">Last 72 Hours</SelectItem>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-sm text-gray-500">Active filters:</span>
              {selectedFan && (
                <Badge variant="secondary">
                  {fans.find(f => f.id === selectedFan)?.name || "Unknown Fan"}
                </Badge>
              )}
              {timeFilter !== "all" && (
                <Badge variant="secondary">
                  <Calendar className="w-3 h-3 mr-1" />
                  {timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}
                </Badge>
              )}
              {!selectedFan && timeFilter === "all" && (
                <Badge variant="outline">No filters applied</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Question Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              rows={4}
              placeholder="Ask anything about your conversations... What food did we discuss? What gifts were mentioned? What activities did we plan?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="resize-none text-base"
            />

            <Button 
              onClick={handleAskAI}
              disabled={askAiMutation.isPending}
              size="lg"
              className="w-full"
            >
              {askAiMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing Conversations...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Ask AI
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Question Templates */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Question Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {templates.map((template, index) => {
                const colorClasses = {
                  primary: "text-primary-700 bg-primary-50 border-primary-200 hover:bg-primary-100",
                  emerald: "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
                  amber: "text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100",
                  purple: "text-purple-700 bg-purple-50 border-purple-200 hover:bg-purple-100",
                  blue: "text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100",
                  pink: "text-pink-700 bg-pink-50 border-pink-200 hover:bg-pink-100",
                };

                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-auto p-4 text-left justify-start ${colorClasses[template.color as keyof typeof colorClasses]} transition-colors`}
                    onClick={() => handleTemplateClick(template.text)}
                  >
                    <span className="text-lg mr-3">{template.emoji}</span>
                    <span className="text-sm">{template.text}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* AI Response Display */}
        {currentResponse && (
          <AiResponseComponent 
            response={currentResponse} 
            onFollowUp={handleFollowUp}
          />
        )}
      </div>
    </div>
  );
}
