'use client';

import { useState } from 'react';

interface SearchBarProps {
  selectedChain: string;
  onChainChange: (chain: string) => void;
}

export function SearchBar({ selectedChain, onChainChange }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const chains = [
    { value: 'all', label: 'All Chains', color: 'text-gray-400' },
    { value: 'ethereum', label: 'Ethereum', color: 'text-blue-400' },
    { value: 'solana', label: 'Solana', color: 'text-purple-400' },
    { value: 'bsc', label: 'BSC', color: 'text-yellow-400' },
    { value: 'polygon', label: 'Polygon', color: 'text-purple-500' },
    { value: 'arbitrum', label: 'Arbitrum', color: 'text-blue-500' },
    { value: 'base', label: 'Base', color: 'text-blue-600' },
    { value: 'monad', label: 'Monad', color: 'text-green-400' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search Input */}
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tokens by name, symbol, or address..."
          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Chain Filter */}
      <div className="sm:w-48">
        <select
          value={selectedChain}
          onChange={(e) => onChainChange(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
        >
          {chains.map((chain) => (
            <option key={chain.value} value={chain.value}>
              {chain.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-all text-sm">
          🔥 Hot
        </button>
        <button className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-all text-sm">
          📈 Trending
        </button>
      </div>
    </div>
  );
}
