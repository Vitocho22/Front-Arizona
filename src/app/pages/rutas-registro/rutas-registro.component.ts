import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ruta } from 'src/app/models/reruta';
import { RerutaService } from 'src/app/services/reruta.service';

@Component({
  selector: 'app-rutas-registro',
  templateUrl: './rutas-registro.component.html',
  styleUrls: ['./rutas-registro.component.scss']
})
export class RutasRegistroComponent implements OnInit {
  rutas: Ruta[] = [];
  nuevaRuta: Ruta = new Ruta(null, '', '');
  editMode: boolean = false;
  rutaId: number | null = null;

  constructor(
    private toastr: ToastrService,
    private _rerutaService: RerutaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerRutas(); // Esto es para obtener las rutas para la lista de rutas

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.rutaId = +params['id'];
        this._rerutaService.getRutaById(this.rutaId).subscribe(
          (ruta: Ruta) => {
            this.nuevaRuta = ruta;
          },
          error => {
            console.error('Error al cargar la ruta:', error);
            this.toastr.error('Hubo un error al cargar la ruta', 'Error');
          }
        );
      }
    });
  }

  obtenerRutas() {
    this._rerutaService.getRuta().subscribe(
      (data: Ruta[]) => {
        this.rutas = data;
      },
      error => {
        console.error('Error al obtener las rutas:', error);
        this.toastr.error('Hubo un error al obtener las rutas', 'Error');
      }
    );
  }

  crearRuta() {
    if (this.editMode && this.rutaId !== null) {
      this._rerutaService.updateRuta(this.rutaId, this.nuevaRuta).subscribe(
        rutaActualizada => {
          this.toastr.success('Se actualizó la ruta correctamente', 'Actualizado');
          this.reloadPage(); // Recargar la página después de actualizar la ruta
        },
        error => {
          console.error('Error al actualizar la ruta:', error);
          this.toastr.error('Hubo un error al actualizar la ruta', 'Error');
        }
      );
    } else {
      this._rerutaService.createRuta(this.nuevaRuta).subscribe(
        rutaCreada => {
          this.toastr.success('Se registró la ruta correctamente', 'Registrado');
          this.reloadPage(); // Recargar la página después de registrar la nueva ruta
        },
        error => {
          console.error('Error al crear la ruta:', error);
          this.toastr.error('Hubo un error al registrar la ruta', 'Error');
        }
      );
    }
  }

  reloadPage() {
    // Recargar la página actual
    location.reload();
  }


  deleteRuta(id: number) {
    this._rerutaService.deleteRuta(id).subscribe(
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
