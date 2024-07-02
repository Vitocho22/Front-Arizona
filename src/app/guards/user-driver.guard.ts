import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDriverGuard implements CanActivate {

  constructor(private router: Router, private toastr: ToastrService) { }

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && (user.rol === 'Usuario' || user.rol === 'Conductor' || user.rol === 'Administrador')) {
      return true;
    } else {
      this.toastr.error('No tienes permiso para acceder a esta página', 'Error');
      this.router.navigate(['/']);
      return false;
    }
  }
}
