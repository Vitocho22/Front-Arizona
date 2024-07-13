import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pasajero } from 'src/app/models/pasajero';
import { Personal } from 'src/app/models/personal';
import { Rebuses } from 'src/app/models/rebuses';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { PersonalService } from 'src/app/services/personal.service';
import { RebusesService } from 'src/app/services/rebuses.service';
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
  fechaSalida: string | null = null;
  origenSeleccionado: number | null = null;
  destinoSeleccionado: number | null = null;
  buses: Rebuses[] = [];
  busSeleccionado: Rebuses | null = null;
  personas: Personal[] = [];
  conductorSeleccionado: Personal | null = null;

  constructor(
    private pasajeroService: PasajeroService,
    private rerutaService: RerutaService,
    private rebusesService: RebusesService,
    private personalService: PersonalService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.fechaSalida = this.datePipe.transform(new Date(), 'yyyy-MM-dd' , 'UTC');
    this.obtenerPasajeros();
    this.getRutas();
    this.getBuses();
    this.getPersonal();
  }

  obtenerPasajeros(): void {
    this.pasajeroService.getPasajeros().subscribe(
      pasajeros => {
        const hoy = this.datePipe.transform(new Date(), 'yyyy-MM-dd' , 'UTC');
        this.pasajeros = pasajeros.filter(pasajero =>
          this.datePipe.transform(pasajero.fechaViaje, 'yyyy-MM-dd' , 'UTC') === hoy
        );
        this.pasajero = this.pasajeros.length > 0 ? this.pasajeros[0] : undefined;
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

  getBuses(): void {
    this.rebusesService.getBuses().subscribe({
      next: (buses: Rebuses[]) => {
        this.buses = buses;
      },
      error: (error) => {
        console.error('Error al obtener los buses:', error);
        this.toastr.error('Error al obtener los buses', 'Error');
      }
    });
  }

  onBusSeleccionadoChange(bus: Rebuses): void {
    this.busSeleccionado = bus;
  }

  getPersonal(): void {
    this.personalService.getPersonal().subscribe({
      next: (personas: Personal[]) => {
        this.personas = personas.filter(persona => persona.perfil === 'Usuario');
      },
      error: (error) => {
        console.error('Error al obtener el personal:', error);
        this.toastr.error('Error al obtener el personal', 'Error');
      }
    });
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
