import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rebuses } from 'src/app/models/rebuses';
import { RebusesService } from 'src/app/services/rebuses.service';

@Component({
  selector: 'app-buses-registro',
  templateUrl: './buses-registro.component.html',
  styleUrls: ['./buses-registro.component.scss']
})
export class BusesRegistroComponent {
  nuevoBus: Rebuses = new Rebuses(null, '', '', '', '', '', '');
  editMode: boolean = false;
  busId: number | null = null;

  constructor(
    private toastr: ToastrService,
    private rebusesService: RebusesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.busId = +params['id'];
        this.rebusesService.getBusById(this.busId).subscribe(
          (bus: Rebuses) => {
            this.nuevoBus = bus;
          },
          error => {
            console.error('Error al cargar el bus:', error);
            this.toastr.error('Hubo un error al cargar el bus', 'Error');
          }
        );
      }
    });
  }

  crearBus() {
    if (this.editMode && this.busId !== null) {
      this.rebusesService.updateBus(this.busId, this.nuevoBus).subscribe(
        busActualizado => {
          this.toastr.success('Se actualizó el bus correctamente', 'Actualizado');
          this.router.navigate(['/page/listaBuses']);
        },
        error => {
          console.error('Error al actualizar el bus:', error);
          this.toastr.error('Hubo un error al actualizar el bus', 'Error');
        }
      );
    } else {
      this.rebusesService.createBuses(this.nuevoBus).subscribe(
        busCreado => {
          this.toastr.success('Se registró el bus correctamente', 'Registrado');
          this.router.navigate(['/page/listaBuses']);
        },
        error => {
          console.error('Error al crear el bus:', error);
          this.toastr.error('Hubo un error al registrar el bus', 'Error');
        }
      );
    }
  }
}
