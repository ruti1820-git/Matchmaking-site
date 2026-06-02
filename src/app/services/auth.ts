import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from 'firebase/auth';

import { allowedEmails } from '../Auth/allowed-users';
// import { allowedEmails } from '../Auth/allowed-users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = getAuth();

  private emailLinkSettings = {
    url: window.location.origin + '/login',
    handleCodeInApp: true,
  };

  // הרשמה (אם את צריכה)
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // התחברות
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // שליחת קישור התחברות לדואר האלקטרוני

sendSignInLink(email: string) {

  const cleanEmail = email.trim().toLowerCase();

  const normalizedAllowed = allowedEmails.map(
    e => e.trim().toLowerCase()
  );

  console.log('EMAIL:', cleanEmail);
  console.log('ALLOWED:', normalizedAllowed);

  if (!normalizedAllowed.includes(cleanEmail)) {

    alert("המייל הזה לא מורשה להיכנס לאתר 🚫");

    return Promise.reject('Email not allowed');
  }

  return sendSignInLinkToEmail(
    this.auth,
    cleanEmail,
    this.emailLinkSettings
  ).then(() => {
    localStorage.setItem('emailForSignIn', cleanEmail);
  });
}

  isSignInLink(url: string) {
    return isSignInWithEmailLink(this.auth, url);
  }

  completeSignInWithEmailLink(email: string, url: string) {
    return signInWithEmailLink(this.auth, email, url)
      .then((result) => {
        localStorage.removeItem('emailForSignIn');
        return result;
      });
  }

  getStoredEmailForSignInLink() {
    return localStorage.getItem('emailForSignIn') || '';
  }

  // התנתקות
  logout() {
    return signOut(this.auth);
  }
checkUser() {
  onAuthStateChanged(this.auth, (user) => {

    if (!user) return;

    const email = (user.email || '').trim().toLowerCase();

    console.log('EMAIL:', email);
    console.log('ALLOWED:', allowedEmails);

    const normalizedAllowed = allowedEmails.map(e => e.trim().toLowerCase());

    if (!normalizedAllowed.includes(email)) {

      alert("אין לך הרשאה להיכנס לאתר 🚫");

      signOut(this.auth);

      window.location.href = '/login';
    }

  });
}
}