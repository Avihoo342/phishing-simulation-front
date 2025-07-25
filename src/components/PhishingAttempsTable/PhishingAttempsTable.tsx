import React, { useMemo } from 'react';

interface Attempt {
  email: string;
  status: string;
}

interface Props {
  attempts: Attempt[];
  loading: boolean;
  error : string | null;
}

export default function PhishingAttemptsTable({ attempts, loading, error }: Props) {
  const attemptRows = useMemo(() => {
    return attempts.map((a, idx) => (
      <tr key={idx}>
        <td>{a.email}</td>
        <td>{a.status}</td>
      </tr>
    ));
  }, [attempts]);

  if (error) {
    return <div>Error with fetching data: {error}</div>;
  }
  return !loading ? (
    <>
      <h3>Phishing Attempts</h3>
      <table className="phishing-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{attemptRows}</tbody>
      </table>
    </>
  ) : <div>Loading data...</div>;
}