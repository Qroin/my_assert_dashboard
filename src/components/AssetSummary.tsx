import React from 'react';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../utils/dataProcessor';

interface AssetSummaryProps {
  totalInitial: number;
  totalCurrent: number;
  totalReturn: number;
  growthRate: number;
}

const AssetSummary: React.FC<AssetSummaryProps> = ({
  totalInitial,
  totalCurrent,
  totalReturn,
  growthRate
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">연초 자산</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInitial)}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">현재 자산</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCurrent)}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">총 수익</p>
            <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(totalReturn)}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            totalReturn >= 0 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {totalReturn >= 0 ? (
              <TrendingUp className="w-6 h-6 text-green-600" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-600" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">성장률</p>
            <p className={`text-2xl font-bold ${growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercentage(growthRate)}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            growthRate >= 0 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {growthRate >= 0 ? (
              <TrendingUp className="w-6 h-6 text-green-600" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetSummary;