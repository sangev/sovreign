import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface HeroSearchProps {
  onSubmit: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
  modelContext?: string;
}

export default function HeroSearch({ 
  onSubmit, 
  placeholder = "@fanusername what did we say we ate for dinner yesterday?",
  loading = false,
  modelContext 
}: HeroSearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    onSubmit(query.trim());
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  const examples = [
    "@tina what gifts did she mention this week?",
    "@jessica what food did we discuss yesterday?",
    "@sarah what activities did we plan today?",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Search Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            className="flex-1 px-6 py-4 text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={!query.trim() || loading}
            className="m-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full shadow-sm transition-all"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>

      {/* Model Context Indicator */}
      {modelContext && (
        <div className="mb-4 text-center">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
            Model: {modelContext}
          </span>
        </div>
      )}

      {/* Example Chips */}
      <div className="flex flex-wrap justify-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 mr-2 self-center">Examples:</span>
        {examples.map((example, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleExampleClick(example)}
            className="text-xs bg-white/70 dark:bg-gray-800/70 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            disabled={loading}
          >
            {example.split(' ').slice(0, 3).join(' ')}...
          </Button>
        ))}
      </div>
    </div>
  );
}