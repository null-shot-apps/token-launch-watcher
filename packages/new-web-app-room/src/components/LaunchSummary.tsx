'use client';

import { TokenData } from '@/lib/dummyData';

interface LaunchSummaryProps {
  data: TokenData | null;
}

export default function LaunchSummary({ data }: LaunchSummaryProps) {
  if (!data) return null;

  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return `$${price.toFixed(6)}`;
    }
    return `$${price.toFixed(4)}`;
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (percent: number) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  return (
    <div className="gradient-border">
      <div className="gradient-border-inner p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">🚀</span>
          Launch Summary
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Current Price */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Current Price</div>
            <div className="text-xl font-bold text-white">{formatPrice(data.currentPrice)}</div>
          </div>

          {/* ATH */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">ATH</div>
            <div className="text-xl font-bold text-green-400">{formatPrice(data.ath)}</div>
          </div>

          {/* ATL */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">ATL</div>
            <div className="text-xl font-bold text-red-400">{formatPrice(data.atl)}</div>
          </div>

          {/* 24h Change */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">24h Change</div>
            <div className={`text-xl font-bold ${data.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercentage(data.priceChange24h)}
            </div>
          </div>

          {/* Market Cap */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Market Cap</div>
            <div className="text-xl font-bold text-white">{formatLargeNumber(data.marketCap)}</div>
          </div>

          {/* Liquidity */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Liquidity</div>
            <div className="text-xl font-bold text-cyan-400">{formatLargeNumber(data.liquidity)}</div>
            <div className={`text-xs ${data.liquidityChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercentage(data.liquidityChange)}
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">24h Volume</div>
            <div className="text-lg font-bold text-purple-400">{formatLargeNumber(data.volume24h)}</div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Holders</div>
            <div className="text-lg font-bold text-white">{data.holders.toLocaleString()}</div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="text-sm text-gray-400 mb-1">Chain</div>
            <div className="text-lg font-bold text-white capitalize">{data.chain}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
