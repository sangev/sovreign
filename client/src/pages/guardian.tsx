import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Heart, 
  Shield, 
  TrendingUp, 
  Users, 
  DollarSign,
  Clock,
  AlertTriangle,
  Search
} from "lucide-react";

// Mock FansMetric data based on the integration strategy
const mockStats = {
  recentMessages: 247,
  flaggedMessages: 12,
  safeMessages: 235,
  totalRevenue: 3420,
  totalSpend: 890,
  daysActive: 28,
  messageCount: 156,
  flaggedCount: 3
};

const mockFans = [
  {
    id: 1,
    name: "Christina",
    username: "christina_xoxo", 
    age: 28,
    platform: "OnlyFans",
    totalSpend: 320,
    daysActive: 15,
    messageCount: 45,
    lastActive: "2h ago",
    riskLevel: "low"
  },
  {
    id: 2,
    name: "Mike", 
    username: "mike_87",
    age: 35,
    platform: "OnlyFans", 
    totalSpend: 180,
    daysActive: 8,
    messageCount: 23,
    lastActive: "1d ago",
    riskLevel: "medium"
  },
  {
    id: 3,
    name: "Alex",
    username: "alex_fan",
    age: 42,
    platform: "OnlyFans",
    totalSpend: 500,
    daysActive: 22,
    messageCount: 67,
    lastActive: "5m ago", 
    riskLevel: "low"
  }
];

export default function Guardian() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFans = mockFans.filter(fan => 
    fan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fan.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      
      <main className="max-w-6xl mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Guardian Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor fan interactions and platform analytics in real-time
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Recent Messages
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {mockStats.recentMessages}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Last 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">
                Flagged Messages
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900 dark:text-red-100">
                {mockStats.flaggedMessages}
              </div>
              <p className="text-xs text-red-600 dark:text-red-400">
                Need review
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                Safe Messages
              </CardTitle>
              <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                {mockStats.safeMessages}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                Verified safe
              </p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                ${mockStats.totalRevenue}
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Fan Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Fan List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Fan Management
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search fans..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFans.map((fan) => (
                  <div 
                    key={fan.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                        {fan.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {fan.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          @{fan.username} • {fan.age} • {fan.platform}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          ${fan.totalSpend}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">Spend</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {fan.messageCount}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">Messages</div>
                      </div>
                      
                      <Badge 
                        variant={fan.riskLevel === 'low' ? 'secondary' : 'destructive'}
                        className={fan.riskLevel === 'low' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {fan.riskLevel}
                      </Badge>
                      
                      <div className="text-gray-500 dark:text-gray-400">
                        {fan.lastActive}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active Fans</span>
                <span className="font-semibold">{filteredFans.length}</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Days Active</span>
                <span className="font-semibold">
                  {Math.round(filteredFans.reduce((acc, fan) => acc + fan.daysActive, 0) / filteredFans.length)}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Messages</span>
                <span className="font-semibold">
                  {filteredFans.reduce((acc, fan) => acc + fan.messageCount, 0)}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Spend</span>
                <span className="font-semibold text-green-600">
                  ${filteredFans.reduce((acc, fan) => acc + fan.totalSpend, 0)}
                </span>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                View Detailed Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}