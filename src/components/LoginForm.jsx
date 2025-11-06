import { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // For now, just pass the values; backend auth can be wired later.
      if (!email || !password) throw new Error('Please enter email and password');
      onLogin({ email });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 py-10 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <img src="/favicon.svg" alt="PKL 65" className="mx-auto h-12 w-12" />
          <h2 className="mt-4 text-xl font-semibold text-slate-900">PML Login — PKL 65</h2>
          <p className="text-sm text-slate-600">Gig Worker Survey • Connected to ODK Central</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 text-red-700 text-sm px-3 py-2">
              {error}
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 text-white font-medium py-2.5 hover:bg-indigo-700 transition-colors"
          >
            <LogIn size={18} /> {loading ? 'Signing In…' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          STIS Class of 65 • Fieldwork Internship (PKL) • PML Portal
        </p>
      </div>
    </div>
  );
}
