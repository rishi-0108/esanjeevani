import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function RegisterPage() {
  const { signUp, user, loading, configurationError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setSubmitting(true);
    const result = await signUp(email.trim(), password);
    setSubmitting(false);
    setPassword('');
    setConfirmPassword('');
    if (result.error) setError(result.error);
    else if (result.needsEmailConfirmation) setMessage('Account request received. Check your email for a confirmation link before signing in.');
    else setMessage('Your account has been created and you are signed in.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 pt-20 pb-16 flex items-center justify-center">
      <section className="w-full max-w-md mx-4 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 text-center">Create an Account</h1>
        <p className="text-slate-500 text-center mb-7">Registration is optional. Guests can still use the symptom checker.</p>
        {configurationError && <p role="alert" className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 text-sm mb-5">{configurationError}</p>}
        {error && <p role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm mb-5">{error}</p>}
        {message && <p role="status" className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 text-sm mb-5">{message}</p>}
        {user ? (
          <p className="text-center text-slate-600">You are signed in as <strong>{user.email}</strong>.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-semibold text-slate-700">Email address
              <input type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} className="mt-1.5 w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </label>
            <label className="block text-sm font-semibold text-slate-700">Password
              <input type="password" autoComplete="new-password" minLength={6} required value={password} onChange={event => setPassword(event.target.value)} className="mt-1.5 w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </label>
            <label className="block text-sm font-semibold text-slate-700">Confirm password
              <input type="password" autoComplete="new-password" minLength={6} required value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} className="mt-1.5 w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </label>
            <button type="submit" disabled={submitting || loading || Boolean(configurationError)} className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50">
              {submitting ? 'Creating Account…' : 'Register'}
            </button>
          </form>
        )}
        <p className="text-sm text-slate-500 text-center mt-6">Already registered? <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">Sign in</Link></p>
        <p className="text-sm text-center mt-3"><Link to="/" className="text-slate-500 hover:text-blue-700">Return to Home</Link></p>
      </section>
    </div>
  );
}
