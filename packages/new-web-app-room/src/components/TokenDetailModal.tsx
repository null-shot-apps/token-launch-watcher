'use client';

import { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, Activity, Users, DollarSign } from 'lucide-react';
import { Token, generateMockPriceHistory, generateMockVolumeHistory, generateMockWhaleTransactions } from '@/lib/mockData';
import PriceChart from './PriceChart';
import VolumeChart from './VolumeChart';
import WhaleTable from './WhaleTable';

interface TokenDetailModalProps {
  token: Token;
  isWatchlisted?: boolean;
  onWatchlist?: () => void;
  onClose: () => void;
}

export default function TokenDetailModal({ token, isWatchlisted, onWatchlist, onClose }: TokenDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'trades' | 'liquidity'>('overview');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const priceChangeColor = token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400';
  const priceChangeIcon = token.priceChange24h >= 0 ? TrendingUp : TrendingDown;
  const PriceChangeIcon = priceChangeIcon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {token.symbol.slice(0, 2)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{token.name}</h2>
              <p className="text-gray-400">{token.symbol} • {token.chain}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-gray-700">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-400">Price</span>
            </div>
            <div className="text-xl font-bold text-white">${token.price.toFixed(6)}</div>
            <div className={`flex items-center space-x-1 text-sm ${priceChangeColor}`}>
              <PriceChangeIcon className="w-3 h-3" />
              <span>{token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-400">Market Cap</span>
            </div>
            <div className="text-xl font-bold text-white">
              ${(token.marketCap / 1000000).toFixed(2)}M
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-400">Liquidity</span>
            </div>
            <div className="text-xl font-bold text-white">
              ${(token.liquidity / 1000).toFixed(0)}K
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-400">Holders</span>
            </div>
            <div className="text-xl font-bold text-white">{token.holders.toLocaleString()}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'trades', label: 'Trades' },
            { id: 'liquidity', label: 'Liquidity' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Price Chart</h3>
                  <PriceChart data={generateMockPriceHistory()} />
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Volume</h3>
                  <VolumeChart data={generateMockVolumeHistory()} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trades' && (
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Whale Trades</h3>
              <WhaleTable transactions={generateMockWhaleTransactions()} />
            </div>
          )}

          {activeTab === 'liquidity' && (
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Liquidity Changes</h3>
              <div className="text-gray-400">Liquidity tracking data will be displayed here...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}






