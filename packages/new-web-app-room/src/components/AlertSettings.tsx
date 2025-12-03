'use client';

import { useState } from 'react';

interface AlertSettingsProps {
  tokenAddress: string;
}

export default function AlertSettings({ }: AlertSettingsProps) {
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [telegramAlerts, setTelegramAlerts] = useState(false);
  const [whaleThreshold, setWhaleThreshold] = useState(50000);
  const [priceChangeThreshold, setPriceChangeThreshold] = useState(20);
  const [email, setEmail] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveSettings = () => {
    // Simulate saving settings
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="gradient-border">
      <div className="gradient-border-inner p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="mr-2">🚨</span>
          Alert Settings
        </h3>
        
        <div className="space-y-6">
          {/* Email Alerts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-white font-medium">Email Alerts</label>
              <button
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailAlerts ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {emailAlerts && (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
              />
            )}
          </div>

          {/* Telegram Alerts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-white font-medium">Telegram Alerts</label>
              <button
                onClick={() => setTelegramAlerts(!telegramAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  telegramAlerts ? 'bg-cyan-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    telegramAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {telegramAlerts && (
              <input
                type="text"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                placeholder="@username"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
              />
            )}
          </div>

          {/* Alert Thresholds */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Alert Triggers</h4>
            
            {/* Whale Transaction Threshold */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Whale Transaction Alert (USD)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={whaleThreshold}
                  onChange={(e) => setWhaleThreshold(Number(e.target.value))}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
                  min="1000"
                  step="1000"
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Get notified when transactions exceed this amount
              </div>
            </div>

            {/* Price Change Threshold */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Price Change Alert (%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceChangeThreshold}
                  onChange={(e) => setPriceChangeThreshold(Number(e.target.value))}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
                  min="5"
                  max="100"
                  step="5"
                />
                <span className="text-gray-400 text-sm">%</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Get notified when price changes by this percentage
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveSettings}
            disabled={(!emailAlerts && !telegramAlerts) || (emailAlerts && !email) || (telegramAlerts && !telegramUsername)}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-400 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Save Alert Settings
          </button>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-lg text-sm">
              ✅ Alert settings saved successfully!
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
            <div className="text-blue-400 text-sm font-medium mb-2">💡 How it works</div>
            <ul className="text-blue-300 text-xs space-y-1">
              <li>• Alerts are active for the 60-minute tracking window</li>
              <li>• Whale alerts trigger on buy/sell transactions above your threshold</li>
              <li>• Price alerts trigger on significant price movements</li>
              <li>• You&apos;ll receive real-time notifications via your chosen method</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


