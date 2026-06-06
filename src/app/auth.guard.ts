import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';

export const authGuard: CanActivateFn = async () => {

const router = inject(Router);
const supabase = inject(SupabaseService);

const { data } = await supabase.getUser();

if (!data.user) {
return router.createUrlTree(['/login']);
}

const loginTime = Number(
localStorage.getItem('loginTime')
);

const oneHour = 60 * 60 * 1000;

if (
!loginTime ||
Date.now() - loginTime > oneHour
) {

await supabase.signOut();

localStorage.removeItem('loginTime');

return router.createUrlTree(['/login']);

}

return true;
};