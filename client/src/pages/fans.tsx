import Navigation from "@/components/navigation";
import FanCard from "@/components/fan-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, Filter, ArrowLeft } from "lucide-react";
import { type Fan } from "@shared/schema";
import { Link } from "wouter";

export default function Fans() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const { data: allFans = [] } = useQuery<Fan[]>({
    queryKey: searchQuery ? ["/api/fans", { search: searchQuery }] : ["/api/fans"],
  });

  const filteredFans = allFans.filter(fan => {
    // Apply search filter
    const matchesSearch = !searchQuery || 
      fan.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply category filter
    const matchesFilter = filterBy === "all" || 
      (filterBy === "high-spenders" && parseFloat(fan.totalAmount || "0") > 100) ||
      (filterBy === "recent-activity" && fan.status === "active") ||
      (filterBy === "low-activity" && fan.status !== "active");

    return matchesSearch && matchesFilter;
  });

  const handleQuickAsk = (fanId: string) => {
    // In a real app, this would navigate to ask page with pre-selected fan
    console.log("Quick ask for fan:", fanId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Fan Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fan Management</h1>
          <p className="text-gray-600">Manage and analyze your fan relationships</p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 flex-1 max-w-2xl">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search fans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter */}
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fans</SelectItem>
                <SelectItem value="high-spenders">High Spenders</SelectItem>
                <SelectItem value="recent-activity">Recent Activity</SelectItem>
                <SelectItem value="low-activity">Low Activity</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredFans.length} of {allFans.length} fans
            {searchQuery && ` matching "${searchQuery}"`}
            {filterBy !== "all" && ` in category "${filterBy}"`}
          </p>
        </div>

        {/* Fan Cards Grid */}
        {filteredFans.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredFans.map((fan) => (
                <FanCard 
                  key={fan.id} 
                  fan={fan} 
                  onQuickAsk={handleQuickAsk}
                />
              ))}
            </div>

            {/* Load More */}
            {filteredFans.length >= 8 && (
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Fans
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No fans found</h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `No fans match your search for "${searchQuery}"`
                : "No fans match the selected filters"
              }
            </p>
            {(searchQuery || filterBy !== "all") && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setFilterBy("all");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
