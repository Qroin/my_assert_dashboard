export interface AssetData {
  투자자: string;
  계좌명: string;
  종목명: string;
  통화: string;
  연초날짜: string;
  연말날짜: string;
  연초평가: number;
  연말평가: number;
  자산기여도: number;
  섹터: string;
  자산분류: string;
  수익률: number;
}

export interface TreemapData {
  name: string;
  value: number;
  contribution: number;
  fill?: string;
}

export interface SunburstData {
  name: string;
  value: number;
  children?: SunburstData[];
  fill?: string;
}