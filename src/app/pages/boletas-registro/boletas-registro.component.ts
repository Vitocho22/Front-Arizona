import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pasajero } from 'src/app/models/pasajero';
import { Rebuses } from 'src/app/models/rebuses';
import { Ruta } from 'src/app/models/reruta';
import { PasajeroService } from 'src/app/services/pasajero.service';
import { RebusesService } from 'src/app/services/rebuses.service';
import { RerutaService } from 'src/app/services/reruta.service';

@Component({
  selector: 'app-boletas-registro',
  templateUrl: './boletas-registro.component.html',
  styleUrls: ['./boletas-registro.component.scss']
})
export class BoletasRegistroComponent implements OnInit {
  pasajeroId: number;
  rutas: Ruta[];
  nroCar: Rebuses[];
  pasajero: Pasajero = new Pasajero(null, '', '', '', 0, '', null, null, '', 0, 0, 0, null, '');
  pasajeros: Pasajero[] = [];
  carroSeleccionado: number;

  constructor(
    private toastr: ToastrService,
    private pasajeroService: PasajeroService,
    private rerutaService: RerutaService,
    private rebusesService: RebusesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerPasajeros();
    this.cargarRutas();
    this.cargarNroCar();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.pasajeroId = +params['id'];
        this.pasajeroService.getPasajeroById(this.pasajeroId).subscribe(
          (data: Pasajero) => {
            this.pasajero = data;
            this.actualizarEstadoAsiento(parseInt(this.pasajero.asiento), this.pasajero.estado);
          },
          error => {
            console.error('Error al obtener el pasajero:', error);
            this.toastr.error('Hubo un error al obtener el pasajero', 'Error');
          }
        );
      }
    });

    // Llamada para actualizar el estado de todos los asientos al inicio
    this.actualizarTodosLosAsientos();
  }

  cargarRutas() {
    this.rerutaService.getRuta().subscribe(
      rutas => {
        this.rutas = rutas;
      },
      error => {
        console.error('Error al cargar las rutas:', error);
        this.toastr.error('Hubo un error al cargar las rutas', 'Error');
      }
    );
  }

  cargarNroCar() {
    this.rebusesService.getBuses().subscribe(
      bus => {
        this.nroCar = bus;
      },
      error => {
        console.error('Error al cargar las buses:', error);
        this.toastr.error('Hubo un error al cargar las buses', 'Error');
      }
    );
  }

  obtenerPasajeros(): void {
    this.pasajeroService.getPasajeros().subscribe(
      pasajeros => {
        this.pasajeros = pasajeros;
        this.actualizarTodosLosAsientos();
      },
      error => {
        console.error('Error al obtener los pasajeros:', error);
      }
    );
  }

  seleccionarAsiento(asiento: number): void {
    if (this.pasajero.asiento) {
      this.actualizarEstadoAsiento(parseInt(this.pasajero.asiento), '');
    }

    this.pasajero.asiento = asiento.toString();
    this.actualizarEstadoAsiento(asiento, 'Reservado');
  }

  seleccionarCarro(nroCarro: number): void {
    this.carroSeleccionado = nroCarro;
    this.pasajero.nrocar = nroCarro;
    this.mostrarFormularioYPasajerosPorCarro(); // Llamar a la función al seleccionar un carro
  }

  mostrarFormularioYPasajerosPorCarro(): void {
    // Implementa la lógica para mostrar el formulario y los pasajeros por carro seleccionado.
    console.log(`Carro seleccionado: ${this.carroSeleccionado}`);
    // Aquí puedes agregar el código para actualizar la vista, si es necesario.
  }

  guardarPasajero(): void {
    const asiento = parseInt(this.pasajero.asiento);
    if (this.pasajeroId) {
      this.pasajeroService.updatePasajero(this.pasajeroId, this.pasajero).subscribe(
        data => {
          this.toastr.success('El pasajero se ha actualizado exitosamente', 'Éxito');
          this.router.navigate(['/page/listaPasajeros']);
          this.actualizarEstadoAsiento(asiento, this.pasajero.estado);
        },
        error => {
          console.error('Error al actualizar el pasajero:', error);
          this.toastr.error('Hubo un error al actualizar el pasajero', 'Error');
        }
      );
    } else {
      this.pasajeroService.createPasajero(this.pasajero).subscribe(
        data => {
          this.toastr.success('El pasajero se ha creado exitosamente', 'Éxito');
          this.router.navigate(['/page/listaPasajeros']);
          this.actualizarEstadoAsiento(asiento, this.pasajero.estado);
        },
        error => {
          console.error('Error al crear el pasajero:', error);
          this.toastr.error('Hubo un error al crear el pasajero', 'Error');
        }
      );
    }
  }

  actualizarEstadoAsiento(asiento: number, estado: string): void {
    const seatElement = document.querySelector(`.seat[data-seat="${asiento}"]`);
    if (seatElement) {
      seatElement.classList.remove('reserved', 'sold', 'selected');
      if (estado === 'Reservado') {
        seatElement.classList.add('reserved');
      } else if (estado === 'Pagado') {
        seatElement.classList.add('sold');
      } else if (estado === 'selected') {
        seatElement.classList.add('selected');
      }
    }
  }

  actualizarTodosLosAsientos(): void {
    this.pasajeros.forEach(pasajero => {
      this.actualizarEstadoAsiento(parseInt(pasajero.asiento), pasajero.estado);
    });
  }

  eliminarPasajero(pasajeroId: number): void {
    this.pasajeroService.deletePasajero(pasajeroId).subscribe(
      data => {
        this.toastr.success('El pasajero se ha eliminado exitosamente', 'Éxito');
        this.router.navigate(['/page/listaPasajeros']);
        const pasajeroEliminado = this.pasajeros.find(p => p.id === pasajeroId);
        if (pasajeroEliminado) {
          this.actualizarEstadoAsiento(parseInt(pasajeroEliminado.asiento), '');
        }
        this.obtenerPasajeros(); // Refrescar la lista de pasajeros
      },
      error => {
        console.error('Error al eliminar el pasajero:', error);
        this.toastr.error('Hubo un error al eliminar el pasajero', 'Error');
      }
    );
  }
}
