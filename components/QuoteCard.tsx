'use client';

import { useState, useEffect, useRef } from 'react';
import { Heart, Bookmark, Share2, Copy, Check, Twitter, Facebook, Linkedin } from 'lucide-react';

interface Quote {
  quote: string;
  author: string;
  category: string;
}

interface QuoteCardProps {
  quote: Quote;
  isLiked: boolean;
  isBookmarked: boolean;
  onLikeToggle: (quoteText: string) => void;
  onBookmarkToggle: (quoteText: string) => void;
}

const CATEGORY_COLORS: { [key: string]: string } = {
  inspirational: 'bg-primary-light',
  life: 'bg-secondary-light',
  happiness: 'bg-accent-light',
  love: 'bg-[rgb(255,228,230)]',
  success: 'bg-success',
  motivation: 'bg-[rgb(255,220,180)]',
  wisdom: 'bg-purple',
  humor: 'bg-secondary-light',
  friendship: 'bg-success',
  family: 'bg-peach',
  dad: 'bg-accent-light',
  system: 'bg-gray-100',
};

export default function QuoteCard({ quote, isLiked, isBookmarked, onLikeToggle, onBookmarkToggle }: QuoteCardProps) {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  // Close share menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    }

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.quote}" — ${quote.author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: string) => {
    const text = `"${quote.quote}" — ${quote.author}`;
    const url = window.location.href;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  const categoryColor = CATEGORY_COLORS[quote.category] || 'bg-white';

  return (
    <div className={`card-soft-brutalism ${categoryColor} group h-full flex flex-col relative`}>
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 border-2 border-[rgb(30,30,40)] rounded-full text-xs font-bold bg-white capitalize">
          {quote.category}
        </span>
      </div>

      {/* Quote Text */}
      <blockquote className="text-lg font-medium mb-6 leading-relaxed flex-grow text-foreground">
        "{quote.quote}"
      </blockquote>

      {/* Author */}
      <p className="text-base font-bold mb-6 text-foreground/80">
        — {quote.author}
      </p>

      {/* Actions */}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => onLikeToggle(quote.quote)}
          className={`p-2.5 md:p-3 border-2 border-[rgb(30,30,40)] rounded-lg transition-all duration-200 ${
            isLiked 
              ? 'bg-primary text-white shadow-soft-sm' 
              : 'bg-white hover:bg-gray-50 hover:shadow-soft-sm'
          }`}
          aria-label="Like quote"
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
        
        <button
          onClick={() => onBookmarkToggle(quote.quote)}
          className={`p-2.5 md:p-3 border-2 border-[rgb(30,30,40)] rounded-lg transition-all duration-200 ${
            isBookmarked 
              ? 'bg-secondary text-foreground shadow-soft-sm' 
              : 'bg-white hover:bg-gray-50 hover:shadow-soft-sm'
          }`}
          aria-label="Bookmark quote"
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
        
        <button
          onClick={handleCopy}
          className="p-2.5 md:p-3 border-2 border-[rgb(30,30,40)] rounded-lg bg-white hover:bg-gray-50 hover:shadow-soft-sm transition-all duration-200 ml-auto"
          aria-label="Copy quote"
        >
          {copied ? (
            <Check className="w-5 h-5 text-success" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
        
        <div className="relative" ref={shareMenuRef}>
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="p-2.5 md:p-3 border-2 border-[rgb(30,30,40)] rounded-lg bg-white hover:bg-gray-50 hover:shadow-soft-sm transition-all duration-200"
            aria-label="Share quote"
          >
            <Share2 className="w-5 h-5" />
          </button>
          
          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute right-0 bottom-full mb-2 card-soft-brutalism bg-white p-2 min-w-[160px] z-50 shadow-soft-lg">
              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
