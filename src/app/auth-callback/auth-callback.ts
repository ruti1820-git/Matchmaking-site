import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `<p>מתחבר...</p>`
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private auth: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {

    const { data, error } =
      await this.auth.supabase.auth.exchangeCodeForSession(window.location.href);

    if (error) {
      console.error(error);
      this.router.navigate(['/login']);
      return;
    }

    if (data.session) {

      localStorage.setItem(
        'loginTime',
        Date.now().toString()
      );

      this.router.navigate(['/boys']);

    } else {
      this.router.navigate(['/login']);
    }
  }
}