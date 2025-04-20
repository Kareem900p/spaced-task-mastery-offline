
import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { isOnline, addOfflineListener, removeOfflineListener, addOnlineListener, removeOnlineListener } from '../utils/networkUtils';

const OfflineIndicator: React.FC = () => {
  const [offline, setOffline] = useState(!isOnline());

  useEffect(() => {
    const handleOffline = () => setOffline(true);
    const handleOnline = () => setOffline(false);

    addOfflineListener(handleOffline);
    addOnlineListener(handleOnline);

    return () => {
      removeOfflineListener(handleOffline);
      removeOnlineListener(handleOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="offline-indicator">
      <div className="flex items-center">
        <WifiOff className="h-4 w-4 mr-2" />
        <span>أنت غير متصل بالإنترنت. التطبيق يعمل في الوضع الغير متصل.</span>
      </div>
    </div>
  );
};

export default OfflineIndicator;
