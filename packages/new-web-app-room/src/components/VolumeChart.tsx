'use client';

import { VolumePoint } from '@/lib/dummyData';

interface VolumeChartProps {
  data: VolumePoint[] | undefined;
}

export default function VolumeChart({ data }: VolumeChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="gradient-border">
        <div className="gradient-border-inner p-6">
          <h3 className="text-xl font-bold text-white mb-4">Volume Chart</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            Loading chart data...
          </div>
        </div>
      </div>
    );
  }

  const chartWidth = 600;
  const chartHeight = 200;
  const padding = 40;
  
  const volumes = data.map(d => d.buyVolume + d.sellVolume);
  const maxVolume = Math.max(...volumes);
  
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    }
    if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(0)}K`;
    }
    return `$${volume.toFixed(0)}`;
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const totalVolume = data.reduce((sum, point) => sum + point.buyVolume + point.sellVolume, 0);
  const totalBuys = data.reduce((sum, point) => sum + point.buyVolume, 0);
  const buyRatio = (totalBuys / totalVolume) * 100;

  return (
    <div className="gradient-border">
      <div className="gradient-border-inner p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Volume Chart</h3>
          <div className="text-right">
            <div className="text-lg font-bold text-white">{formatVolume(totalVolume)}</div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </div>
        </div>
        
        {/* Buy/Sell Ratio */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <span className="text-sm text-gray-300">Buys: {buyRatio.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded"></div>
            <span className="text-sm text-gray-300">Sells: {(100 - buyRatio).toFixed(1)}%</span>
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
            
            {/* Volume bars */}
            {data.map((point, index) => {
              const barWidth = (chartWidth - 2 * padding) / data.length * 0.8;
              const x = padding + (index / data.length) * (chartWidth - 2 * padding) + barWidth * 0.1;
              
              const buyHeight = (point.buyVolume / maxVolume) * (chartHeight - 2 * padding);
              const sellHeight = (point.sellVolume / maxVolume) * (chartHeight - 2 * padding);
              
              return (
                <g key={index}>
                  {/* Buy volume (green) */}
                  <rect
                    x={x}
                    y={chartHeight - padding - buyHeight}
                    width={barWidth * 0.5}
                    height={buyHeight}
                    fill="#10B981"
                    opacity={0.8}
                  />
                  {/* Sell volume (red) */}
                  <rect
                    x={x + barWidth * 0.5}
                    y={chartHeight - padding - sellHeight}
                    width={barWidth * 0.5}
                    height={sellHeight}
                    fill="#EF4444"
                    opacity={0.8}
                  />
                </g>
              );
            })}
            
            {/* Volume labels */}
            {[0, 0.5, 1].map((ratio, i) => (
              <text
                key={i}
                x={padding - 10}
                y={padding + (1 - ratio) * (chartHeight - 2 * padding) + 5}
                fill="#9CA3AF"
                fontSize="12"
                textAnchor="end"
              >
                {formatVolume(maxVolume * ratio)}
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
          Last 60 minutes • Green: Buys, Red: Sells
        </div>
      </div>
    </div>
  );
}




