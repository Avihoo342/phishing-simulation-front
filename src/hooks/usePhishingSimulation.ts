import { useEffect, useCallback, useReducer } from 'react';
import managementAPI from '../api/axiosManagement';
import { AxiosResponse } from 'axios';

export interface Attempt {
  email: string;
  status: string;
}

interface State {
  email: string;
  attempts: Attempt[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Attempt[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

const initialState: State = {
  email: '',
  attempts: [],
  loading: false,
  error: null
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, attempts: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export function usePhishingSimulation() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAttempts = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response: AxiosResponse = await managementAPI.get('/attempts');
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (err: any) {
      dispatch({ type: 'FETCH_ERROR', payload: err?.message || 'Failed to fetch attempts' });
    }
  }, []);

  const sendPhishingEmail = useCallback(async () => {
    if (!state.email) {
      alert('Please enter a target email');
      return;
    }
    try {
      await managementAPI.post('/attempts', { email: state.email });
      await fetchAttempts();
    } catch (err: any) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Failed to send phishing mail' });
    }
  }, [state.email, fetchAttempts]);

  useEffect(() => {
    fetchAttempts();
  }, [fetchAttempts]);

  return {
    email: state.email,
    setEmail: (email: string) => dispatch({ type: 'SET_EMAIL', payload: email }),
    attempts: state.attempts,
    sendPhishingEmail,
    loading: state.loading,
    error: state.error
  };
}
