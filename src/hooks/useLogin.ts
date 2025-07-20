import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import managementAPI from '../api/axiosManagement';

export function useLogin() {
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await managementAPI.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      navigate('/simulation');
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  }, [navigate]);

  return { login };
}