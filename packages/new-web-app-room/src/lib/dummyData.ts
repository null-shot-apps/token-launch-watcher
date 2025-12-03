export interface TokenData {
  name: string;
  symbol: string;
  address: string;
  chain: string;
  currentPrice: number;
  ath: number;
  atl: number;
  priceChange24h: number;
  marketCap: number;
  liquidity: number;
  liquidityChange: number;
  volume24h: number;
  holders: number;
  priceHistory: PricePoint[];
  volumeHistory: VolumePoint[];
  whaleTransactions: WhaleTransaction[];
}

export interface PricePoint {
  timestamp: number;
  price: number;
  volume: number;
}

export interface VolumePoint {
  timestamp: number;
  volume: number;
  buys: number;
  sells: number;
}

export interface WhaleTransaction {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  value: number;
  wallet: string;
  timestamp: number;
  txHash: string;
}

export function generateDummyData(tokenAddress: string, chain: string): TokenData {
  const now = Date.now();
  const startTime = now - (60 * 60 * 1000); // 1 hour ago
  
  // Generate realistic token data
  const basePrice = Math.random() * 0.1 + 0.001; // Between $0.001 and $0.101
  const ath = basePrice * (1 + Math.random() * 5); // Up to 5x from base
  const atl = basePrice * (0.1 + Math.random() * 0.4); // 10-50% of base
  const currentPrice = basePrice * (0.5 + Math.random() * 2); // 50-250% of base
  
  // Generate price history (60 data points for 60 minutes)
  const priceHistory: PricePoint[] = [];
  let price = basePrice;
  
  for (let i = 0; i < 60; i++) {
    const timestamp = startTime + (i * 60 * 1000);
    
    // Add some volatility
    const volatility = (Math.random() - 0.5) * 0.2; // ±20% change
    price = Math.max(price * (1 + volatility), 0.0001);
    
    const volume = Math.random() * 100000 + 10000; // $10k - $110k volume per minute
    
    priceHistory.push({
      timestamp,
      price,
      volume
    });
  }
  
  // Generate volume history
  const volumeHistory: VolumePoint[] = [];
  for (let i = 0; i < 60; i++) {
    const timestamp = startTime + (i * 60 * 1000);
    const totalVolume = Math.random() * 200000 + 20000; // $20k - $220k
    const buyRatio = 0.3 + Math.random() * 0.4; // 30-70% buys
    
    volumeHistory.push({
      timestamp,
      volume: totalVolume,
      buys: totalVolume * buyRatio,
      sells: totalVolume * (1 - buyRatio)
    });
  }
  
  // Generate whale transactions
  const whaleTransactions: WhaleTransaction[] = [];
  const whaleCount = Math.floor(Math.random() * 15) + 5; // 5-20 whale transactions
  
  for (let i = 0; i < whaleCount; i++) {
    const timestamp = startTime + Math.random() * (60 * 60 * 1000);
    const type = Math.random() > 0.6 ? 'buy' : 'sell';
    const amount = Math.random() * 1000000 + 100000; // 100k - 1.1M tokens
    const value = amount * (basePrice * (0.8 + Math.random() * 0.4)); // Price variation
    
    whaleTransactions.push({
      id: `whale-${i}`,
      type,
      amount,
      value,
      wallet: generateWalletAddress(),
      timestamp,
      txHash: generateTxHash()
    });
  }
  
  // Sort whale transactions by timestamp (newest first)
  whaleTransactions.sort((a, b) => b.timestamp - a.timestamp);
  
  return {
    name: generateTokenName(),
    symbol: generateTokenSymbol(),
    address: tokenAddress,
    chain,
    currentPrice,
    ath,
    atl,
    priceChange24h: (Math.random() - 0.5) * 200, // ±100% change
    marketCap: currentPrice * (Math.random() * 10000000 + 1000000), // 1M - 11M market cap
    liquidity: Math.random() * 500000 + 100000, // $100k - $600k liquidity
    liquidityChange: (Math.random() - 0.5) * 100, // ±50% liquidity change
    volume24h: Math.random() * 2000000 + 200000, // $200k - $2.2M volume
    holders: Math.floor(Math.random() * 5000) + 500, // 500 - 5500 holders
    priceHistory,
    volumeHistory,
    whaleTransactions
  };
}

function generateTokenName(): string {
  const prefixes = ['Moon', 'Rocket', 'Diamond', 'Golden', 'Cyber', 'Neon', 'Quantum', 'Stellar'];
  const suffixes = ['Coin', 'Token', 'Finance', 'Protocol', 'Network', 'Chain', 'Swap', 'Vault'];
  
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
}

function generateTokenSymbol(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < (Math.random() > 0.5 ? 3 : 4); i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateWalletAddress(): string {
  const chars = '0123456789abcdef';
  let result = '0x';
  for (let i = 0; i < 40; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateTxHash(): string {
  const chars = '0123456789abcdef';
  let result = '0x';
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
