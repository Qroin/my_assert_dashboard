import React from 'react';
import { AssetData } from '../types/AssetData';
import { formatCurrency } from '../utils/dataProcessor';

interface DataTableProps {
  data: AssetData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">상세 자산 현황</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">자산분류</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">종목명</th>

              {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">통화</th> */}
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">연초평가</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">연말평가</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">자산기여도</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">수익률</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">섹터</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{item.자산분류}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.종목명}</td>
                {/* <td className="px-4 py-3 text-sm text-gray-600">{item.통화}</td> */}
                <td className="px-4 py-3 text-sm text-right text-gray-900">
                  {formatCurrency(item.연초평가)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">
                  {formatCurrency(item.연말평가)}
                </td>
                <td className={`px-4 py-3 text-sm text-right font-medium ${
                  item.자산기여도 >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(item.자산기여도)}
                </td>
                <td className={`px-4 py-3 text-sm text-right font-medium ${
                  item.수익률 > 0 ? 'text-green-600' : item.수익률 < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {item.수익률.toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{item.섹터}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>※ 모든 금액은 한화 기준으로 표시됩니다.</p>
        <p>※ 예수금(USD)의 자산기여도는 미운용자산 중 발생한 환차익의 결과입니다.</p>
        <p>※ 자산기여도는 해당 종목이 전체 포트폴리오 수익에 기여한 정도를 나타냅니다.</p>
      </div>
    </div>
  );
};

export default DataTable;