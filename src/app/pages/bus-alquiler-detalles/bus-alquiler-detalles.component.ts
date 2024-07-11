import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alquiler } from 'src/app/models/alquiler';
import { AlquilerService } from 'src/app/services/alquiler.service';

@Component({
  selector: 'app-bus-alquiler-detalles',
  templateUrl: './bus-alquiler-detalles.component.html',
  styleUrls: ['./bus-alquiler-detalles.component.scss']
})
export class BusAlquilerDetallesComponent implements OnInit {
  alquiler: Alquiler;
  alquilerId: number;

  constructor(
    private toastr: ToastrService,
    private alquilerService: AlquilerService,
    public dialogRef: MatDialogRef<BusAlquilerDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.alquilerId = data.id;
  }

  ngOnInit(): void {
    this.obtenerAlquilerPorId(this.alquilerId);
  }

  obtenerAlquilerPorId(id: number): void {
    this.alquilerService.getAlquilerById(id).subscribe(
      (data: Alquiler) => {
        this.alquiler = data;
        console.log('Datos del alquiler:', data); // Añadir este log para verificar los datos
        this.toastr.success('Datos del alquiler obtenidos con éxito', 'Éxito');
      },
      error => {
        console.error('Error al obtener el alquiler:', error);
        this.toastr.error('Hubo un problema al obtener los datos del alquiler', 'Error');
        this.dialogRef.close(); // Cierra el diálogo en caso de error
      }
    );
  }

  regresarListaAlquiler(): void {
    this.dialogRef.close();
  }
}
