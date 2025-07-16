import { AssetData, TreemapData, SunburstData } from '../types/AssetData';

export const processAssetData = (data: AssetData[], selectedInvestor: string) => {
  const filteredData = data.filter(item => item.투자자 === selectedInvestor);
  
  const totalInitial = filteredData.reduce((sum, item) => sum + item.연초평가, 0);
  const totalCurrent = filteredData.reduce((sum, item) => sum + item.연말평가, 0);
  const totalReturn = filteredData.reduce((sum, item) => sum + item.자산기여도, 0);
  const growthRate = totalInitial > 0 ? ((totalCurrent - totalInitial) / totalInitial) * 100 : 0;

  return {
    filteredData,
    summary: {
      totalInitial,
      totalCurrent,
      totalReturn,
      growthRate
    }
  };
};

export const createTreemapData = (data: AssetData[], type: 'current' | 'contribution'): TreemapData[] => {
  return data
    .filter(item => (type === 'current' ? item.연말평가 : Math.abs(item.자산기여도)) > 0)
    .map(item => ({
      name: item.종목명,
      value: type === 'current' ? item.연말평가 : Math.abs(item.자산기여도),
      contribution: item.자산기여도,
      fill: item.자산기여도 > 0 ? '#10B981' : item.자산기여도 < 0 ? '#EF4444' : '#F59E0B'
    }))
    .sort((a, b) => b.value - a.value);
};

export const createSunburstData = (data: AssetData[], type: 'portfolio' | 'sector'): SunburstData => {
  const groupBy = type === 'portfolio' ? '자산분류' : '섹터';
  const valueKey = type === 'portfolio' ? '연말평가' : '연말평가';
  
  const grouped = data.reduce((acc, item) => {
    const category = item[groupBy];
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, AssetData[]>);

  const totalValue = data.reduce((sum, item) => sum + Math.abs(item[valueKey]), 0);
  
  const children = Object.entries(grouped)
    .map(([category, items]) => {
      const categoryValue = items.reduce((sum, item) => sum + Math.abs(item[valueKey]), 0);
      const categoryPercentage = (categoryValue / totalValue) * 100;
      
      // 5% 미만은 기타로 분류
      if (categoryPercentage < 5) return null;
      
      const itemChildren = items
        .filter(item => Math.abs(item[valueKey]) > 0)
        .map(item => ({
          name: item.종목명,
          value: Math.abs(item[valueKey]),
          fill: item.자산기여도 >= 0 ? '#10B981' : '#EF4444'
        }));

      return {
        name: category,
        value: categoryValue,
        children: itemChildren,
        fill: '#2563EB'
      };
    })
    .filter(Boolean) as SunburstData[];

  // 나머지 항목들을 기타로 묶기
  const representedValue = children.reduce((sum, item) => sum + item.value, 0);
  const otherValue = totalValue - representedValue;
  
  if (otherValue > 0) {
    children.push({
      name: '기타',
      value: otherValue,
      fill: '#6B7280'
    });
  }

  return {
    name: type === 'portfolio' ? '자산분류' : '섹터',
    value: totalValue,
    children
  };
};

export const createPerformanceSunburstData = (data: AssetData[], type: 'portfolio' | 'sector'): SunburstData => {
  const groupBy = type === 'portfolio' ? '자산분류' : '섹터';
  
  const grouped = data.reduce((acc, item) => {
    const category = item[groupBy];
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, AssetData[]>);

  const totalValue = data.reduce((sum, item) => sum + Math.abs(item.자산기여도), 0);
  
  const children = Object.entries(grouped)
    .map(([category, items]) => {
      const categoryValue = items.reduce((sum, item) => sum + Math.abs(item.자산기여도), 0);
      const categoryPercentage = (categoryValue / totalValue) * 100;
      
      // 5% 미만은 기타로 분류
      if (categoryPercentage < 5) return null;
      
      const itemChildren = items
        .filter(item => Math.abs(item.자산기여도) > 0)
        .map(item => ({
          name: item.종목명,
          value: Math.abs(item.자산기여도),
          fill: item.자산기여도 >= 0 ? '#10B981' : '#EF4444'
        }));

      return {
        name: category,
        value: categoryValue,
        children: itemChildren,
        fill: '#2563EB'
      };
    })
    .filter(Boolean) as SunburstData[];

  // 나머지 항목들을 기타로 묶기
  const representedValue = children.reduce((sum, item) => sum + item.value, 0);
  const otherValue = totalValue - representedValue;
  
  if (otherValue > 0) {
    children.push({
      name: '기타',
      value: otherValue,
      fill: '#6B7280'
    });
  }

  return {
    name: type === 'portfolio' ? '자산분류' : '섹터',
    value: totalValue,
    children
  };
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};