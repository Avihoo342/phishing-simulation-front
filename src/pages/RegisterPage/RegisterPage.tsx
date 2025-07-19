import { useState } from 'react';
import axiosManagement from '../../api/axiosManagement';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosManagement.post('/auth/register', { email, password });
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Register</h2>
      <input
        className="input-field"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        required
      />
      <input
        className="input-field"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="submit-button">Register</button>
    </form>
  );
}