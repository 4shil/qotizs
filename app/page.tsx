'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, Sparkles, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import QuoteCard from '@/components/QuoteCard';
import Navbar from '@/components/Navbar';
import StatsSection from '@/components/StatsSection';

interface Quote {
  quote: string;
  author: string;
  category: string;
}

type SortOption = 'recent' | 'popular' | 'random';

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [likedQuotes, setLikedQuotes] = useState<Set<string>>(new Set());
  const [bookmarkedQuotes, setBookmarkedQuotes] = useState<Set<string>>(new Set());

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedQuotes');
    const savedBookmarks = localStorage.getItem('bookmarkedQuotes');
    
    if (savedLikes) setLikedQuotes(new Set(JSON.parse(savedLikes)));
    if (savedBookmarks) setBookmarkedQuotes(new Set(JSON.parse(savedBookmarks)));
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_NINJAS_KEY;
      
      if (!apiKey || apiKey === 'your_api_key_here') {
        setError('API key not configured. Please add your API Ninjas key to .env.local');
        setLoading(false);
        return;
      }

      // Fetch multiple times to get variety since we can't filter by category
      const responses = await Promise.all([
        axios.get('https://api.api-ninjas.com/v1/quotes', {
          headers: { 'X-Api-Key': apiKey },
        }),
        axios.get('https://api.api-ninjas.com/v1/quotes', {
          headers: { 'X-Api-Key': apiKey },
        }),
        axios.get('https://api.api-ninjas.com/v1/quotes', {
          headers: { 'X-Api-Key': apiKey },
        })
      ]);
      
      const allQuotes = [
        ...responses[0].data,
        ...responses[1].data,
        ...responses[2].data
      ];
      
      if (allQuotes.length > 0) {
        setQuotes(allQuotes);
      } else {
        setError('No quotes received from API');
      }
    } catch (err) {
      console.error('Error fetching quotes:', err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError('Invalid API key. Please check your API Ninjas key.');
        } else if (err.response?.status === 429) {
          setError('Rate limit exceeded. Please try again later.');
        } else {
          setError(`API Error: ${err.message}`);
        }
      } else {
        setError('Failed to fetch quotes. Please check your connection.');
      }
    }
    
    setLoading(false);
  };

  const fetchRandomQuote = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_NINJAS_KEY;
      
      if (!apiKey || apiKey === 'your_api_key_here') {
        setError('API key not configured. Please add your API Ninjas key to .env.local');
        setLoading(false);
        return;
      }

      const { data } = await axios.get('https://api.api-ninjas.com/v1/quotes', {
        headers: { 'X-Api-Key': apiKey },
      });
      
      if (data && data.length > 0) {
        setQuotes(data);
      } else {
        setError('No quotes received from API');
      }
    } catch (err) {
      console.error('Error fetching random quote:', err);
      setError('Failed to fetch random quote. Please try again.');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleLikeToggle = (quoteText: string) => {
    const newLikes = new Set(likedQuotes);
    if (newLikes.has(quoteText)) {
      newLikes.delete(quoteText);
    } else {
      newLikes.add(quoteText);
    }
    setLikedQuotes(newLikes);
    localStorage.setItem('likedQuotes', JSON.stringify([...newLikes]));
  };

  const handleBookmarkToggle = (quoteText: string) => {
    const newBookmarks = new Set(bookmarkedQuotes);
    if (newBookmarks.has(quoteText)) {
      newBookmarks.delete(quoteText);
    } else {
      newBookmarks.add(quoteText);
    }
    setBookmarkedQuotes(newBookmarks);
    localStorage.setItem('bookmarkedQuotes', JSON.stringify([...newBookmarks]));
  };

  const filteredQuotes = searchQuery
    ? quotes.filter(
        (q) =>
          q.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : quotes;

  const sortedQuotes = [...filteredQuotes].sort((a, b) => {
    if (sortBy === 'popular') {
      const aLikes = likedQuotes.has(a.quote) ? 1 : 0;
      const bLikes = likedQuotes.has(b.quote) ? 1 : 0;
      return bLikes - aLikes;
    }
    if (sortBy === 'random') {
      return Math.random() - 0.5;
    }
    return 0;
  });

  // Get unique categories from fetched quotes
  const categories = Array.from(new Set(quotes.map(q => q.category))).sort();

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        likedCount={likedQuotes.size}
        bookmarkedCount={bookmarkedQuotes.size}
      />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="card-soft-brutalism bg-gradient-to-br from-primary-light via-white to-accent-light p-12 text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white border-2 border-[rgb(30,30,40)] rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-foreground">Daily Inspiration</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
              QuoteVerse
            </h1>
            <p className="text-xl md:text-2xl font-medium text-foreground/80 mb-8">
              Discover wisdom, find inspiration, share joy
            </p>
            
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={fetchRandomQuote}
                className="btn-primary inline-flex items-center gap-2 text-lg"
                disabled={loading}
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Random Quote
              </button>
              
              <button
                onClick={fetchQuotes}
                className="btn-outline inline-flex items-center gap-2 text-lg"
                disabled={loading}
              >
                <Sparkles className="w-5 h-5" />
                Load More Quotes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {!error && (
        <StatsSection 
          totalQuotes={quotes.length}
          likedCount={likedQuotes.size}
          bookmarkedCount={bookmarkedQuotes.size}
        />
      )}

      {/* Error Message */}
      {error && (
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="card-soft-brutalism bg-red-50 border-red-500 p-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-2">API Configuration Required</h3>
                  <p className="text-red-700 mb-4">{error}</p>
                  <div className="bg-white border-2 border-red-300 rounded-lg p-4">
                    <p className="font-bold text-sm mb-2">To fix this:</p>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>Visit <a href="https://api-ninjas.com" target="_blank" rel="noopener" className="text-blue-600 underline">api-ninjas.com</a></li>
                      <li>Sign up for a free account</li>
                      <li>Get your API key from the dashboard</li>
                      <li>Add it to environment variables</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search & Filter Section */}
      {!error && (
        <section className="py-8 px-4 bg-white border-y-3 border-[rgb(30,30,40)]">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search quotes, authors, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-soft-brutalism w-full text-lg"
              />
            </div>

            {/* Sort Options */}
            <div className="mb-6 flex gap-3 items-center flex-wrap">
              <span className="text-sm font-bold text-foreground/60">Sort by:</span>
              <button
                onClick={() => setSortBy('recent')}
                className={`badge-soft-brutalism ${
                  sortBy === 'recent' ? 'bg-foreground text-white' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <Clock className="w-3 h-3 inline mr-1" />
                Recent
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`badge-soft-brutalism ${
                  sortBy === 'popular' ? 'bg-foreground text-white' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <TrendingUp className="w-3 h-3 inline mr-1" />
                Popular
              </button>
              <button
                onClick={() => setSortBy('random')}
                className={`badge-soft-brutalism ${
                  sortBy === 'random' ? 'bg-foreground text-white' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <RefreshCw className="w-3 h-3 inline mr-1" />
                Random
              </button>
            </div>

            {/* Categories from fetched quotes */}
            {categories.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4 text-foreground">Categories in Current Results</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="badge-soft-brutalism bg-secondary-light text-foreground capitalize text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Quotes Grid */}
      {!error && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="card-soft-brutalism animate-pulse">
                    <div className="h-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : sortedQuotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedQuotes.map((quote, index) => (
                  <QuoteCard 
                    key={index} 
                    quote={quote}
                    isLiked={likedQuotes.has(quote.quote)}
                    isBookmarked={bookmarkedQuotes.has(quote.quote)}
                    onLikeToggle={handleLikeToggle}
                    onBookmarkToggle={handleBookmarkToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="card-soft-brutalism inline-block p-12 bg-secondary-light">
                  <p className="text-2xl font-bold mb-4">No quotes found</p>
                  <p className="text-foreground/70 mb-6">Try adjusting your search or load more quotes</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      fetchQuotes();
                    }}
                    className="btn-primary"
                  >
                    Load Quotes
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 border-t-3 border-[rgb(30,30,40)] bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-foreground/60 font-medium">
            QuoteVerse 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
