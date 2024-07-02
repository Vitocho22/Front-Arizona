import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser && (currentUser.rol === 'Conductor' || currentUser.rol === 'Administrador' || currentUser.rol === 'user')) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']); // Ruta para usuarios no autorizados
      return false;
    }
  }
}
