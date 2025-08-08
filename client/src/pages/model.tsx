import { useState } from "react";
import { useLocation, useParams } from "wouter";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import HeroSearch from "@/components/HeroSearch";
import LoadingOverlay from "@/components/LoadingOverlay";
import Footer from "@/components/Footer";
import { fetchAnswer } from "@/lib/fetchAnswer";

export default function ModelPage() {
  const { model } = useParams<{ model: string }>();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!model) return;
    
    setIsLoading(true);
    
    try {
      // Parse @username from the query
      const usernameMatch = query.match(/@(\w+)/);
      const fanUsername = usernameMatch ? usernameMatch[1] : "unknown";
      
      // Fetch answer using the agency model from URL
      const result = await fetchAnswer({
        fan: fanUsername,
        agencyModel: model,
        question: query
      });
      
      // Store result in sessionStorage to avoid URL length issues
      sessionStorage.setItem('atlas_answer_data', JSON.stringify({
        answer: result.answer,
        snippet: result.snippet,
        fan: result.fan.username,
        model: result.model.name,
        fromModelPage: true
      }));
      
      setLocation('/answer');
      
    } catch (error) {
      console.error("Failed to fetch answer:", error);
      setIsLoading(false);
    }
  };

  if (!model) {
    setLocation('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* Model Context Header */}
          <div className="mb-4">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              aruna talent • <span className="font-semibold text-primary capitalize">{model.replace('_', ' ')}</span>
            </p>
          </div>
          
          {/* Logo */}
          <div className="mb-8">
            <Logo className="w-16 h-16 mx-auto" />
          </div>
          
          {/* Greeting */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Hey there!
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            What can Atlas find for you?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            Ask about any fan. I'll pull the exact snippet for <span className="font-semibold text-primary capitalize">{model.replace('_', ' ')}</span>.
          </p>
        </div>

        {/* Hero Search with Model Context */}
        <HeroSearch 
          onSubmit={handleSearch}
          loading={isLoading}
          modelContext={model}
          placeholder={`@fanusername what did we discuss yesterday? (using ${model})`}
        />
      </div>

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}