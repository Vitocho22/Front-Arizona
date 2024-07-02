import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Personal } from 'src/app/models/personal';

import { PersonalService } from 'src/app/services/personal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-credenciales',
  templateUrl: './credenciales.component.html',
  styleUrls: ['./credenciales.component.scss']
})
export class CredencialesComponent implements OnInit {
  dni: string = '';
  password: string = '';
  rol: string = '';  // Cambiar `perfil` a `rol`
  imagenGenero: string = 'assets/icono/chico.png'; // Imagen por defecto

  constructor(
    private personalService: PersonalService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute  // Añadir ActivatedRoute al constructor
  ) { }

  ngOnInit(): void {
    // Obtener el rol desde los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      this.rol = params['rol'] || '';
    });

    this.obtenerUltimoPersonal();
  }

  obtenerUltimoPersonal(): void {
    this.personalService.getPersonal().subscribe(
      (data: Personal[]) => {
        if (data.length > 0) {
          data.sort((a, b) => b.id - a.id);  // Ordenar por id en orden descendente
          const ultimaPersona = data[0];  // Obtener el último registro

          this.imagenGenero = ultimaPersona.genero === 'Femenino' ? 'assets/icono/chica.png' : 'assets/icono/chico.png';
          if (!this.rol) {
            this.rol = ultimaPersona.perfil;  // Establecer el rol si no se pasó desde la ruta
          }
        } else {
          console.warn('No hay datos de personal disponibles');
        }
      },
      error => {
        console.error('Error al obtener el personal:', error);
        this.toastr.error('Hubo un error al obtener el personal', 'Error');
      }
    );
  }

  crearUsuario(): void {
    if (this.dni === '' || this.password === '' || this.rol === '') {  // Usar `rol` en lugar de `perfil`
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    const user = {
      dni: this.dni,
      password: this.password,
      rol: this.rol  // Enviar rol en lugar de perfil
    };

    this.userService.createUser(user).subscribe({
      next: () => {
        this.toastr.success('Usuario creado exitosamente', 'Éxito');
        this.router.navigate(['/page/dashboard']);
      },
      error: (e) => {
        this.toastr.error('Error al crear el usuario', 'Error');
        console.error(e);
      }
    });
  }
}
