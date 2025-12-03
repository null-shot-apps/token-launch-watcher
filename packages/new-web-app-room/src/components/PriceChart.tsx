'use client';

import { PricePoint } from '@/lib/dummyData';

interface PriceChartProps {
  data: PricePoint[] | undefined;
}

export default function PriceChart({ data }: PriceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="gradient-border">
        <div className="gradient-border-inner p-6">
          <h3 className="text-xl font-bold text-white mb-4">Price Chart</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Loading chart data...
          </div>
        </div>
      </div>
    );
  }

  // Calculate chart dimensions and scaling
  const chartWidth = 600;
  const chartHeight = 200;
  const padding = 40;
  
  const prices = data.map(d => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  
  // Generate SVG path for price line
  const pathData = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * (chartWidth - 2 * padding);
    const y = padding + (1 - (point.price - minPrice) / priceRange) * (chartHeight - 2 * padding);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Generate gradient area path
  const areaPath = pathData + 
    ` L ${padding + (chartWidth - 2 * padding)} ${chartHeight - padding}` +
    ` L ${padding} ${chartHeight - padding} Z`;

  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return `$${price.toFixed(6)}`;
    }
    return `$${price.toFixed(4)}`;
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const currentPrice = data[data.length - 1]?.price || 0;
  const startPrice = data[0]?.price || 0;
  const priceChange = ((currentPrice - startPrice) / startPrice) * 100;

  return (
    <div className="gradient-border">
      <div className="gradient-border-inner p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Price Chart</h3>
          <div className="text-right">
            <div className="text-lg font-bold text-white">{formatPrice(currentPrice)}</div>
            <div className={`text-sm ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </div>
          </div>
        </div>
        
        <div className="relative">
          <svg 
            width="100%" 
            height="250" 
            viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`}
            className="overflow-visible"
          >
            {/* Grid lines */}
            <defs>
              <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 255, 255, 0.3)" />
                <stop offset="100%" stopColor="rgba(0, 255, 255, 0.05)" />
              </linearGradient>
            </defs>
            
            {/* Horizontal grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <line
                key={i}
                x1={padding}
                y1={padding + ratio * (chartHeight - 2 * padding)}
                x2={chartWidth - padding}
                y2={padding + ratio * (chartHeight - 2 * padding)}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            ))}
            
            {/* Vertical grid lines */}
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio, i) => (
              <line
                key={i}
                x1={padding + ratio * (chartWidth - 2 * padding)}
                y1={padding}
                x2={padding + ratio * (chartWidth - 2 * padding)}
                y2={chartHeight - padding}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            ))}
            
            {/* Area fill */}
            <path
              d={areaPath}
              fill="url(#priceGradient)"
            />
            
            {/* Price line */}
            <path
              d={pathData}
              fill="none"
              stroke="#00ffff"
              strokeWidth="2"
              className="drop-shadow-lg"
            />
            
            {/* Price labels */}
            {[minPrice, (minPrice + maxPrice) / 2, maxPrice].map((price, i) => (
              <text
                key={i}
                x={padding - 10}
                y={padding + (1 - i * 0.5) * (chartHeight - 2 * padding) + 5}
                fill="#9CA3AF"
                fontSize="12"
                textAnchor="end"
              >
                {formatPrice(price)}
              </text>
            ))}
            
            {/* Time labels */}
            {[0, 0.5, 1].map((ratio, i) => {
              const dataIndex = Math.floor(ratio * (data.length - 1));
              const point = data[dataIndex];
              return (
                <text
                  key={i}
                  x={padding + ratio * (chartWidth - 2 * padding)}
                  y={chartHeight + 20}
                  fill="#9CA3AF"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {formatTime(point.timestamp)}
                </text>
              );
            })}
          </svg>
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          Last 60 minutes • Updates every minute
        </div>
      </div>
    </div>
  );
}
