import Navigation from "@/components/navigation";
import StatsCard from "@/components/stats-card";
import FanCard from "@/components/fan-card";
import AiResponseComponent from "@/components/ai-response";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MessageSquare, Users, DollarSign, Zap } from "lucide-react";
import { type DashboardStats, type Fan, type AiQuestion, type AiResponse } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Dashboard() {
  const [question, setQuestion] = useState("");
  const [selectedFan, setSelectedFan] = useState<string>("");
  const [currentResponse, setCurrentResponse] = useState<AiResponse | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/stats"],
  });

  const { data: fans = [] } = useQuery<Fan[]>({
    queryKey: ["/api/fans"],
  });

  const { data: recentQuestions = [] } = useQuery<AiQuestion[]>({
    queryKey: ["/api/ai-questions"],
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
  ];

  const topFans = fans.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">AI-powered conversation analysis and fan management</p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Messages"
            value={stats?.totalMessages.toLocaleString() || "0"}
            change="↗ +12% from last week"
            icon={MessageSquare}
            iconColor="text-primary-600"
            iconBgColor="bg-primary-100"
          />
          <StatsCard
            title="Active Fans"
            value={stats?.activeFans.toLocaleString() || "0"}
            change="↗ +5% from last week"
            icon={Users}
            iconColor="text-emerald-600"
            iconBgColor="bg-emerald-100"
          />
          <StatsCard
            title="Revenue"
            value={`$${stats?.revenue || "0.00"}`}
            change="↗ +18% from last week"
            icon={DollarSign}
            iconColor="text-amber-600"
            iconBgColor="bg-amber-100"
          />
          <StatsCard
            title="AI Questions"
            value={stats?.aiQuestions.toLocaleString() || "0"}
            change="↗ +31% from last week"
            icon={Zap}
            iconColor="text-indigo-600"
            iconBgColor="bg-indigo-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Ask Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Ask AI About Conversations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Fan Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Fan (Optional)
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

                {/* Question Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Question
                  </label>
                  <Textarea
                    rows={3}
                    placeholder="What food did we tell this fan we ate yesterday? What gifts did fans mention? What activities did we discuss today?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="resize-none"
                  />
                </div>

                {/* Quick Question Templates */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Quick Questions</p>
                  <div className="flex flex-wrap gap-2">
                    {templates.map((template, index) => {
                      const colorClasses = {
                        primary: "text-primary-700 bg-primary-50 border-primary-200 hover:bg-primary-100",
                        emerald: "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
                        amber: "text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100",
                        purple: "text-purple-700 bg-purple-50 border-purple-200 hover:bg-purple-100",
                      };

                      return (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className={`${colorClasses[template.color as keyof typeof colorClasses]} transition-colors`}
                          onClick={() => handleTemplateClick(template.text)}
                        >
                          {template.emoji} {template.text.split(" ")[0]} {template.text.split(" ")[1]}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Ask Button */}
                <Button 
                  onClick={handleAskAI}
                  disabled={askAiMutation.isPending}
                  className="w-full"
                >
                  {askAiMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Ask AI
                    </>
                  )}
                </Button>
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

          {/* Recent Questions & Top Fans */}
          <div className="space-y-6">
            {/* Recent Questions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentQuestions.slice(0, 3).map((q) => (
                    <div key={q.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{q.question}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(q.createdAt!).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-primary-600 hover:text-primary-700">
                  View all questions →
                </Button>
              </CardContent>
            </Card>

            {/* Top Active Fans */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Active Fans</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700">
                  View all
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topFans.map((fan) => (
                    <div key={fan.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                      <img 
                        className="h-10 w-10 rounded-full" 
                        src={fan.avatar || ""} 
                        alt={fan.name}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{fan.name}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{fan.messageCount} messages</span>
                          <span>${fan.totalAmount}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`w-2 h-2 ${fan.status === "active" ? "bg-green-400" : "bg-yellow-400"} rounded-full mb-1`}></div>
                        <span className="text-xs text-gray-500">
                          {fan.lastActivity ? new Date(fan.lastActivity).toLocaleString() : "Never"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fan Management Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Fan Management</h2>
          </div>

          {/* Fan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fans.slice(0, 4).map((fan) => (
              <FanCard key={fan.id} fan={fan} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Fans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
