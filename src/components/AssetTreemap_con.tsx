import React from 'react';
import { Treemap, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { TreemapData } from '../types/AssetData';
import { formatCurrency } from '../utils/dataProcessor';

interface AssetTreemapProps {
  data: TreemapData[];
  title: string;
  description: string;
}

const AssetTreemap_con: React.FC<AssetTreemapProps> = ({ data, title, description }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
    }
    return null;
  };

 const CustomizedContent = (props: any) => {
  const { depth, contribution, x, y, width, height, index, name, value } = props;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: data[index]?.fill || '#2563EB',
          stroke: '#fff',
          strokeWidth: 2,
          fillOpacity: 0.8,
        }}
      />
      {depth === 0 ? null : (
        width > 50 &&
        height > 30 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 6}
              textAnchor="middle"
              fill="#fff"
              fontSize="14"
              fontWeight="600"
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 8}
              textAnchor="middle"
              fill="#fff"
              fontSize="12"
            >
              {(contribution > 0 ? '' : '') + formatCurrency(contribution)}
            </text>
          </>
        )
      )}
    </g>
  );
};

  return (
    <div className="bg-white rounded-xl shadow-lg border p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="value"
            content={<CustomizedContent />}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>수익</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>손실</span>
        </div>
        {/* <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>변동없음</span> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default AssetTreemap_con;