'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PriceChart from '@/components/PriceChart';
import VolumeChart from '@/components/VolumeChart';
import WhaleTable from '@/components/WhaleTable';
import LaunchSummary from '@/components/LaunchSummary';
import AlertSettings from '@/components/AlertSettings';
import { generateDummyData, TokenData } from '@/lib/dummyData';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const tokenAddress = searchParams.get('token');
  const chain = searchParams.get('chain') || 'ethereum';
  
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds

  useEffect(() => {
    if (tokenAddress) {
      // Simulate loading and generate dummy data
      setTimeout(() => {
        const dummyData = generateDummyData(tokenAddress, chain);
        setTokenData(dummyData);
        setIsLoading(false);
      }, 1500);
    }
  }, [tokenAddress, chain]);

  // Countdown timer for 60-minute tracking window
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!tokenAddress) {
    return (
      <div className="min-h-screen bg-aurora-layer-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora-layer-2"></div>
        <div className="absolute inset-0 bg-aurora-layer-3"></div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">No Token Specified</h1>
            <p className="text-gray-400 mb-8">Please provide a token address to track.</p>
            <Link 
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-purple-500 transition-all neon-glow"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-aurora-layer-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora-layer-2"></div>
        <div className="absolute inset-0 bg-aurora-layer-3"></div>
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-white mb-2">Loading Token Data...</h2>
            <p className="text-gray-400">Fetching live data from {chain} blockchain</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aurora-layer-1 relative">
      <div className="absolute inset-0 bg-aurora-layer-2"></div>
      <div className="absolute inset-0 bg-aurora-layer-3"></div>
      
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {tokenData?.name} ({tokenData?.symbol})
            </h1>
            <p className="text-gray-400 text-sm font-mono">{tokenAddress}</p>
          </div>
          
          {/* Countdown Timer */}
          <div className="gradient-border mt-4 sm:mt-0">
            <div className="gradient-border-inner px-6 py-3 text-center">
              <div className="text-sm text-gray-400">Tracking Window</div>
              <div className="text-2xl font-bold text-cyan-400 neon-text">
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>
        </div>

        {/* Launch Summary Card */}
        <div className="mb-8">
          <LaunchSummary data={tokenData} />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <PriceChart data={tokenData?.priceHistory} />
          <VolumeChart data={tokenData?.volumeHistory} />
        </div>

        {/* Whale Activity and Alerts */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <WhaleTable transactions={tokenData?.whaleTransactions} />
          </div>
          <div className="order-1 lg:order-2">
            <AlertSettings tokenAddress={tokenAddress} />
          </div>
        </div>
      </div>
    </div>
  );
}




