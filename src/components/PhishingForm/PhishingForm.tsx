import { useState } from 'react';
import axios from '../../api/axiosSimulation';

export default function PhishingForm({ onSent }: { onSent: () => void }) {
  const [email, setEmail] = useState('');

  const handleSend = async () => {
    await axios.post('/phishing/send', { email });
    setEmail('');
    onSent();
  };

  return (
    <div>
      <h3>Send Phishing Attempt</h3>
      <input placeholder="Target Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}