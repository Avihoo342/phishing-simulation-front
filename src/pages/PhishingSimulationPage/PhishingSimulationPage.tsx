import { useCallback } from 'react';
import { usePhishingSimulation } from '../../hooks/usePhishingSimulation';
import PhishingForm from '../../components/PhishingForm/PhishingForm';
import './PhishingSimulationPage.css';
import PhishingAttemptsTable from '../../components/PhishingAttempsTable/PhishingAttempsTable';

export default function PhishingSimulationPage() {
  const { email, setEmail, attempts, sendPhishingEmail, loading, error } = usePhishingSimulation();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await sendPhishingEmail();
    },
    [sendPhishingEmail]
  );

  return (
    <div className="phishing-container">
      <PhishingForm email={email} onEmailChange={e => setEmail(e.target.value)} onSubmit={handleSubmit} />
      <PhishingAttemptsTable attempts={attempts} loading={loading} error={error} />
    </div>
  );
}