import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../config/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async (userId) => {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      if (isMounted && data) {
        setUserProfile(data);
      }
    };

    const initializeAuth = async () => {
      const { data: { session: activeSession } } = await supabase.auth.getSession();
      if (isMounted) {
        setSession(activeSession);
        if (activeSession?.user) {
          await fetchProfile(activeSession.user.id);
        } else {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!isMounted) return;
      setSession(nextSession);
      if (nextSession?.user) {
        await fetchProfile(nextSession.user.id);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const updateLocalXP = (amount) => {
    console.log('[AuthContext] updateLocalXP called', { amount, currentXp: userProfile?.xp });
    if (userProfile) {
      setUserProfile(prev => ({ ...prev, xp: (prev?.xp || 0) + amount }));
    }
  };

  const value = useMemo(
    () => ({
      user: session?.user ? { ...session.user, ...userProfile } : null,
      session,
      loading,
      isAuthenticated: Boolean(session?.user),
      updateLocalXP,
      login: () => supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: 'http://localhost:5173/' } }),
      logout: () => supabase.auth.signOut(),
      signOut: () => supabase.auth.signOut(),
    }),
    [session, userProfile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};