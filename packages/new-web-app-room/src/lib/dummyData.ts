export interface Token {
  address: string;
  name: string;
  symbol: string;
  chain: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  launchTime: number;
  ath: number;
  atl: number;
  buys24h: number;
  sells24h: number;
  liquidityChange24h: number;
}

export interface WhaleTransaction {
  hash: string;
  wallet: string;
  type: 'buy' | 'sell';
  amount: number;
  value: number;
  timestamp: number;
  tokenSymbol: string;
}

export interface PricePoint {
  timestamp: number;
  price: number;
}

export interface VolumePoint {
  timestamp: number;
  buyVolume: number;
  sellVolume: number;
}

// Legacy interface for backward compatibility
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

const TOKEN_NAMES = [
  'PepeCoin', 'DogeKing', 'MoonShot', 'RocketFuel', 'DiamondHands',
  'ToTheMoon', 'SafeGem', 'CryptoKing', 'BullRun', 'LamboTime',
  'HodlCoin', 'DegenGem', 'AlphaCoin', 'BetaToken', 'GammaGem',
  'ShibaInu', 'FlokiCoin', 'BabyDoge', 'ElonMars', 'SafeMoon',
  'ApeStrong', 'DiamondDoge', 'MoonWalk', 'RocketShip', 'LunarCoin'
];

const TOKEN_SYMBOLS = [
  'PEPE', 'DOGE', 'MOON', 'FUEL', 'DIAMOND',
  'TTM', 'SAFE', 'KING', 'BULL', 'LAMBO',
  'HODL', 'DEGEN', 'ALPHA', 'BETA', 'GAMMA',
  'SHIB', 'FLOKI', 'BABY', 'ELON', 'SAFEM',
  'APE', 'DDOGE', 'WALK', 'SHIP', 'LUNAR'
];

const CHAINS = [
  'ethereum', 'solana', 'bsc', 'polygon', 'arbitrum', 'base', 'monad'
];

export function generateMockTokens(count: number = 1): Token[] {
  return Array.from({ length: count }, () => {
    const nameIndex = Math.floor(Math.random() * TOKEN_NAMES.length);
    const price = 0.000001 + Math.random() * 0.01;
    const ath = price * (1.2 + Math.random() * 3);
    const atl = price * (0.1 + Math.random() * 0.8);
    const volume24h = 10000 + Math.random() * 1000000;
    
    return {
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      name: TOKEN_NAMES[nameIndex],
      symbol: TOKEN_SYMBOLS[nameIndex],
      chain: CHAINS[Math.floor(Math.random() * CHAINS.length)],
      price,
      priceChange24h: -50 + Math.random() * 100,
      volume24h,
      marketCap: 50000 + Math.random() * 10000000,
      liquidity: 5000 + Math.random() * 500000,
      holders: 10 + Math.floor(Math.random() * 1000),
      launchTime: Date.now() - Math.random() * 60000, // Within last minute
      ath,
      atl,
      buys24h: Math.floor(volume24h * 0.6 / price),
      sells24h: Math.floor(volume24h * 0.4 / price),
      liquidityChange24h: -20 + Math.random() * 40,
    };
  });
}

export function generateMockToken(): Token {
  return generateMockTokens(1)[0];
}

export function generateMockWhaleTransactions(count: number = 10): WhaleTransaction[] {
  return Array.from({ length: count }, () => ({
    hash: `0x${Math.random().toString(16).substr(2, 64)}`,
    wallet: `0x${Math.random().toString(16).substr(2, 40)}`,
    type: Math.random() > 0.5 ? 'buy' : 'sell',
    amount: 1000 + Math.random() * 100000,
    value: 1000 + Math.random() * 50000,
    timestamp: Date.now() - Math.random() * 3600000,
    tokenSymbol: TOKEN_SYMBOLS[Math.floor(Math.random() * TOKEN_SYMBOLS.length)],
  }));
}

export function generateMockPriceHistory(hours: number = 1): PricePoint[] {
  const points: PricePoint[] = [];
  const basePrice = 0.000001 + Math.random() * 0.01;
  const now = Date.now();
  const interval = (hours * 60 * 60 * 1000) / 60; // 60 points per hour
  
  for (let i = 0; i < 60; i++) {
    const timestamp = now - (59 - i) * interval;
    const volatility = 0.95 + Math.random() * 0.1; // ±5% change
    const price = i === 0 ? basePrice : points[i - 1].price * volatility;
    points.push({ timestamp, price });
  }
  
  return points;
}

export function generateMockVolumeHistory(hours: number = 1): VolumePoint[] {
  const points: VolumePoint[] = [];
  const now = Date.now();
  const interval = (hours * 60 * 60 * 1000) / 60; // 60 points per hour
  
  for (let i = 0; i < 60; i++) {
    const timestamp = now - (59 - i) * interval;
    const buyVolume = Math.random() * 10000;
    const sellVolume = Math.random() * 8000;
    points.push({ timestamp, buyVolume, sellVolume });
  }
  
  return points;
}

// Legacy function for backward compatibility
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
    
    priceHistory.push({
      timestamp,
      price
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
      buyVolume: totalVolume * buyRatio,
      sellVolume: totalVolume * (1 - buyRatio)
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
      hash: generateTxHash(),
      type,
      amount,
      value,
      wallet: generateWalletAddress(),
      timestamp,
      tokenSymbol: generateTokenSymbol()
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


