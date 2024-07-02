import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alquiler } from 'src/app/models/alquiler';
import { AlquilerService } from 'src/app/services/alquiler.service';

@Component({
  selector: 'app-bus-registro',
  templateUrl: './bus-registro.component.html',
  styleUrls: ['./bus-registro.component.scss']
})
export class BusRegistroComponent implements OnInit {
  nuevoAlquiler: Alquiler = new Alquiler(null, null, null, '', '', null, '', '', '', '', null);
  editMode: boolean = false;
  alquilerId: number | null = null;

  constructor(
    private toastr: ToastrService,
    private alquilerService: AlquilerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.alquilerId = +params['id'];
        this.alquilerService.getAlquilerById(this.alquilerId).subscribe(
          (alquiler: Alquiler) => {
            this.nuevoAlquiler = alquiler;
          },
          error => {
            console.error('Error al cargar el alquiler:', error);
            this.toastr.error('Hubo un error al cargar el alquiler', 'Error');
          }
        );
      }
    });
  }

  crearAlquiler(): void {
    if (this.editMode && this.alquilerId !== null) {
      this.alquilerService.updateAlquiler(this.alquilerId, this.nuevoAlquiler).subscribe(
        alquilerActualizado => {
          this.toastr.success('El alquiler se ha actualizado exitosamente', 'Éxito');
          this.router.navigate(['/page/listaAlquiler']);
          console.log('Pasajero creado:', alquilerActualizado);
        },
        error => {
          console.error('Error al actualizar el alquiler:', error);
          this.toastr.error('Hubo un error al actualizar el alquiler', 'Error');
        }
      );
    } else {
      this.alquilerService.createAlquiler(this.nuevoAlquiler).subscribe(
        alquilerCreado => {
          this.toastr.success('Se alquiló Correctamente', 'Alquilado');
          this.nuevoAlquiler = new Alquiler(null, null, null, '', '', null, '', '', '', '', null);
          this.router.navigate(['/page/listaAlquiler']);
          console.log('Pasajero creado:', alquilerCreado);
        },
        error => {
          console.error('Error al crear alquiler:', error);
          this.toastr.error('Todos los campos son Obligatorios', 'Error');
        }
      );
    }
  }
}
