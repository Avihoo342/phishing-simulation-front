import React from 'react';

interface Props {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PhishingForm({ email, onEmailChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="phishing-form">
      <h2>Send Phishing Simulation</h2>
      <input
        placeholder="Target Email"
        value={email}
        onChange={onEmailChange}
        className="phishing-input"
      />
      <button type="submit" className="phishing-button">Send</button>
    </form>
  );
}