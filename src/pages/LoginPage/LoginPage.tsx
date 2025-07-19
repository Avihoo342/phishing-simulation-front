import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import managementAPI from '../../api/axiosManagement';
import './LoginPage.module.css'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await managementAPI.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.access_token);
    navigate('/simulation');
  };

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