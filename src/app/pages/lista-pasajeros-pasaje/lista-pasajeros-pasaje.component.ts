import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Pasajero } from 'src/app/models/pasajero';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { RerutaService } from 'src/app/services/reruta.service';
import { RebusesService } from 'src/app/services/rebuses.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { TicketComponent } from '../ticket/ticket.component';
import { PasajerosDetallesComponent } from '../pasajeros-detalles/pasajeros-detalles.component'; // Importa el componente

@Component({
  selector: 'app-lista-pasajeros-pasaje',
  templateUrl: './lista-pasajeros-pasaje.component.html',
  styleUrls: ['./lista-pasajeros-pasaje.component.scss']
})
export class ListaPasajerosPasajeComponent implements OnInit {
  pasajeros: Pasajero[];
  rutas: any = {};
  nroCars: any = {};

  constructor(
    private toastr: ToastrService,
    private pasajeroService: PasajeroService,
    private rerutaService: RerutaService,
    private rebusesService: RebusesService,
    private router: Router,
    public dialog: MatDialog  // Añadir MatDialog al constructor
  ) { }

  ngOnInit(): void {
    this.obtenerPasajeros();
    this.getRutas();
    this.getRebuses();
  }

  obtenerPasajeros(): void {
    this.pasajeroService.getPasajeros().subscribe(
      pasajeros => {
        this.pasajeros = pasajeros;
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
        this.toastr.error('Error al obtener los rebuses', 'Error');
      }
    });
  }

  mostrarTicket(pasajero: Pasajero): void {
    const dialogRef = this.dialog.open(TicketComponent, {
      width: '400px',
      data: { pasajero: pasajero }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  eliminarPasajero(id: number): void {
    this.pasajeroService.deletePasajero(id).subscribe(() => {
      this.pasajeros = this.pasajeros.filter(pasajero => pasajero.id !== id);
      console.log('Pasajero eliminado correctamente');
      this.toastr.error('Se eliminó correctamente', 'Eliminado');
    }, error => {
      console.error('Error al eliminar el pasajero:', error);
    });
  }

  editPasajero(id: number): void {
    this.router.navigate(['/page/registroBoletas', id]);
  }

  getNombreRuta(id: number): string {
    return this.rutas[id] || '';
  }

  getNroCar(id: number): string {
    return this.nroCars[id] || 0;
  }

  exportToExcel(): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Pasajeros');

    worksheet.columns = [
      { header: 'N°', key: 'numero', width: 5 },
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'Apellido', key: 'apellido', width: 30 },
      { header: 'DNI', key: 'dni', width: 15 },
      { header: 'Asiento', key: 'asiento', width: 10 },
      { header: 'Nro de Carro', key: 'nroCar', width: 15 },
      { header: 'Fecha de Emisión', key: 'fechaEmision', width: 20 },
      { header: 'Fecha de Viaje', key: 'fechaViaje', width: 20 },
      { header: 'Hora de Viaje', key: 'horaViaje', width: 15 },
      { header: 'Origen', key: 'origen', width: 30 },
      { header: 'Destino', key: 'destino', width: 30 },
      { header: 'Precio', key: 'precio', width: 10 },
      { header: 'Estado', key: 'estado', width: 10 }
    ];

    this.pasajeros.forEach((pasajero, index) => {
      worksheet.addRow({
        numero: index + 1,
        nombre: pasajero.pasajero,
        apellido: pasajero.Apellido,
        dni: pasajero.dni,
        asiento: pasajero.asiento,
        nroCar: this.getNroCar(pasajero.nrocar),
        fechaEmision: new Date(pasajero.fechaEmision).toLocaleDateString(),
        fechaViaje: new Date(pasajero.fechaViaje).toLocaleDateString(),
        horaViaje: pasajero.horaViaje,
        origen: this.getNombreRuta(pasajero.origen),
        destino: this.getNombreRuta(pasajero.destino),
        precio: pasajero.precio,
        estado: pasajero.estado
      });
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'Pasajeros.xlsx');
    });
  }

  detallesPasajero(id: number): void {
    const dialogRef = this.dialog.open(PasajerosDetallesComponent, {
      width: '600px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
