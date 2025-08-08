import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MessageSquare, Zap } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ConvoAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/">
                <Button 
                  variant={isActive("/") ? "default" : "ghost"}
                  className={isActive("/") ? "bg-primary-50 text-primary-600 hover:bg-primary-100" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/ask">
                <Button 
                  variant={isActive("/ask") ? "default" : "ghost"}
                  className={isActive("/ask") ? "bg-primary-50 text-primary-600 hover:bg-primary-100" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}
                >
                  Ask Question
                </Button>
              </Link>
              <Link href="/fans">
                <Button 
                  variant={isActive("/fans") ? "default" : "ghost"}
                  className={isActive("/fans") ? "bg-primary-50 text-primary-600 hover:bg-primary-100" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}
                >
                  Fans
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Quick Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Ask AI about conversations... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-3 py-2 border-gray-300 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative">
              <Zap className="h-5 w-5 text-gray-400" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
