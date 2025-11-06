import { Home, FileText, Users, LogOut } from 'lucide-react';

export default function HeaderNav({ currentPage, setCurrentPage, onLogout }) {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'submissions', label: 'Submissions', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-20 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="PKL65" className="h-8 w-8" />
          <div>
            <p className="text-sm text-slate-500 leading-none">PKL 65 Polstat STIS</p>
            <h1 className="text-lg font-semibold text-slate-900">Field Survey Officer (PML)</h1>
          </div>
        </div>
        <nav className="flex items-center gap-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setCurrentPage(key)}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === key
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </header>
  );
}
