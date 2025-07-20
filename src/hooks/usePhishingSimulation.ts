import { useState, useEffect, useCallback } from 'react';
import simulationAPI from '../api/axiosSimulation';

export interface Attempt {
  email: string;
  content: string;
  status: string;
}

export function usePhishingSimulation() {
  const [email, setEmail] = useState('');
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  const fetchAttempts = useCallback(async () => {
    const { data } = await simulationAPI.get('/phishing/attempts');
    setAttempts(data);
  }, []);

  const sendPhishingEmail = useCallback(async () => {
    if (!email) {
      alert('Please enter a target email');
      return;
    }
    await simulationAPI.post('/phishing/send', { to: email });
    await fetchAttempts();
  }, [email, fetchAttempts]);

  useEffect(() => {
    fetchAttempts();
  }, [fetchAttempts]);

  return {
    email,
    setEmail,
    attempts,
    sendPhishingEmail,
  };
}