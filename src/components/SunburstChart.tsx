import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { SunburstData } from '../types/AssetData';
import { formatCurrency, formatPercentage } from '../utils/dataProcessor';

interface SunburstChartProps {
  data: SunburstData;
  title: string;
  description: string;
}

const SunburstChart: React.FC<SunburstChartProps> = ({ data, title, description }) => {
  // 카테고리별 색상 그룹
  const getCategoryColor = (categoryIndex: number) => {
    const colorGroups = [
      ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'],
      ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
      ['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A'],
      ['#EF4444', '#F87171', '#FCA5A5', '#FECACA'],
      ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE'],
      ['#06B6D4', '#22D3EE', '#67E8F9', '#A5F3FC']
    ];
    return colorGroups[categoryIndex % colorGroups.length];
  };

  // 외부 원 데이터 가공
  const outerPieData = data.children?.flatMap((category, categoryIndex) =>
    category.children && category.children.length > 0
      ? category.children.map((item, itemIndex) => ({
          ...item,
          category: category.name,
          totalValue: data.value,
          categoryIndex,
          itemIndex
        }))
      : [{
          ...category,
          category: category.name,
          totalValue: data.value,
          categoryIndex,
          itemIndex: 0
        }]
  ) || [];

  // 내부 원 데이터 가공
  const innerPieData = data.children?.map((category, index) => ({
    ...category,
    totalValue: data.value,
    categoryIndex: index
  })) || [];

  // 툴팁 컴포넌트
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-semibold">{d.name}</p>
          <p className="text-sm text-gray-600">
            금액: {formatCurrency(d.value)}
          </p>
          <p className="text-sm text-gray-600">
            비중: {formatPercentage((d.value / d.payload.totalValue) * 100)}
          </p>
        </div>
      );
    }
    return null;
  };

  // 내부 원 라벨
  const renderInnerLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }: any) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text 
          x={x} 
          y={y - 6} 
          fill="white" 
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12"
          fontWeight="600"
        >
          {name.length > 10 ? `${name.substring(0, 10)}...` : name}
        </text>
        <text 
          x={x} 
          y={y + 8} 
          fill="white" 
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="12"
          fontWeight="500"
        >
          {(percent * 100).toFixed(1)}%
        </text>
      </g>
    );
  };

  // 외부 원 라벨
  const renderOuterLabel = ({ cx, cy, midAngle, outerRadius, name, percent }: any) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={x}
          y={y - 4}
          fill="#374151"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          fontSize="12"
          fontWeight="500"
        >
          {name.length > 10 ? `${name.substring(0,10)}...` : name}
        </text>
        <text
          x={x}
          y={y + 8}
          fill="#6B7280"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          fontSize="12"
          fontWeight="400"
        >
          {(percent * 100).toFixed(1)}%
        </text>
      </g>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* 외부 원 */}
            <Pie
              data={outerPieData}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={175}
              paddingAngle={0.3}
              dataKey="value"
              labelLine={false}
              // label={renderOuterLabel}
              label={renderInnerLabel}
            >
              {outerPieData.map((entry, i) => {
                const categoryIndex = entry.categoryIndex ?? 0;
                const itemIndex = entry.itemIndex ?? 0;
                const categoryColors = getCategoryColor(categoryIndex);
                const color = categoryColors[itemIndex % categoryColors.length] || '#999999';
                return (
                  <Cell key={`outer-cell-${i}`} fill={color} />
                );
              })}
            </Pie>

            {/* 내부 원 */}
            <Pie
              data={innerPieData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              paddingAngle={0.8}
              dataKey="value"
              labelLine={false}
              label={renderInnerLabel}
            >
              {innerPieData.map((entry, i) => {
                const categoryColors = getCategoryColor(entry.categoryIndex);
                return (
                  <Cell key={`inner-cell-${i}`} fill={categoryColors[0]} />
                );
              })}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p><br></br></p>
        <p>※ 전체 구성의 95%만 표시하며, 나머지는 기타로 분류됩니다.</p>
      </div>
    </div>
  );
};

export default SunburstChart;
