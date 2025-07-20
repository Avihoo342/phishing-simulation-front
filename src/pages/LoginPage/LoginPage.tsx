import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useLogin();

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch {
      alert('Invalid email or password');
    }
  }, [email, password, login]);

  return (
    <form onSubmit={handleLogin} className="form">
      <h2 className="title">Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="input"
      />
      <button type="submit" className="button">
        Login
      </button>
      <button
        type="button"
        onClick={() => navigate('/register')}
        className="register-button"
      >
        Go to Register
      </button>
    </form>
  );
}