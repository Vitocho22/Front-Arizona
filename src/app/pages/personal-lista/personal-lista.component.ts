import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Personal } from 'src/app/models/personal';
import { PersonalService } from 'src/app/services/personal.service';
import { MatDialog } from '@angular/material/dialog';
import { PersonalDetallesComponent } from '../personal-detalles/personal-detalles.component';

@Component({
  selector: 'app-personal-lista',
  templateUrl: './personal-lista.component.html',
  styleUrls: ['./personal-lista.component.scss']
})
export class PersonalListaComponent implements OnInit {
  personal: Personal[] = [];
  filteredPersonal: Personal[] = [];
  paginatedPersonal: Personal[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  itemsFrom: number = 0;
  itemsTo: number = 0;
  totalPages: number = 0;

  constructor(
    private toastr: ToastrService,
    private personalService: PersonalService,
    private router: Router,
    public dialog: MatDialog  // Añadir MatDialog al constructor
  ) { }

  ngOnInit(): void {
    this.obtenerPersonal();
  }

  obtenerPersonal(): void {
    this.personalService.getPersonal().subscribe(
      (data: Personal[]) => {
        this.personal = data;
        this.filteredPersonal = data;  // Inicialmente, todos los registros están visibles
        this.totalItems = this.filteredPersonal.length; // Total de elementos
        this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Calcula el total de páginas
        this.paginatePersonal(); // Inicializar paginación
      },
      error => {
        console.error('Error al obtener el personal:', error);
        this.toastr.error('Hubo un error al obtener el personal', 'Error');
      }
    );
  }

  paginatePersonal(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedPersonal = this.filteredPersonal.slice(startIndex, startIndex + this.pageSize);
    this.itemsFrom = startIndex + 1;
    this.itemsTo = Math.min(startIndex + this.pageSize, this.filteredPersonal.length);
    this.totalPages = Math.ceil(this.filteredPersonal.length / this.pageSize); // Actualiza el total de páginas
  }

  // Método para ir a la página siguiente
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginatePersonal();
    }
  }

  // Método para ir a la página anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatePersonal();
    }
  }

  // Método para editar el personal
  editPersonal(id: number): void {
    this.router.navigate(['/page/registroPersonal', id]);
  }

  // Método para filtrar los resultados según la consulta de búsqueda
  onSearch(): void {
    if (this.searchQuery) {
      this.filteredPersonal = this.personal.filter(persona =>
        persona.nroDNI.includes(this.searchQuery)
      );
    } else {
      this.filteredPersonal = this.personal;
    }
    this.totalItems = this.filteredPersonal.length; // Actualizar el total de elementos después de filtrar
    this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Actualiza el total de páginas después de filtrar
    this.currentPage = 1; // Reiniciar a la primera página después de filtrar
    this.paginatePersonal(); // Aplicar paginación después de filtrar
  }

  detallesPersonal(id: number): void {
    const dialogRef = this.dialog.open(PersonalDetallesComponent, {
      width: '600px', // Ajusta el ancho del diálogo según sea necesario
      data: { id: id } // Pasa el ID del personal al componente de detalles
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
    });
  }

  // Método para eliminar el personal
  deletePersonal(id: number): void {
    this.personalService.deletePersonal(id).subscribe(() => {
      console.log(`Personal con ID ${id} eliminado correctamente.`);
      this.toastr.success('Personal eliminado correctamente', 'Eliminado');
      this.obtenerPersonal(); // Actualiza la lista de personal después de eliminar
    }, error => {
      console.error('Error al eliminar el personal:', error);
      this.toastr.error('Error al eliminar el personal', 'Error');
    });
  }
}
