import { useState } from 'react';
import LoginForm from './components/LoginForm';
import HeaderNav from './components/HeaderNav';
import Dashboard from './components/Dashboard';
import Submissions from './components/Submissions';
import Team from './components/Team';

function App() {
  const [session, setSession] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (user) => {
    setSession(user);
  };

  const handleLogout = () => {
    setSession(null);
    setCurrentPage('dashboard');
  };

  if (!session) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <HeaderNav currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'submissions' && <Submissions />}
      {currentPage === 'team' && <Team />}
    </div>
  );
}

export default App;
