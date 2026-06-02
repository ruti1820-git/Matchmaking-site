import { Routes } from '@angular/router';

import { Boys } from './boys/boys';
import { Girls } from './girls/girls';
import { Contact } from './contact/contact';
import { LoginComponent } from './login/login';
import { AuthCallbackComponent } from './auth-callback/auth-callback';
import { authGuard } from './auth.guard';
export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { path: 'auth/callback', component: AuthCallbackComponent },

  { path: 'boys', component: Boys , canActivate: [authGuard]},
  { path: 'girls', component: Girls , canActivate: [authGuard]},
  { path: 'contact', component: Contact   , canActivate: [authGuard]},

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];