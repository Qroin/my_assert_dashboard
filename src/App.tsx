import React, { useState } from 'react';
import { AssetData } from './types/AssetData';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';

function App() {
  const [assetData, setAssetData] = useState<AssetData[]>([]);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleDataLoad = (data: AssetData[]) => {
    setAssetData(data);
    setShowDashboard(true);
  };

  const handleBack = () => {
    setShowDashboard(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showDashboard ? (
        <Dashboard data={assetData} onBack={handleBack} />
      ) : (
        <FileUpload onDataLoad={handleDataLoad} />
      )}
    </div>
  );
}

export default App;