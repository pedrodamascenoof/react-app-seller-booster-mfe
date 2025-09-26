import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type UseAuth = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

let globalUser: User | null = null;

export function useAuth(): UseAuth {
  const [user, setUser] = useState<User | null>(globalUser);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data?.session ?? null);
      setUser(data?.session?.user ?? null);
      globalUser = data?.session?.user ?? null;
      setLoading(false);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession as Session | null);
      setUser(newSession?.user ?? null);
      globalUser = newSession?.user ?? null;
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setSession(data?.session ?? null);
    setUser(data?.user ?? null);
    globalUser = data?.user ?? null;
    setLoading(false);
    return { error };
  }, []);

  const signUp = useCallback(async (email: string, password: string, metadata?: Record<string, any>) => {
    setLoading(true);
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: metadata } });
    // signUp does not always return a session (depends on email confirmation settings)
    setSession(data?.session ?? null);
    setUser(data?.user ?? null);
    globalUser = data?.user ?? null;
    setLoading(false);
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    globalUser = null;
    setLoading(false);
  }, []);

  return { user, session, loading, signIn, signUp, signOut };
}

export default useAuth;
