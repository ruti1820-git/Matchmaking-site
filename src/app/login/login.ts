import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    if (!this.email.includes('@')) {
      alert('מייל לא תקין');
      return;
    }

    this.isLoading = true;

    this.auth.signIn(this.email)
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