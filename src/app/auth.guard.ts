import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';


export const authGuard: CanActivateFn = async () => {

  console.log('AUTH GUARD RUNNING');

  const router = inject(Router);
  const supabase = inject(SupabaseService);

  const { data } = await supabase.getUser();

  console.log('USER:', data.user);

  if (data.user) {
    return true;
  }

  return router.createUrlTree(['/login']);
};