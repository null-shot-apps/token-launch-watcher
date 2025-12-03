'use client';

import { WhaleTransaction } from '@/lib/dummyData';

interface WhaleTableProps {
  transactions: WhaleTransaction[] | undefined;
}

export default function WhaleTable({ transactions }: WhaleTableProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="gradient-border">
        <div className="gradient-border-inner p-6">
          <h3 className="text-xl font-bold text-white mb-4">🐋 Whale Activity</h3>
          <div className="text-center text-gray-400 py-8">
            No whale transactions detected yet...
          </div>
        </div>
      </div>
    );
  }

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toFixed(0);
  };

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ago`;
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const truncateTxHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
  };

  return (
    <div className="gradient-border">
      <div className="gradient-border-inner p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <span className="mr-2">🐋</span>
            Whale Activity
          </h3>
          <div className="text-sm text-gray-400">
            {transactions.length} transactions
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Type</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Amount</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Value</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Wallet</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Time</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">Tx</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 10).map((tx) => (
                <tr key={tx.hash} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      tx.type === 'buy' 
                        ? 'bg-green-900/30 text-green-400 border border-green-700' 
                        : 'bg-red-900/30 text-red-400 border border-red-700'
                    }`}>
                      {tx.type === 'buy' ? '📈 BUY' : '📉 SELL'}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-white font-mono text-sm">
                    {formatAmount(tx.amount)}
                  </td>
                  <td className="py-3 px-2 text-white font-semibold">
                    {formatValue(tx.value)}
                  </td>
                  <td className="py-3 px-2">
                    <button 
                      className="text-cyan-400 hover:text-cyan-300 font-mono text-sm transition-colors"
                      onClick={() => navigator.clipboard.writeText(tx.wallet)}
                      title="Click to copy"
                    >
                      {truncateAddress(tx.wallet)}
                    </button>
                  </td>
                  <td className="py-3 px-2 text-gray-400 text-sm">
                    {formatTime(tx.timestamp)}
                  </td>
                  <td className="py-3 px-2">
                    <button 
                      className="text-purple-400 hover:text-purple-300 font-mono text-sm transition-colors"
                      onClick={() => navigator.clipboard.writeText(tx.hash)}
                      title="Click to copy"
                    >
                      {truncateTxHash(tx.hash)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {transactions.length > 10 && (
          <div className="mt-4 text-center">
            <button className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
              View all {transactions.length} transactions →
            </button>
          </div>
        )}
        
        <div className="mt-4 text-xs text-gray-500">
          💡 Whale transactions are trades above $10,000 in value
        </div>
      </div>
    </div>
  );
}


