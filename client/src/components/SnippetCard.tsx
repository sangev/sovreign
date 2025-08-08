import { Card, CardContent } from "@/components/ui/card";

interface Message {
  speaker: "fan" | "model";
  text: string;
  timestamp?: string;
}

interface SnippetCardProps {
  messages: Message[];
}

export default function SnippetCard({ messages }: SnippetCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Conversation Snippet
        </h3>
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg font-mono text-sm ${
                message.speaker === "fan"
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100"
                  : "bg-primary/10 text-primary dark:text-primary-foreground"
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <span className="font-semibold capitalize text-xs">
                  {message.speaker}
                </span>
                {message.timestamp && (
                  <span className="text-xs opacity-60">
                    {message.timestamp}
                  </span>
                )}
              </div>
              <p className="font-normal leading-relaxed">
                "{message.text}"
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}