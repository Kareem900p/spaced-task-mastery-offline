
/**
 * Utility functions for network connectivity
 */

export const isOnline = (): boolean => {
  return navigator.onLine;
};

export const addOnlineListener = (callback: () => void): void => {
  window.addEventListener('online', callback);
};

export const removeOnlineListener = (callback: () => void): void => {
  window.removeEventListener('online', callback);
};

export const addOfflineListener = (callback: () => void): void => {
  window.addEventListener('offline', callback);
};

export const removeOfflineListener = (callback: () => void): void => {
  window.removeEventListener('offline', callback);
};

