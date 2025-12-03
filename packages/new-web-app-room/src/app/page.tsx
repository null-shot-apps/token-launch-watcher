'use client';

import { useState, useEffect } from 'react';
import { TokenFeed } from '@/components/TokenFeed';
import { SearchBar } from '@/components/SearchBar';
import { TokenDetailModal } from '@/components/TokenDetailModal';
import { generateMockTokens, type Token } from '@/lib/mockData';

export default function HomePage() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [watchlistedTokens, setWatchlistedTokens] = useState<Set<string>>(new Set());
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [selectedChain, setSelectedChain] = useState<string>('all');

  // Simulate real-time token discovery
  useEffect(() => {
    const interval = setInterval(() => {
      const newTokens = generateMockTokens(Math.floor(Math.random() * 3) + 1);
      setTokens(prev => {
        const now = Date.now();
        // Remove tokens older than 5 minutes unless watchlisted
        const filtered = prev.filter(token => {
          const age = now - token.launchTime;
          const fiveMinutes = 5 * 60 * 1000;
          return age < fiveMinutes || watchlistedTokens.has(token.address);
        });
        return [...newTokens, ...filtered];
      });
    }, 3000 + Math.random() * 7000); // Random interval between 3-10 seconds

    return () => clearInterval(interval);
  }, [watchlistedTokens]);

  // Update token data in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prev => prev.map(token => ({
        ...token,
        price: token.price * (0.95 + Math.random() * 0.1), // ±5% price change
        volume24h: token.volume24h * (0.9 + Math.random() * 0.2), // ±10% volume change
        marketCap: token.marketCap * (0.95 + Math.random() * 0.1),
        liquidity: token.liquidity * (0.98 + Math.random() * 0.04),
        priceChange24h: -20 + Math.random() * 40, // Random % change
      })));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const handleWatchlist = (tokenAddress: string) => {
    setWatchlistedTokens(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tokenAddress)) {
        newSet.delete(tokenAddress);
      } else {
        newSet.add(tokenAddress);
      }
      return newSet;
    });
  };

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
  };

  const filteredTokens = selectedChain === 'all' 
    ? tokens 
    : tokens.filter(token => token.chain === selectedChain);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Token Launch Watcher
            </h1>
            <div className="text-sm text-gray-400">
              {filteredTokens.length} tokens • Live feed
            </div>
          </div>
          <SearchBar 
            selectedChain={selectedChain}
            onChainChange={setSelectedChain}
          />
        </div>
      </div>

      {/* Token Feed */}
      <div className="container mx-auto px-4 py-6">
        <TokenFeed
          tokens={filteredTokens}
          watchlistedTokens={watchlistedTokens}
          onWatchlist={handleWatchlist}
          onTokenClick={handleTokenClick}
        />
      </div>

      {/* Token Detail Modal */}
      {selectedToken && (
        <TokenDetailModal
          token={selectedToken}
          isWatchlisted={watchlistedTokens.has(selectedToken.address)}
          onWatchlist={() => handleWatchlist(selectedToken.address)}
          onClose={() => setSelectedToken(null)}
        />
      )}
    </div>
  );
}




