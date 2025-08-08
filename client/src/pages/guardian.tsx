import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Shield, 
  TrendingUp, 
  Users, 
  DollarSign,
  AlertTriangle,
  Search,
  RefreshCw,
  Play,
  Eye,
  UserCheck,
  Settings
} from "lucide-react";

// Production-style data matching your Fan Spend Fetcher system
const mockStats = {
  recentMessages: 50,
  flaggedMessages: 1,
  safeMessages: 17721,
};

const mockActiveModels = [
  {
    username: "anitahaa",
    accountId: "069d36d8-072c-41f6-ad5b-58b98e9ae85b",
    fans: 0,
    lastSeen: "8/2/2025",
    actions: "Remove"
  },
  {
    username: "kearaworldd",
    accountId: "0e5ccbe7-1e85-44e6-b465-f4224fb84d7",
    fans: 0,
    lastSeen: "8/2/2025",
    actions: "Remove"
  },
  {
    username: "stellaxox",
    accountId: "12ce4ae7-d75f-4292-a344-786d5eacae94",
    fans: 0,
    lastSeen: "8/2/2025",
    actions: "Remove"
  },
  {
    username: "emillyyyy",
    accountId: "3381643f-dc7f-464-b4d4-6e9604f2bb3e",
    fans: 0,
    lastSeen: "8/2/2025",
    actions: "Remove"
  }
];

const mockRecentMessages = [
  {
    fanId: "135067239",
    fanName: "User",
    chatter: "Jonathan :D",
    content: "not very far but yes we have some distance between us 😭 were the closest by heart but i need my own space to explore 😭",
    timestamp: "8/5/2025, 9:03:25 PM",
    status: "Safe",
    actions: "Evaluate"
  },
  {
    fanId: "464711074",
    fanName: "Angelo999",
    chatter: "Jonathan :D", 
    content: "hehe im glad that makes u glad 😊 hehe it really does help me knowing even my smallest parts are being appreciated",
    timestamp: "8/5/2025, 9:01:49 PM",
    status: "Safe",
    actions: "Evaluate"
  },
  {
    fanId: "504905665",
    fanName: "TheShyGuy53",
    chatter: "Jonathan :D",
    content: "i have tried the pillow but i dont like doing the extra washing of pillowcase 😣",
    timestamp: "8/5/2025, 9:01:13 PM", 
    status: "Safe",
    actions: "Evaluate"
  }
];

const mockFlaggedMessages = [
  {
    fanId: "504905665",
    fanName: "u504905665",
    chatter: "Dreine",
    content: "thats rare to hear tbh. most guys dont even think like that. u saying that makes me feel seen and safe. so thanks for making me feel like more than just a body. even if this is all online, it doesnt feel fake when i talk to u 😊",
    timestamp: "8/3/2025, 12:32:54 AM",
    status: "Flagged",
    reason: "Obfuscated fake detected"
  }
];

export default function Guardian() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dryRun, setDryRun] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [systemStatus, setSystemStatus] = useState<"operational" | "maintenance" | "down">("operational");

  const getStatusDisplay = () => {
    switch (systemStatus) {
      case "operational":
        return {
          color: "bg-green-500",
          textColor: "text-green-600 dark:text-green-400",
          text: "Systems Operational",
          pulseColor: "bg-green-500"
        };
      case "maintenance":
        return {
          color: "bg-yellow-500",
          textColor: "text-yellow-600 dark:text-yellow-400",
          text: "Under Maintenance",
          pulseColor: "bg-yellow-500"
        };
      case "down":
        return {
          color: "bg-red-500",
          textColor: "text-red-600 dark:text-red-400",
          text: "System Down",
          pulseColor: "bg-red-500"
        };
    }
  };

  const status = getStatusDisplay();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Guardian
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Admin
                </p>
              </div>
              <div 
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  const statuses: Array<"operational" | "maintenance" | "down"> = ["operational", "maintenance", "down"];
                  const currentIndex = statuses.indexOf(systemStatus);
                  const nextIndex = (currentIndex + 1) % statuses.length;
                  setSystemStatus(statuses[nextIndex]);
                }}
              >
                <div className="relative">
                  <div className={`w-4 h-4 sm:w-3 sm:h-3 ${status.color} rounded-full animate-pulse`}></div>
                  <div className={`absolute inset-0 w-4 h-4 sm:w-3 sm:h-3 ${status.pulseColor} rounded-full animate-ping opacity-75`}></div>
                </div>
                <span className={`text-sm ${status.textColor} font-medium`}>
                  {status.text}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="default" size="sm" className="min-w-[100px] h-10">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Admin Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Admin Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant={dryRun ? "default" : "outline"} 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Dry Run: {dryRun ? "OFF" : "ON"}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Auto Refresh:</span>
                <Switch
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Model Management */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Model Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12 sm:h-10">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Models
              </Button>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-12 sm:h-10">
                <Eye className="h-4 w-4 mr-2" />
                View Models
              </Button>
            </div>

            {/* Active Models Table */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Active Models</h3>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-full inline-block align-middle">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400">USERNAME</th>
                        <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400 hidden md:table-cell">ACCOUNT ID</th>
                        <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400">FANS</th>
                        <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400 hidden sm:table-cell">LAST SEEN</th>
                        <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockActiveModels.map((model, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="p-2 sm:p-3 font-medium">{model.username}</td>
                          <td className="p-2 sm:p-3 text-gray-500 text-xs font-mono hidden md:table-cell">{model.accountId}</td>
                          <td className="p-2 sm:p-3">{model.fans}</td>
                          <td className="p-2 sm:p-3 hidden sm:table-cell">{model.lastSeen}</td>
                          <td className="p-2 sm:p-3">
                            <Button variant="destructive" size="sm" className="h-8 px-2 text-xs">
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Monitoring */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Message Monitoring</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">Real-time outbound message evaluation</p>
          </CardHeader>
          <CardContent>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="text-lg font-semibold text-blue-700 dark:text-blue-300">Recent Messages</div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {mockStats.recentMessages}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
                <CardContent className="p-4">
                  <div className="text-lg font-semibold text-orange-700 dark:text-orange-300">Flagged Messages</div>
                  <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                    {mockStats.flaggedMessages}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="text-lg font-semibold text-green-700 dark:text-green-300">Safe Messages</div>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {mockStats.safeMessages}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 sm:h-10 sm:flex-1">
                Load Recent Messages
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white h-12 sm:h-10 sm:flex-1">
                View Flagged Messages
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white h-12 sm:h-10 sm:flex-1">
                View Safe Messages
              </Button>
            </div>

            {/* Message Tables */}
            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-12 sm:h-10">
                <TabsTrigger value="recent" className="text-xs sm:text-sm px-1 sm:px-3">
                  <span className="hidden sm:inline">Recent Messages</span>
                  <span className="sm:hidden">Recent</span>
                </TabsTrigger>
                <TabsTrigger value="flagged" className="text-xs sm:text-sm px-1 sm:px-3">
                  <span className="hidden sm:inline">Flagged Messages</span>
                  <span className="sm:hidden">Flagged</span>
                </TabsTrigger>
                <TabsTrigger value="safe" className="text-xs sm:text-sm px-1 sm:px-3">
                  <span className="hidden sm:inline">Safe Messages</span>
                  <span className="sm:hidden">Safe</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="mt-4">
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <table className="w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400 hidden sm:table-cell">FAN ID</th>
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400">FAN NAME</th>
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400 hidden md:table-cell">CHATTER</th>
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400">CONTENT</th>
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400 hidden sm:table-cell">TIMESTAMP</th>
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400">STATUS</th>
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockRecentMessages.map((message, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="p-2 sm:p-3 hidden sm:table-cell text-xs font-mono">{message.fanId}</td>
                            <td className="p-2 sm:p-3 font-medium">{message.fanName}</td>
                            <td className="p-2 sm:p-3 hidden md:table-cell">{message.chatter}</td>
                            <td className="p-2 sm:p-3 max-w-[200px] sm:max-w-xs truncate">{message.content}</td>
                            <td className="p-2 sm:p-3 text-xs hidden sm:table-cell">{message.timestamp}</td>
                            <td className="p-2 sm:p-3">
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                {message.status}
                              </Badge>
                            </td>
                            <td className="p-2 sm:p-3">
                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                Evaluate
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="flagged" className="mt-4">
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <table className="w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400 hidden sm:table-cell">FAN ID</th>
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400">FAN NAME</th>
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400 hidden md:table-cell">CHATTER</th>
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400">CONTENT</th>
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400 hidden sm:table-cell">TIMESTAMP</th>
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400">STATUS</th>
                          <th className="text-left p-2 sm:p-3 text-gray-600 dark:text-gray-400 hidden lg:table-cell">REASON</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockFlaggedMessages.map((message, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="p-2 sm:p-3 hidden sm:table-cell text-xs font-mono">{message.fanId}</td>
                            <td className="p-2 sm:p-3 font-medium">{message.fanName}</td>
                            <td className="p-2 sm:p-3 hidden md:table-cell">{message.chatter}</td>
                            <td className="p-2 sm:p-3 max-w-[200px] sm:max-w-md">{message.content}</td>
                            <td className="p-2 sm:p-3 text-xs hidden sm:table-cell">{message.timestamp}</td>
                            <td className="p-2 sm:p-3">
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                {message.status}
                              </Badge>
                            </td>
                            <td className="p-2 sm:p-3 text-xs hidden lg:table-cell">{message.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="safe" className="mt-4">
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Shield className="h-16 w-16 mx-auto mb-4 text-green-500" />
                  <p>No safe messages to display in demo mode</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Fans Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Fans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 text-gray-600 dark:text-gray-400">FAN</th>
                    <th className="text-left p-2 text-gray-600 dark:text-gray-400">USERNAME</th>
                    <th className="text-left p-2 text-gray-600 dark:text-gray-400">TOTAL SPEND</th>
                    <th className="text-left p-2 text-gray-600 dark:text-gray-400">DAYS ACTIVE</th>
                    <th className="text-left p-2 text-gray-600 dark:text-gray-400">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center text-gray-500 dark:text-gray-400">
                    <td colSpan={5} className="p-8">
                      No recent fans data available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}