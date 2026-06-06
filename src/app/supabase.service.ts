import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ixtdcymkiongcvtqmlkm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_MCwhFCmoDJOGR9fGQMAhMw_4zLWvbM8';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  // 📩 שליחת מייל התחברות (Magic Link)
signIn(email: string) {
  return this.supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin + '/auth/callback'
    }
  });
}
  // 👤 קבלת משתמש
  getUser() {
    return this.supabase.auth.getUser();
  }

  // 📦 קבלת סשן
  getSession() {
    return this.supabase.auth.getSession();
  }

  // 🚪 יציאה
  signOut() {
    return this.supabase.auth.signOut();
  }
}