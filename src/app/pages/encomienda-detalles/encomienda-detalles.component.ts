import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Encomienda } from 'src/app/models/encomienda';
import { EncomiendaService } from 'src/app/services/encomienda.service';
import { RerutaService } from 'src/app/services/reruta.service';

@Component({
  selector: 'app-encomienda-detalles',
  templateUrl: './encomienda-detalles.component.html',
  styleUrls: ['./encomienda-detalles.component.scss']
})
export class EncomiendaDetallesComponent implements OnInit {
  encomienda: Encomienda;
  rutas: { [key: number]: string } = {};

  constructor(
    private toastr: ToastrService,
    private encomiendaService: EncomiendaService,
    private rerutaService: RerutaService,
    public dialogRef: MatDialogRef<EncomiendaDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getEncomienda(this.data.id);
    this.getRutas();
  }

  getEncomienda(id: number): void {
    this.encomiendaService.getEncomiendaById(id).subscribe({
      next: (encomienda: Encomienda) => {
        this.encomienda = encomienda;
      },
      error: (error) => {
        console.error('Error al obtener la encomienda:', error);
        this.toastr.error('Error al obtener la encomienda', 'Error');
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

  getNombreRuta(id: number): string {
    return this.rutas[id] || '';
  }

  regresarEncomienda(): void {
    this.dialogRef.close();
  }
}
