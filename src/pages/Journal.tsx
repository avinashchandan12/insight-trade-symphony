
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import { fetchJournalEntries, JournalEntry } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CalendarIcon, Plus, Search, 
  Smile, Meh, Frown, Calendar as CalendarIcon2, Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

const Journal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["journalEntries"],
    queryFn: fetchJournalEntries
  });
  
  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleNewEntry = () => {
    // This would create a new journal entry in a real app
    console.log("Create new journal entry");
  };
  
  const selectEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric'
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <AppLayout>
      <div className="py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1">Journal</h1>
            <p className="text-muted-foreground">Document your trading thoughts and reflections</p>
          </div>
          <Button onClick={handleNewEntry}>
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="glass-panel p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">My Entries</h2>
                <Button variant="outline" size="sm" className="bg-secondary/40">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search entries..."
                  className="pl-9 bg-secondary/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {isLoading ? (
                <div className="h-32 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className={cn(
                        "p-4 rounded-lg cursor-pointer transition-colors",
                        selectedEntry?.id === entry.id
                          ? "bg-primary/20 hover:bg-primary/25"
                          : "hover:bg-secondary/40"
                      )}
                      onClick={() => selectEntry(entry)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{entry.title}</h3>
                        <MoodIcon mood={entry.mood} />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {entry.content}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-0.5 bg-secondary/60 rounded-full text-xs text-muted-foreground"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        {formatDate(entry.date)}
                      </p>
                    </div>
                  ))}
                  
                  {filteredEntries.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No entries found</p>
                      <Button variant="outline" size="sm" onClick={handleNewEntry}>Create Your First Entry</Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {selectedEntry ? (
              <div className="glass-panel p-5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <MoodIcon mood={selectedEntry.mood} size="lg" />
                    <h2 className="text-xl font-semibold ml-3">{selectedEntry.title}</h2>
                  </div>
                  <Button size="sm">Edit</Button>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <div className="flex items-center mr-4">
                    <CalendarIcon2 className="h-4 w-4 mr-2" />
                    <span>{formatDate(selectedEntry.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <span>{formatTime(selectedEntry.date)}</span>
                  </div>
                </div>
                
                <div className="bg-secondary/40 rounded-lg p-5 whitespace-pre-wrap mb-6">
                  {selectedEntry.content}
                </div>
                
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-2.5 py-1 bg-secondary/60 rounded-full text-sm text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-panel flex items-center justify-center p-10 h-72">
                <div className="text-center">
                  <CalendarIcon2 className="h-10 w-10 text-muted-foreground mb-4 mx-auto" />
                  <h3 className="text-lg font-medium mb-2">No Entry Selected</h3>
                  <p className="text-muted-foreground mb-4">
                    Select an entry from the list or create a new one
                  </p>
                  <Button onClick={handleNewEntry}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Entry
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

const MoodIcon = ({ mood, size = "md" }: { mood: string, size?: "sm" | "md" | "lg" }) => {
  const sizeClass = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };
  
  const bgClass = {
    positive: "bg-success/20 text-success",
    neutral: "bg-warning/20 text-warning",
    negative: "bg-destructive/20 text-destructive"
  };
  
  const icon = {
    positive: Smile,
    neutral: Meh,
    negative: Frown
  };
  
  const Icon = icon[mood as keyof typeof icon];
  
  return (
    <div className={cn(
      "rounded-full p-1.5 flex items-center justify-center",
      bgClass[mood as keyof typeof bgClass]
    )}>
      <Icon className={sizeClass[size]} />
    </div>
  );
};

export default Journal;
