import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import HeroSearch from "@/components/HeroSearch";
import LoadingOverlay from "@/components/LoadingOverlay";
import Footer from "@/components/Footer";
import { fetchAnswer } from "@/lib/fetchAnswer";

export default function Home() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    try {
      // Parse @username from the query
      const usernameMatch = query.match(/@(\w+)/);
      const fanUsername = usernameMatch ? usernameMatch[1] : "unknown";
      
      // Fetch answer using the mock API
      const result = await fetchAnswer({
        fan: fanUsername,
        agencyModel: "default",
        question: query
      });
      
      // Navigate to answer page with results
      setLocation(`/answer?fan=${result.fan.username}&model=${result.model.name}&answer=${encodeURIComponent(result.answer)}&snippet=${encodeURIComponent(JSON.stringify(result.snippet))}&from=home`);
      
    } catch (error) {
      console.error("Failed to fetch answer:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
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
            Ask about any fan. I'll pull the exact snippet.
          </p>
        </div>

        {/* Hero Search */}
        <HeroSearch 
          onSubmit={handleSearch}
          loading={isLoading}
        />
      </div>

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}