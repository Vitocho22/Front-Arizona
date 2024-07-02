import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alquiler } from 'src/app/models/alquiler';
import { AlquilerService } from 'src/app/services/alquiler.service';

@Component({
  selector: 'app-bus-alquiler-detalles',
  templateUrl: './bus-alquiler-detalles.component.html',
  styleUrls: ['./bus-alquiler-detalles.component.scss']
})
export class BusAlquilerDetallesComponent implements OnInit {
  alquiler: Alquiler;

  constructor(
    private toastr: ToastrService,
    private alquilerService: AlquilerService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { alquilerId: number }
  ) { }

  ngOnInit(): void {
    const alquilerId = this.data.alquilerId;
    this.obtenerAlquilerPorId(alquilerId);
  }

  obtenerAlquilerPorId(id: number): void {
    this.alquilerService.getAlquilerById(id).subscribe(
      (data: Alquiler) => {
        this.alquiler = data;
      },
      error => {
        console.error('Error al obtener el alquiler:', error);
        this.toastr.error('Hubo un error al obtener el alquiler', 'Error');
        this.router.navigate(['/page/listaAlquiler']);
      }
    );
  }

  regresarListaAlquiler(): void {
    this.router.navigate(['/page/listaAlquiler']);
  }
}
