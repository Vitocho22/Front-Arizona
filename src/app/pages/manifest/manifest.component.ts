import { Component, OnInit } from '@angular/core';
import { Pasajero } from 'src/app/models/pasajero';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { RerutaService } from 'src/app/services/reruta.service';

@Component({
  selector: 'app-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.scss']
})
export class ManifestComponent implements OnInit {
  pasajeros: Pasajero[] = [];
  pasajero: Pasajero | undefined;
  rutas: any = {};
  toastr: any;

  constructor(
    private pasajeroService: PasajeroService,
    private rerutaService: RerutaService,
  ) {}

  ngOnInit(): void {
    this.obtenerPasajeros();
    this.getRutas();
  }

  obtenerPasajeros(): void {
    this.pasajeroService.getPasajeros().subscribe(
      pasajeros => {
        this.pasajeros = pasajeros;
        this.pasajero = pasajeros.length > 0 ? pasajeros[0] : undefined;
      },
      error => {
        console.error('Error al obtener los pasajeros:', error);
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

  printManifest(): void {
    const printContents = document.querySelector('.manifest')?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  }
}
