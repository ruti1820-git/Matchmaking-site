import { Routes } from '@angular/router';
import { Boys } from './boys/boys';
import { Girls } from './girls/girls';
import { Contact } from './contact/contact';


export const routes: Routes = [
  { path: 'boys', component: Boys },
  { path: 'girls', component: Girls },
  { path: 'contact', component: Contact },
  { path: '', redirectTo: '/boys', pathMatch: 'full' } 
];