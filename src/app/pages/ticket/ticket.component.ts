import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { RerutaService } from 'src/app/services/reruta.service';
import { RebusesService } from 'src/app/services/rebuses.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  pasajero: any;
  rutas: any = {};
  nroCars: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rerutaService: RerutaService,
    private rebusesService: RebusesService
  ) {
    this.pasajero = data.pasajero;
  }

  printTicket(): void {
    setTimeout(() => {
      window.print();
    }, 1000); // Agregar un retraso de 1 segundo (1000 milisegundos)
  }

  ngOnInit(): void {
    this.getRutas();
    this.getRebuses();
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
      }
    });
  }

  getRebuses(): void {
    this.rebusesService.getBuses().subscribe({
      next: (rebuses: any) => {
        this.nroCars = rebuses.reduce((acc, bus) => {
          acc[bus.id] = bus.nroCarro;
          return acc;
        }, {});
      },
      error: (error) => {
        console.error('Error al obtener los rebuses:', error);
      }
    });
  }

  getNombreRuta(id: number): string {
    return this.rutas[id] || '';
  }

  getNroCar(id: number): string {
    return this.nroCars[id] || 0;
  }
}
