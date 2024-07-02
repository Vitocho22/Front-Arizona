import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Personal } from 'src/app/models/personal';
import { PersonalService } from 'src/app/services/personal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-personal-detalles',
  templateUrl: './personal-detalles.component.html',
  styleUrls: ['./personal-detalles.component.scss']
})
export class PersonalDetallesComponent implements OnInit {
  personal: Personal[] = [];
  filteredPersonal: Personal[] = [];
  personalId: number;
  searchQuery: string = '';

  constructor(
    private toastr: ToastrService,
    private personalService: PersonalService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<PersonalDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del diálogo
  ) { 
    this.personalId = data.id;
  }

  ngOnInit(): void {
    this.obtenerPersonalPorId(this.personalId);
  }

  obtenerPersonalPorId(id: number): void {
    this.personalService.getPersonalById(id).subscribe(
      (data: Personal) => {
        this.personal = [data];
        this.filteredPersonal = [data];
      },
      error => {
        console.error('Error al obtener el personal:', error);
        this.toastr.error('Hubo un error al obtener el personal', 'Error');
        this.dialogRef.close(); // Cierra el diálogo en caso de error
      }
    );
  }

  regresarListaPersonal(): void {
    this.dialogRef.close();
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.filteredPersonal = this.personal.filter(persona =>
        persona.nroDNI.includes(this.searchQuery)
      );
    } else {
      this.filteredPersonal = this.personal;
    }
  }

  getNroCar(nrocar: number): string {
    return '';
  }

  getNombreRuta(rutaId: number): string {
    return '';
  }
}
