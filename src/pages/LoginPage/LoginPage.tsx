import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import managementAPI from '../../api/axiosManagement';

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
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}