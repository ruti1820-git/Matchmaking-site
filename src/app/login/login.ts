import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
 import { allowedEmails } from '../Auth/allowed-users';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  email = '';
  isLoading = false;

  constructor(
    private auth: SupabaseService,
    private router: Router
  ) {}


sendCode() {

  const cleanEmail = (this.email || '').trim().toLowerCase();

  const normalizedAllowed = allowedEmails
    .map(e => (e || '').trim().toLowerCase());

  console.log('EMAIL:', cleanEmail);
  console.log('ALLOWED:', normalizedAllowed);

  if (!normalizedAllowed.includes(cleanEmail)) {
    alert('🚫 המייל הזה לא מורשה להיכנס לאתר');
    return;
  }

  if (!cleanEmail.includes('@')) {
    alert('מייל לא תקין');
    return;
  }

  this.isLoading = true;

  this.auth.signIn(cleanEmail)
    .then(() => {
      alert('נשלח קישור למייל 📩');
    })
    .catch(err => {
      console.error(err);
      alert('שגיאה בשליחת מייל');
    })
    .finally(() => {
      this.isLoading = false;
    });
}
}