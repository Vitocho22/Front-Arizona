import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Pasajero } from 'src/app/models/pasajero';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { RerutaService } from 'src/app/services/reruta.service';

@Component({
  selector: 'app-pasajeros-detalles',
  templateUrl: './pasajeros-detalles.component.html',
  styleUrls: ['./pasajeros-detalles.component.scss']
})
export class PasajerosDetallesComponent implements OnInit {
  pasajero: Pasajero;
  pasajeroId: number;
  rutas: { [key: number]: string } = {};

  constructor(
    public dialogRef: MatDialogRef<PasajerosDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private toastr: ToastrService,
    private pasajeroService: PasajeroService,
    private rerutaService: RerutaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Si se utiliza como diálogo, se carga el pasajero a través de los datos proporcionados
    if (this.data) {
      this.obtenerPasajeroPorId(this.data.id);
    } else { // Si se utiliza como componente de página, se obtiene el ID del pasajero de los parámetros de la ruta
      this.route.paramMap.subscribe(params => {
        this.pasajeroId = Number(params.get('id'));
        this.obtenerPasajeroPorId(this.pasajeroId);
      });
    }
    this.getRutas();
  }

  obtenerPasajeroPorId(id: number): void {
    this.pasajeroService.getPasajeroById(id).subscribe(
      (data: Pasajero) => {
        this.pasajero = data;
      },
      error => {
        console.error('Error al obtener el pasajero:', error);
        this.toastr.error('Hubo un error al obtener el pasajero', 'Error');
        this.router.navigate(['/page/listaPasajeros']); // Redireccionar a la lista de pasajeros si hay un error
      }
    );
  }

  getRutas(): void {
    this.rerutaService.getRuta().subscribe({
      next: (rutas: any) => {
        this.rutas = rutas.reduce((acc, ruta) => {
          acc[ruta.id] = ruta.ruta;
          return acc;
        }, {});
      },
      error: (error) => {
        console.error('Error al obtener las rutas:', error);
        this.toastr.error('Error al obtener las rutas', 'Error');
      }
    });
  }

  getNombreRuta(id: number): string {
    return this.rutas[id] || '';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
