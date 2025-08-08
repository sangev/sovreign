import { Card, CardContent } from "@/components/ui/card";
import { User, MoreVertical, ArrowLeft, Star, Bell, MessageCircle, X, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  speaker: "fan" | "model";
  text: string;
  timestamp?: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  fanName: string;
  fanUsername: string;
  fanAge?: number;
  modelName?: string;
  className?: string;
}

export default function ChatInterface({ 
  messages, 
  fanName, 
  fanUsername, 
  fanAge = 35,
  modelName,
  className 
}: ChatInterfaceProps) {
  return (
    <Card className={`max-w-md mx-auto bg-white dark:bg-gray-900 border-0 shadow-lg overflow-hidden ${className}`}>
      {/* Chat Header - OnlyFans Style */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div className="flex items-center space-x-2">
              {/* Fan Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">💰</span>
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {fanName}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">/</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {fanUsername}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">/</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {fanAge}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
                    ({modelName || 'platform'})
                  </span>
                </div>
              </div>
            </div>
          </div>
          <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </div>
        
        {/* Platform Icons */}
        <div className="flex items-center justify-center space-x-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <Star className="w-4 h-4 text-gray-400" />
          <Bell className="w-4 h-4 text-gray-400" />
          <MessageCircle className="w-4 h-4 text-gray-400" />
          <X className="w-4 h-4 text-gray-400" />
          <Calendar className="w-4 h-4 text-gray-400" />
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <CardContent className="p-0 bg-gray-50 dark:bg-gray-900 min-h-[300px]">
        {/* Date Separator */}
        <div className="flex justify-center py-3">
          <span className="px-3 py-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-full">
            Today
          </span>
        </div>

        {/* Messages */}
        <div className="px-4 pb-4 space-y-3">
          {messages.map((message, index) => (
            <div key={index} className="flex flex-col space-y-1">
              {message.speaker === "fan" ? (
                // Fan Message (right side)
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-blue-100 dark:bg-blue-900/30 rounded-2xl rounded-tr-md px-4 py-2">
                    <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                </div>
              ) : (
                // Model Message (left side)
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">💰</span>
                  </div>
                  <div className="max-w-[80%] bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-tl-md px-4 py-2">
                    <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Timestamp and Status */}
              {message.timestamp && (
                <div className={`flex items-center space-x-1 text-xs text-gray-400 ${
                  message.speaker === "fan" ? "justify-end pr-1" : "justify-start pl-8"
                }`}>
                  <span>{message.timestamp}</span>
                  {message.speaker === "model" && (
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 text-blue-500">✓</div>
                      <div className="w-3 h-3 text-blue-500">✓</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quote/Citation Block for highlighted message */}
        {messages.length > 0 && (
          <div className="mx-4 mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded-r-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💰</span>
              </div>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {fanName} / {fanUsername} / {fanAge}, Today {messages[0]?.timestamp}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">
              " {messages[0]?.text} "
            </p>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto text-xs text-blue-500 dark:text-blue-400 mt-1"
            >
              View message
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}