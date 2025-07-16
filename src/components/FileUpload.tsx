import React, { useRef } from 'react';
import { Upload, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';
import { AssetData } from '../types/AssetData';

interface FileUploadProps {
  onDataLoad: (data: AssetData[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoad }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        
        const processedData: AssetData[] = jsonData.map((row: any) => ({
          투자자: row['투자자'] || '',
          // 계좌명: row['계좌명'] || '',
          종목명: row['종목명'] || '',
          통화: row['통화'] || '',
          연초날짜: row['연초날짜'] || '',
          연말날짜: row['연말날짜'] || '',
          연초평가: parseFloat(row['연초평가']) || 0,
          연말평가: parseFloat(row['연말평가']) || 0,
          자산기여도: parseFloat(row['자산기여도']) || 0,
          수익률: parseFloat(row['수익률']) || 0,
          섹터: row['섹터'] || '',
          자산분류: row['자산분류'] || ''
        }));

        onDataLoad(processedData);
      } catch (error) {
        console.error('파일 파싱 오류:', error);
        alert('파일을 읽는 중 오류가 발생했습니다.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const loadSampleData = () => {
    const sampleData: AssetData[] = [
       {
          투자자: '전체',
          종목명: '이마트',
          통화: 'KRW',
          연초날짜: '2025-01-01',
          연말날짜: '2025-07-16',
          자산분류: '국내주식',
          섹터: '생필품',
          연초평가: 0,
          연말평가: 212000,
          자산기여도: 112000,
          수익률: 112.0
        },
        {
          투자자: '전체',
          종목명: '삼성전자',
          통화: 'KRW',
          연초날짜: '2025-01-01',
          연말날짜: '2025-07-16',
          자산분류: '국내주식',
          섹터: '기술주',
          연초평가: 528858,
          연말평가: 776400,
          자산기여도: 157542,
          수익률: 25.5,
        },
        {
          투자자: '전체',
          종목명: '애플',
          통화: 'USD',
          연초날짜: '2025-01-01',
          연말날짜: '2025-07-16',
          자산분류: '해외주식',
          섹터: '기술주',
          연초평가: 368695,
          연말평가: 577282,
          자산기여도: -20569,
          수익률: -3.4,
        },
        {
          투자자: '전체',
          종목명: '예수금(KRW)',
          통화: 'KRW',
          연초날짜: '2025-01-01',
          연말날짜: '2025-07-16',
          자산분류: '예수금',
          섹터: '예수금',
          연초평가: 1875000,
          연말평가: 1685000,
          자산기여도: 0,
          수익률: 0.0,
        },
        {
          투자자: '전체',
          종목명: '예수금(USD)',
          통화: 'USD',
          연초날짜: '2025-01-01',
          연말날짜: '2025-07-16',
          자산분류: '예수금',
          섹터: '예수금',
          연초평가: 442434,
          연말평가: 179537,
          자산기여도: -12183,
          수익률: -6.4,
        },
        {
          투자자: '영희',
          종목명: '애플',
          통화: 'USD',
          연초날짜: '2025-01-01',
          연말날짜: '2025-07-16',
          자산분류: '해외주식',
          섹터: '기술주',
          연초평가: 368695,
          연말평가: 288641,
          자산기여도: -56623,
          수익률: -16.0
        },
        {
          투자자: '영희',
          종목명: '예수금(KRW)',
          통화: 'KRW',
          연초날짜: '2025-01-01',
          연말날짜: '2025-07-16',
          자산분류: '예수금',
          섹터: '예수금',
          연초평가: 1605000,
          연말평가: 1605000,
          자산기여도: 0,
          수익률: 0.0
        },
        {
          투자자: '철수',
          종목명: '이마트',
          통화: 'KRW',
          연초날짜: '2025-01-01',
          연말날짜: '2025-07-16',
          자산분류: '국내주식',
          섹터: '생필품',
          연초평가: 0,
          연말평가: 212000,
          자산기여도: 112000,
          수익률: 112.0
        },
        {
          투자자: '철수',
          종목명: '삼성전자',
          통화: 'KRW',
          연초날짜: '2025-01-01',
          연말날짜: '2025-07-16',
          자산분류: '국내주식',
          섹터: '기술주',
          연초평가: 528858,
          연말평가: 776400,
          자산기여도: 157542,
          수익률: 25.0
        },
        {
          투자자: '철수',
          종목명: '애플',
          통화: 'USD',
          연초날짜: '2025-01-01',
          연말날짜: '2025-07-16',
          자산분류: '해외주식',
          섹터: '기술주',
          연초평가: 0,
          연말평가: 288641,
          자산기여도: 36054,
          수익률: 14.0
        },
        {
          투자자: '철수',
          종목명: '예수금(KRW)',
          통화: 'KRW',
          연초날짜: '2025-01-01',
          연말날짜: '2025-07-16',
          자산분류: '예수금',
          섹터: '예수금',
          연초평가: 270000,
          연말평가: 80000,
          자산기여도: 0,
          수익률: 0.0
        },
        {
          투자자: '철수',
          종목명: '예수금(USD)',
          통화: 'USD',
          연초날짜: '2025-01-01',
          연말날짜: '2025-07-16',
          자산분류: '예수금',
          섹터: '예수금',
          연초평가: 442434,
          연말평가: 179537,
          자산기여도: -12183,
          수익률: -6.0
        }
      ];

    onDataLoad(sampleData);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">자산평가 시각화</h1>
        <p className="text-lg text-gray-600">Excel 파일을 업로드하여 자산 포트폴리오를 분석해보세요</p>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Excel 파일을 선택하세요</p>
          <input
            ref={fileInputRef}
            type="file"
            // accept=".xlsx,.xls"
            accept=".xlsx,.xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            파일 선택
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-500 mb-2">또는</p>
          <button
            onClick={loadSampleData}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            샘플 데이터로 시작하기
          </button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Excel 파일 형식 안내</h3>
        <p className="text-sm text-gray-600 mb-2">다음 컬럼들이 포함되어야 합니다:</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <span>• 투자자</span>
          <span>• 종목명</span>
          <span>• 통화</span>
          <span>• 연초날짜</span>
          <span>• 연말날짜</span>
          <span>• 연초평가</span>
          <span>• 연말평가</span>
          <span>• 자산기여도</span>
          <span>• 수익률</span>
          <span>• 섹터</span>
          <span>• 자산분류</span>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;