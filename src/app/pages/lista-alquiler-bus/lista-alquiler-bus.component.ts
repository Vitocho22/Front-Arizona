import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Alquiler } from 'src/app/models/alquiler';
import { AlquilerService } from 'src/app/services/alquiler.service';
import { BusAlquilerDetallesComponent } from '../bus-alquiler-detalles/bus-alquiler-detalles.component';

@Component({
  selector: 'app-lista-alquiler-bus',
  templateUrl: './lista-alquiler-bus.component.html',
  styleUrls: ['./lista-alquiler-bus.component.scss']
})
export class ListaAlquilerBusComponent implements OnInit {
  alquileres: Alquiler[] = [];
  filteredAlquileres: Alquiler[] = [];
  searchQuery: string = '';

  constructor(
    private toastr: ToastrService,
    private alquilerService: AlquilerService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAlquileres();
  }

  getAlquileres(): void {
    this.alquilerService.getAlquileres().subscribe({
      next: (alquileres: Alquiler[]) => {
        this.alquileres = alquileres;
        this.filteredAlquileres = alquileres;
      },
      error: (error) => {
        console.error('Error al obtener los alquileres:', error);
      }
    });
  }

  deleteAlquiler(id: number): void {
    this.alquilerService.deleteAlquiler(id).subscribe(() => {
      console.log(`Alquiler con ID ${id} eliminado correctamente.`);
      this.getAlquileres();
      this.toastr.error('Se eliminó Correctamente', 'Eliminado');
    }, error => {
      console.error('Error al eliminar el alquiler:', error);
    });
  }

  editAlquiler(id: number): void {
  this.router.navigate(['/page/editar-alquiler', id]);
}

  mostrarDetallesAlquiler(alquiler: Alquiler): void {
    const dialogRef = this.dialog.open(BusAlquilerDetallesComponent, {
      width: '400px',
      data: { alquiler: alquiler }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
    });
  }

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredAlquileres = this.alquileres.filter(alquiler => 
      alquiler.dni.toLowerCase().includes(query)
    );
  }
}
