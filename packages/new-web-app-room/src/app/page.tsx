'use client';

import { useState } from 'react';

export default function Home() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [selectedChain, setSelectedChain] = useState('ethereum');

  const handleTrackToken = () => {
    if (tokenAddress.trim()) {
      // Navigate to dashboard with token data
      window.location.href = `/dashboard?token=${encodeURIComponent(tokenAddress)}&chain=${selectedChain}`;
    }
  };

  return (
    <div className="min-h-screen bg-aurora-layer-1 relative overflow-hidden -mt-16">
      {/* Aurora layers */}
      <div className="absolute inset-0 bg-aurora-layer-2"></div>
      <div className="absolute inset-0 bg-aurora-layer-3"></div>
      <div className="absolute inset-0 bg-particles"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="neon-text text-cyan-400">Token Launch</span>
              <br />
              <span className="text-white">Watcher</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Track new token launches in real-time. Monitor price, liquidity, whale activity, and get alerts for the first critical 60 minutes.
            </p>
          </div>

          {/* Token Input Form */}
          <div className="gradient-border max-w-2xl mx-auto mb-12">
            <div className="gradient-border-inner p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Start Tracking a Token</h2>
              
              <div className="space-y-6">
                {/* Chain Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Chain
                  </label>
                  <select
                    value={selectedChain}
                    onChange={(e) => setSelectedChain(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  >
                    <option value="ethereum">Ethereum</option>
                    <option value="bsc">Binance Smart Chain</option>
                    <option value="polygon">Polygon</option>
                    <option value="arbitrum">Arbitrum</option>
                    <option value="base">Base</option>
                  </select>
                </div>

                {/* Token Address Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Token Contract Address
                  </label>
                  <input
                    type="text"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                    placeholder="0x..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      onClick={() => setTokenAddress('0x1234567890123456789012345678901234567890')}
                      className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full transition-colors"
                    >
                      Sample Token 1
                    </button>
                    <button
                      onClick={() => setTokenAddress('0xabcdefabcdefabcdefabcdefabcdefabcdefabcd')}
                      className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full transition-colors"
                    >
                      Sample Token 2
                    </button>
                  </div>
                </div>

                {/* Track Button */}
                <button
                  onClick={handleTrackToken}
                  disabled={!tokenAddress.trim()}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all neon-glow pulse-glow"
                >
                  Track Token Launch
                </button>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="gradient-border">
              <div className="gradient-border-inner p-6 text-center">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-white mb-2">Real-Time Charts</h3>
                <p className="text-gray-400">Live price and volume charts for the first 60 minutes</p>
              </div>
            </div>
            
            <div className="gradient-border">
              <div className="gradient-border-inner p-6 text-center">
                <div className="text-3xl mb-4">🐋</div>
                <h3 className="text-lg font-semibold text-white mb-2">Whale Tracking</h3>
                <p className="text-gray-400">Monitor large transactions and whale activity</p>
              </div>
            </div>
            
            <div className="gradient-border">
              <div className="gradient-border-inner p-6 text-center">
                <div className="text-3xl mb-4">🚨</div>
                <h3 className="text-lg font-semibold text-white mb-2">Smart Alerts</h3>
                <p className="text-gray-400">Get notified of significant price movements and whale buys</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



