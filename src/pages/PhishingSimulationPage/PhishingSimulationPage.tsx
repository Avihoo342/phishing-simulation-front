import { useState, useEffect } from 'react';
import simulationAPI from '../../api/axiosSimulation';
import './PhishingSimulationPage.module.css';

interface Attempt {
  recipientEmail: string;
  emailContent: string;
  status: string;
}

export default function PhishingSimulationPage() {
  const [email, setEmail] = useState('');
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  const fetchAttempts = async () => {
    const { data } = await simulationAPI.get('/phishing/attempts');
    setAttempts(data);
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    await simulationAPI.post('/phishing/send', { email });
    setEmail('');
    fetchAttempts();
  };

  return (
    <div className="phishing-container">
      <form onSubmit={handleSend} className="phishing-form">
        <h2>Send Phishing Simulation</h2>
        <input
          placeholder="Target Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="phishing-input"
        />
        <button type="submit" className="phishing-button">Send</button>
      </form>

      <h3>Phishing Attempts</h3>
      <table className="phishing-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Content</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((a, idx) => (
            <tr key={idx}>
              <td>{a.recipientEmail}</td>
              <td>{a.emailContent}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}