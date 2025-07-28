import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import managementAPI from '../api/axiosManagement';

type ErrorResponse = {
  statusCode: number;
  message: string[] | string;
  error: string;
};

export function useLogin() {
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await managementAPI.post('/auth/login', { email, password });
      if (res.data.access_token) {
        localStorage.setItem('token', res.data.access_token);
        navigate('/simulation');
      } else {
        throw new Error('Login failed - no token returned');
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      const data = axiosError.response?.data as ErrorResponse;
      const message = data?.message ?? 'Unknown error occurred';
      throw Array.isArray(message) ? message.join(', ') : message;
    }
  }, [navigate]);

  return { login };
}