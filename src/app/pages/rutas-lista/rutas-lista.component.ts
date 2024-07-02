import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ruta } from 'src/app/models/reruta';
import { RerutaService } from 'src/app/services/reruta.service';

@Component({
  selector: 'app-rutas-lista',
  templateUrl: './rutas-lista.component.html',
  styleUrls: ['./rutas-lista.component.scss']
})
export class RutasListaComponent implements OnInit {
  rutas: Ruta[] = [];

  constructor(
    private rerutaService: RerutaService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerRutas();
  }

  obtenerRutas() {
    this.rerutaService.getRuta().subscribe(
      (data: Ruta[]) => {
        this.rutas = data;
      },
      error => {
        console.error('Error al obtener las rutas:', error);
        this.toastr.error('Hubo un error al obtener las rutas', 'Error');
      }
    );
  }

  deleteRuta(id: number) {
    this.rerutaService.deleteRuta(id).subscribe(
      () => {
        this.toastr.error('Ruta eliminada con éxito', 'Eliminado');
        this.obtenerRutas();
      },
      error => {
        console.error('Error al eliminar la ruta:', error);
        this.toastr.error('Hubo un error al eliminar la ruta', 'Error');
      }
    );
  }

  editRuta(id: number) {
    this.router.navigate(['/page/registroRutas', id]);
  }
}
