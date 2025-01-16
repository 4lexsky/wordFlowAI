import { useState, useEffect, useCallback } from 'react';
import { getTokenPredictions } from '../services/openai';
import { useDebounce } from './useDebounce';

export function useTokenPredictions(input) {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedInput = useDebounce(input, 500);

  const fetchPredictions = useCallback(async (text) => {
    if (!text.trim()) {
      setPredictions([]);
      return;
    }

    setLoading(true);
    try {
      const result = await getTokenPredictions(text);
      setPredictions(result);
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPredictions(debouncedInput);
  }, [debouncedInput, fetchPredictions]);

  return { predictions, loading };
}
