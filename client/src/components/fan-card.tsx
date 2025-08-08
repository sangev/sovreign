import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { type Fan } from "@shared/schema";

interface FanCardProps {
  fan: Fan;
  onQuickAsk?: (fanId: string) => void;
}

export default function FanCard({ fan, onQuickAsk }: FanCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-400";
      case "inactive":
        return "bg-yellow-400";
      default:
        return "bg-red-400";
    }
  };

  const formatTimeAgo = (date: Date | string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center space-x-3 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={fan.avatar || ""} alt={fan.name} />
          <AvatarFallback>{fan.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">{fan.name}</h3>
          <p className="text-xs text-gray-500">#{fan.id.slice(-8)}</p>
        </div>
        <div className={`w-2 h-2 ${getStatusColor(fan.status || "inactive")} rounded-full`}></div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Messages</span>
          <span className="font-medium text-gray-900">{fan.messageCount || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Paid Messages</span>
          <span className="font-medium text-gray-900">{fan.paidMessages || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Spent</span>
          <span className="font-medium text-emerald-600">${fan.totalAmount || "0.00"}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Last Active</span>
          <span className="text-gray-500 text-xs">
            {fan.lastActivity ? formatTimeAgo(fan.lastActivity) : "Never"}
          </span>
        </div>
      </div>

      <Button 
        onClick={() => onQuickAsk?.(fan.id)}
        className="w-full bg-primary-50 text-primary-700 hover:bg-primary-100 border-0"
        variant="outline"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Quick Ask
      </Button>
    </div>
  );
}
