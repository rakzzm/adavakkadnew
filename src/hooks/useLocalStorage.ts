import { useState, useEffect, useRef, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);
  const isMounted = useRef(false);

  // Initialize from localStorage (Client-side)
  useEffect(() => {
    isMounted.current = true;
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    } finally {
      if (isMounted.current) {
        setIsInitialized(true);
      }
    }
    return () => { isMounted.current = false; };
  }, [key]);

  // Enhanced setValue that dispatches custom event for same-tab sync
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      setStoredValue(currentValue => {
        const valueToStore = value instanceof Function ? value(currentValue) : value;
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          
          // Dispatch custom event for same-tab synchronization
          window.dispatchEvent(new CustomEvent('local-storage-change', {
            detail: { key, value: valueToStore }
          }));
        }
        
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]); // Only depend on key, not storedValue

  // Listen for changes from other tabs (storage event)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing storage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  // Listen for same-tab changes (custom event)
  useEffect(() => {
    const handleLocalStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; value: T }>;
      if (customEvent.detail.key === key) {
        setStoredValue(customEvent.detail.value);
      }
    };

    window.addEventListener('local-storage-change', handleLocalStorageChange);
    return () => window.removeEventListener('local-storage-change', handleLocalStorageChange);
  }, [key]);

  return [storedValue, setValue, isInitialized] as const;
}
