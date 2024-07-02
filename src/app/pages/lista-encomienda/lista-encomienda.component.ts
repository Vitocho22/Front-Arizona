import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Encomienda } from 'src/app/models/encomienda';
import { EncomiendaService } from 'src/app/services/encomienda.service';
import { RerutaService } from 'src/app/services/reruta.service';
import { EncomiendaDetallesComponent } from '../encomienda-detalles/encomienda-detalles.component';

@Component({
  selector: 'app-lista-encomienda',
  templateUrl: './lista-encomienda.component.html',
  styleUrls: ['./lista-encomienda.component.scss']
})
export class ListaEncomiendaComponent implements OnInit {
  encomiendas: Encomienda[] = [];
  filteredEncomiendas: Encomienda[] = [];
  rutas: any = {};
  searchQuery: string = '';

  constructor(
    private toastr: ToastrService,
    private encomiendaService: EncomiendaService,
    private rerutaService: RerutaService,
    private router: Router,
    public dialog: MatDialog // Añadir MatDialog al constructor
  ) { }

  ngOnInit(): void {
    this.getEncomiendas();
    this.getRutas();
  }

  getEncomiendas(): void {
    this.encomiendaService.getEncomiendas().subscribe({
      next: (encomiendas: Encomienda[]) => {
        this.encomiendas = encomiendas;
        this.filteredEncomiendas = encomiendas;
      },
      error: (error) => {
        console.error('Error al obtener las encomiendas:', error);
        this.toastr.error('Error al obtener las encomiendas', 'Error');
      }
    });
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

  deleteEncomienda(id: number): void {
    this.encomiendaService.deleteEncomienda(id).subscribe(() => {
      console.log(`Encomienda con ID ${id} eliminada correctamente.`);
      this.toastr.error('Encomienda eliminada correctamente', 'Eliminado');
      this.getEncomiendas();
    }, error => {
      console.error('Error al eliminar la encomienda:', error);
      this.toastr.error('Error al eliminar la encomienda', 'Error');
    });
  }

  editEncomienda(id: number): void {
    this.router.navigate(['/page/registroEncomienda', id]);
  }

  detallesEncomienda(id: number): void {
    const dialogRef = this.dialog.open(EncomiendaDetallesComponent, {
      width: '400px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getNombreRuta(id: number): string {
    return this.rutas[id] || '';
  }

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredEncomiendas = this.encomiendas.filter(encomienda => 
      encomienda.dni_remi.toLowerCase().includes(query) ||
      encomienda.dni_dest.toLowerCase().includes(query)
    );
  }
}
