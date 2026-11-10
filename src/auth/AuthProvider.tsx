import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, supabaseConfigError } from '../lib/supabase';
import { AuthContext, type AuthContextValue } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) {
        setSession(nextSession);
        setLoading(false);
      }
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
      if (error) console.error('Unable to restore the Supabase session:', error.message);
    }).catch(error => {
      if (!active) return;
      setLoading(false);
      console.error('Unable to restore the Supabase session:', error);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    user: session?.user ?? null,
    loading,
    configurationError: supabaseConfigError,
    signIn: async (email, password) => {
      if (!supabase) return { error: supabaseConfigError };
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error?.message ?? null };
      } catch {
        return { error: 'Unable to connect to the authentication service. Check your connection and try again.' };
      }
    },
    signUp: async (email, password) => {
      if (!supabase) return { error: supabaseConfigError };
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/login` },
        });
        return {
          error: error?.message ?? null,
          needsEmailConfirmation: !error && !data.session,
        };
      } catch {
        return { error: 'Unable to connect to the authentication service. Check your connection and try again.' };
      }
    },
    signOut: async () => {
      if (!supabase) return { error: supabaseConfigError };
      try {
        const { error } = await supabase.auth.signOut();
        return { error: error?.message ?? null };
      } catch {
        return { error: 'Unable to sign out right now. Please try again.' };
      }
    },
  }), [session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
