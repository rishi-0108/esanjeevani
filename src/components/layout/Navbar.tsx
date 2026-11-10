import { useState } from 'react';
import { Activity, Menu, X, Phone } from 'lucide-react';
import { Page } from '../../types';
import { useAuth } from '../../auth/AuthContext';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authActionError, setAuthActionError] = useState('');
  const { user, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    setAuthActionError('');
    const result = await signOut();
    if (result.error) setAuthActionError(result.error);
    else setMobileOpen(false);
  };

  const links: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Symptom Checker', page: 'checker' },
    ...(user ? [{ label: 'Medical History', page: 'medical-history' as Page }] : []),
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-blue-800 text-lg tracking-tight">E-Sanjeevni</span>
              <span className="text-[10px] text-teal-600 font-medium tracking-wide hidden sm:block">AI Health Pre-Surveillance</span>
            </div>
          </button>

          <div className="hidden xl:flex items-center gap-1">
            {links.map(link => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  currentPage === link.page
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-1.5">
            {loading ? <span className="text-xs text-slate-500">Checking session…</span> : user ? (
              <>
                <span className="max-w-28 truncate text-xs text-slate-600" title={user.email ?? undefined}>{user.email}</span>
                <button onClick={handleSignOut} className="px-2.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => onNavigate('login')} className={`px-2.5 py-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${currentPage === 'login' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'}`}>Login</button>
                <button onClick={() => onNavigate('register')} className={`px-2.5 py-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${currentPage === 'register' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'}`}>Register</button>
              </>
            )}
            <a
              href="tel:108"
              className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-full hover:bg-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              <Phone className="w-3.5 h-3.5" />
              Emergency: 108
            </a>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {authActionError && <div role="alert" className="absolute right-4 top-full mt-2 max-w-sm rounded-xl border border-red-200 bg-white px-4 py-3 text-sm text-red-700 shadow-lg">{authActionError}</div>}

      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-blue-100 px-4 py-3 space-y-1 shadow-lg">
          {links.map(link => (
            <button
              key={link.page}
              onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                currentPage === link.page
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {link.label}
            </button>
          ))}
          {loading ? <p className="px-4 py-2.5 text-sm text-slate-500">Checking session…</p> : user ? (
            <>
              <p className="px-4 py-2.5 text-sm text-slate-500 truncate">Signed in as {user.email}</p>
              <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => { onNavigate('login'); setMobileOpen(false); }} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${currentPage === 'login' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'}`}>Login</button>
              <button onClick={() => { onNavigate('register'); setMobileOpen(false); }} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${currentPage === 'register' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'}`}>Register</button>
            </>
          )}
          <a
            href="tel:108"
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl mt-1 hover:bg-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            <Phone className="w-4 h-4" />
            Emergency: 108
          </a>
        </div>
      )}
    </nav>
  );
}
