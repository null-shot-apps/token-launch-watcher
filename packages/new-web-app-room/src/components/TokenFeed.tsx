'use client';

import { Token } from '@/lib/dummyData';

interface TokenFeedProps {
  tokens: Token[];
  watchlistedTokens: Set<string>;
  onWatchlist: (tokenAddress: string) => void;
  onTokenClick: (token: Token) => void;
}

export function TokenFeed({ tokens, watchlistedTokens, onWatchlist, onTokenClick }: TokenFeedProps) {
  const formatPrice = (price: number) => {
    if (price < 0.001) {
      return `$${price.toExponential(2)}`;
    }
    return `$${price.toFixed(6)}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toFixed(0);
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (minutes < 1) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  const getChainColor = (chain: string) => {
    const colors: Record<string, string> = {
      ethereum: 'text-blue-400 bg-blue-400/10',
      solana: 'text-purple-400 bg-purple-400/10',
      bsc: 'text-yellow-400 bg-yellow-400/10',
      polygon: 'text-purple-500 bg-purple-500/10',
      arbitrum: 'text-blue-500 bg-blue-500/10',
      base: 'text-blue-600 bg-blue-600/10',
      monad: 'text-green-400 bg-green-400/10',
    };
    return colors[chain] || 'text-gray-400 bg-gray-400/10';
  };

  // Separate watchlisted and regular tokens
  const watchlisted = tokens.filter(token => watchlistedTokens.has(token.address));
  const regular = tokens.filter(token => !watchlistedTokens.has(token.address));

  return (
    <div className="space-y-6">
      {/* Watchlisted Tokens */}
      {watchlisted.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-white">📌 Watchlisted</h2>
            <span className="text-sm text-gray-400">({watchlisted.length})</span>
          </div>
          <div className="grid gap-4">
            {watchlisted.map((token) => (
              <TokenCard
                key={token.address}
                token={token}
                isWatchlisted={true}
                onWatchlist={onWatchlist}
                onTokenClick={onTokenClick}
                formatPrice={formatPrice}
                formatNumber={formatNumber}
                formatTimeAgo={formatTimeAgo}
                getChainColor={getChainColor}
              />
            ))}
          </div>
        </div>
      )}

      {/* Live Feed */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold text-white">🔴 Live Feed</h2>
          <span className="text-sm text-gray-400">({regular.length})</span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        
        {regular.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-4">🔍</div>
            <p>Scanning for new token launches...</p>
            <p className="text-sm mt-2">New tokens will appear here automatically</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {regular.map((token) => (
              <TokenCard
                key={token.address}
                token={token}
                isWatchlisted={false}
                onWatchlist={onWatchlist}
                onTokenClick={onTokenClick}
                formatPrice={formatPrice}
                formatNumber={formatNumber}
                formatTimeAgo={formatTimeAgo}
                getChainColor={getChainColor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface TokenCardProps {
  token: Token;
  isWatchlisted: boolean;
  onWatchlist: (address: string) => void;
  onTokenClick: (token: Token) => void;
  formatPrice: (price: number) => string;
  formatNumber: (num: number) => string;
  formatTimeAgo: (timestamp: number) => string;
  getChainColor: (chain: string) => string;
}

function TokenCard({ 
  token, 
  isWatchlisted, 
  onWatchlist, 
  onTokenClick,
  formatPrice,
  formatNumber,
  formatTimeAgo,
  getChainColor
}: TokenCardProps) {
  return (
    <div 
      className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all cursor-pointer group"
      onClick={() => onTokenClick(token)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            {token.symbol.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {token.name}
              </h3>
              <span className="text-gray-400 text-sm">${token.symbol}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded-full ${getChainColor(token.chain)}`}>
                {token.chain.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500">
                {formatTimeAgo(token.launchTime)}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWatchlist(token.address);
          }}
          className={`p-2 rounded-lg transition-all ${
            isWatchlisted 
              ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20' 
              : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
          }`}
        >
          {isWatchlisted ? '⭐' : '☆'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <div className="text-gray-400 mb-1">Price</div>
          <div className="text-white font-medium">{formatPrice(token.price)}</div>
          <div className={`text-xs ${token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(1)}%
          </div>
        </div>
        
        <div>
          <div className="text-gray-400 mb-1">Market Cap</div>
          <div className="text-white font-medium">${formatNumber(token.marketCap)}</div>
        </div>
        
        <div>
          <div className="text-gray-400 mb-1">Liquidity</div>
          <div className="text-white font-medium">${formatNumber(token.liquidity)}</div>
          <div className={`text-xs ${token.liquidityChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {token.liquidityChange24h >= 0 ? '+' : ''}{token.liquidityChange24h.toFixed(1)}%
          </div>
        </div>
        
        <div>
          <div className="text-gray-400 mb-1">Volume</div>
          <div className="text-white font-medium">${formatNumber(token.volume24h)}</div>
          <div className="text-xs text-gray-400">{formatNumber(token.holders)} holders</div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700/30">
        <div className="flex items-center gap-4 text-xs">
          <span className="text-green-400">
            🟢 {formatNumber(token.buys24h)} buys
          </span>
          <span className="text-red-400">
            🔴 {formatNumber(token.sells24h)} sells
          </span>
        </div>
        <div className="text-xs text-gray-400">
          Click for details →
        </div>
      </div>
    </div>
  );
}
