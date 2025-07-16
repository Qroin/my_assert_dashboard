import React, { useState } from 'react';
import { AssetData } from '../types/AssetData';
import { processAssetData, createTreemapData, createSunburstData, createPerformanceSunburstData } from '../utils/dataProcessor';
import AssetSummary from './AssetSummary';
import AssetTreemap from './AssetTreemap';
import AssetTreemap_con from './AssetTreemap_con';
import SunburstChart from './SunburstChart';
import DataTable from './DataTable';
import { ArrowLeft, User } from 'lucide-react';

interface DashboardProps {
  data: AssetData[];
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onBack }) => {
  const investors = [...new Set(data.map(item => item.투자자))];
  const [selectedInvestor, setSelectedInvestor] = useState(investors[0]);

  const { filteredData, summary } = processAssetData(data, selectedInvestor);
  
  const currentAssetTreemapData = createTreemapData(filteredData, 'current');
  const contributionTreemapData = createTreemapData(filteredData, 'contribution');
  const portfolioAssetSunburstData = createSunburstData(filteredData, 'portfolio');
  const portfolioSectorSunburstData = createSunburstData(filteredData, 'sector');
  const performanceAssetSunburstData = createPerformanceSunburstData(filteredData, 'portfolio');
  const performanceSectorSunburstData = createPerformanceSunburstData(filteredData, 'sector');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">자산평가 대시보드</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-600" />
              <select
                value={selectedInvestor}
                onChange={(e) => setSelectedInvestor(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {investors.map(investor => (
                  <option key={investor} value={investor}>{investor}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* 자산 요약 */}
        <AssetSummary {...summary} />

        {/*1. Treemap 차트들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AssetTreemap
            data={currentAssetTreemapData}
            title="현재 자산"
            description="각 종목의 현재 평가액을 비중에 따라 시각화한 트리맵입니다."
          />
          <AssetTreemap_con
            data={contributionTreemapData}
            title="투자 성과"
            description="각 종목이 자산 성장에 기여한 정도를 나타내는 트리맵입니다."
          />
        </div>

        {/* 2. 현재 자산 분석 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">현재 자산 분석</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SunburstChart
              data={portfolioAssetSunburstData || []}
              title="현재 자산 / 자산분류별"
              description="자산분류별 구성과 개별 종목별 비중을 보여주는 이중 원그래프입니다."
            />
            <SunburstChart
              data={portfolioSectorSunburstData || []}
              title="현재 자산 / 섹터별"
              description="섹터별 구성과 개별 종목별 비중을 보여주는 이중 원그래프입니다."
            />
          </div>
        </div>

        {/* 3. 투자 성과 분석 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">투자 성과 분석</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SunburstChart
              data={performanceAssetSunburstData || []}
              title="투자 성과 / 자산분류별"
              description="자산분류별 구성과 투자성과를 보여주는 분석 차트입니다."
            />
            <SunburstChart
              data={performanceSectorSunburstData || []}
              title="투자 성과 / 섹터별"
              description="섹터별 구성과 투자성과를 보여주는 분석 차트입니다."
            />
          </div>
</div>

        {/* 데이터 테이블 */}
        <DataTable data={filteredData} />
      </div>
    </div>
  );
};

export default Dashboard;