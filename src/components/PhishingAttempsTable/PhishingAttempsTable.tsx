import React, { useMemo } from 'react';

interface Attempt {
  email: string;
  content: string;
  status: string;
}

interface Props {
  attempts: Attempt[];
}

export default function PhishingAttemptsTable({ attempts }: Props) {
  const attemptRows = useMemo(() => {
    return attempts.map((a, idx) => (
      <tr key={idx}>
        <td>{a.email}</td>
        <td>{a.content}</td>
        <td>{a.status}</td>
      </tr>
    ));
  }, [attempts]);

  return (
    <>
      <h3>Phishing Attempts</h3>
      <table className="phishing-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Content</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{attemptRows}</tbody>
      </table>
    </>
  );
}