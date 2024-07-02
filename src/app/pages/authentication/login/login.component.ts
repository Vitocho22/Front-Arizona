import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {

  dni: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router) { }

  ngOnInit(): void { }

  login() {
    // Validamos el usuario
    if (this.dni === '' || this.password === '') {
      alert('Todos los campos son obligatorios');
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    // Creamos el body
    const user: User = {
      dni: this.dni,
      password: this.password,
      rol: '' // Inicialmente vacío, se llenará después de la autenticación
    };
    this.loading = true;
    this._userService.login(user).subscribe({
      next: (response) => {
        const { token, rol } = response; // Extraer token y rol de la respuesta
        const userData = {
          dni: this.dni,
          rol: rol
        };
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('rol', rol);
        this.router.navigate(['/page/dashboard']);
        this.toastr.success('Inicio de sesión exitoso', 'Éxito');
        this.loading = false;
      },
      error: (e: HttpErrorResponse) => {
        this.msjError(e);
        this.loading = false;
      }
    });
  }

  msjError(e: HttpErrorResponse) {
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error');
    } else {
      this.toastr.error('Upps ocurrió un error, comuníquese con el administrador', 'Error', {
        positionClass: 'toast-bottom-right'
      });
    }
  }
}
