import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if(authService.isAuthenticated()){
    return true;
  }
  else{
    router.navigate(["login"]);
    return false
  }
}