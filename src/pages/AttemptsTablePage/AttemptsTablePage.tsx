import { useEffect, useState } from 'react';
import managementAPI from '../../api/axiosManagement';

export default function AttemptsTablePage() {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await managementAPI.get('/phishing/attempts');
      setAttempts(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Phishing Attempts</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Content</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((a: any, i) => (
            <tr key={i}>
              <td>{a.email}</td>
              <td>{a.content}</td>
              <td>{a.clicked ? 'Clicked' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}