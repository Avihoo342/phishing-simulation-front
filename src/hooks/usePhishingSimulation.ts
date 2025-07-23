import { useState, useEffect, useCallback } from 'react';
import managementAPI from '../api/axiosManagement';

export interface Attempt {
  email: string;
  status: string;
}

export function usePhishingSimulation() {
  const [email, setEmail] = useState('');
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  const fetchAttempts = useCallback(async () => {
    const { data } = await managementAPI.get('/attempts');
    setAttempts(data);
  }, []);

  const sendPhishingEmail = useCallback(async () => {
    if (!email) {
      alert('Please enter a target email');
      return;
    }
    await managementAPI.post('/attempts', { email: email });
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