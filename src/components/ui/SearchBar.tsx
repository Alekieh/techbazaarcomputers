"use client"
import React, { useState, useEffect } from 'react';

export interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div 
      className={`relative flex items-center transition-all duration-300 ease-in-out h-10 ${
        isFocused || query ? 'w-full md:w-64' : 'w-full md:w-10'
      } ${className}`}
    >
      <div className={`flex items-center w-full h-full bg-dark-800 border rounded-full transition-colors duration-200 overflow-hidden ${
        isFocused ? 'border-gold/50 ring-1 ring-gold/20' : 'border-dark-600'
      }`}>
        <div className="min-w-[40px] flex items-center justify-center text-dark-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search laptops..."
          className={`w-full bg-transparent text-dark-50 placeholder-dark-400 focus:outline-none py-2 text-sm transition-opacity duration-300 ${
             isFocused || query ? 'opacity-100 px-2' : 'opacity-0 md:opacity-100 px-0 md:px-2 w-0 md:w-full'
          }`}
        />
        {query && (
          <button 
            onClick={handleClear}
            className="min-w-[40px] flex items-center justify-center text-dark-400 hover:text-dark-50 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
