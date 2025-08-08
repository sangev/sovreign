import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Copy, Download, CheckCircle } from "lucide-react";
import { type AiResponse } from "@shared/schema";

interface AiResponseProps {
  response: AiResponse;
  onFollowUp?: (question: string) => void;
}

export default function AiResponseComponent({ response, onFollowUp }: AiResponseProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(response.answer);
  };

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-3 mb-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-sm font-semibold text-gray-900">AI Response</h3>
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle className="w-3 h-3 mr-1" />
                {Math.round(response.confidence * 100)}% Confidence
              </Badge>
            </div>
            <div className="text-gray-700 leading-relaxed mb-4">
              {response.answer}
            </div>
            
            {/* Conversation Context */}
            {response.context && response.context.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Relevant Messages</h4>
                <div className="space-y-2 text-sm">
                  {response.context.map((msg, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className={`font-medium ${msg.sender === "You" ? "text-gray-500" : "text-primary-600"}`}>
                        {msg.sender}:
                      </span>
                      <span className="text-gray-700">"{msg.message}"</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Follow-up Questions */}
            {response.followUpQuestions && response.followUpQuestions.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Suggested Follow-ups</h4>
                <div className="space-y-2">
                  {response.followUpQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="text-left w-full justify-start h-auto p-3 text-sm text-primary-700 hover:bg-primary-50"
                      onClick={() => onFollowUp?.(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Export Actions */}
            <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-200">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
