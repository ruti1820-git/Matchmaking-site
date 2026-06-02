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
    const { data } = await this.auth.getSession();

    if (data.session) {
      this.router.navigate(['/boys']); // או girls
    } else {
      this.router.navigate(['/login']);
    }
  }
}