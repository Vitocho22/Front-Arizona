import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rebuses } from 'src/app/models/rebuses';
import { RebusesService } from 'src/app/services/rebuses.service';

@Component({
  selector: 'app-buses-lista',
  templateUrl: './buses-lista.component.html',
  styleUrls: ['./buses-lista.component.scss']
})
export class BusesListaComponent implements OnInit {
  buses: Rebuses[] = [];
  filteredBuses: Rebuses[] = [];
  searchQuery: string = '';

  constructor(
    private rebusesService: RebusesService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.obtenerBuses();
  }

  obtenerBuses() {
    this.rebusesService.getBuses().subscribe(
      (data: Rebuses[]) => {
        this.buses = data;
        this.filteredBuses = data; // Inicialmente, los buses filtrados son todos los buses
      },
      error => {
        console.error('Error al obtener los buses:', error);
        this.toastr.error('Hubo un error al obtener los buses', 'Error');
      }
    );
  }

  deleteBus(id: number) {
    this.rebusesService.deleteBuses(id).subscribe(
      () => {
        this.toastr.error('Bus eliminado con éxito', 'Eliminado');
        this.obtenerBuses();
      },
      error => {
        console.error('Error al eliminar el bus:', error);
        this.toastr.error('Hubo un error al eliminar el bus', 'Error');
      }
    );
  }

  editBus(id: number) {
    this.router.navigate(['/page/registroBuses', id]);
  }

  onSearch() {
    this.filteredBuses = this.buses.filter(bus => 
      bus.nro_placa.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
