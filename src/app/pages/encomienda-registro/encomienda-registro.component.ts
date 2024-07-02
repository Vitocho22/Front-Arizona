import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Encomienda } from 'src/app/models/encomienda';
import { Ruta } from 'src/app/models/reruta';
import { EncomiendaService } from 'src/app/services/encomienda.service';
import { RerutaService } from 'src/app/services/reruta.service';

@Component({
  selector: 'app-encomienda-registro',
  templateUrl: './encomienda-registro.component.html',
  styleUrls: ['./encomienda-registro.component.scss']
})
export class EncomiendaRegistroComponent implements OnInit {
  nuevaEncomienda: Encomienda = new Encomienda(
    null, '', '', '', '', '', null, null, '', null, 0
  );
  rutas: Ruta[];
  editMode: boolean = false;
  encomiendaId: number | null = null;

  constructor(
    private toastr: ToastrService,
    private encomiendaService: EncomiendaService,
    private rerutaService: RerutaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRutas();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.encomiendaId = +params['id'];
        this.encomiendaService.getEncomiendaById(this.encomiendaId).subscribe(
          (encomienda: Encomienda) => {
            this.nuevaEncomienda = encomienda;
          },
          error => {
            console.error('Error al cargar la encomienda:', error);
            this.toastr.error('Hubo un error al cargar la encomienda', 'Error');
          }
        );
      }
    });
  }

  cargarRutas() {
    this.rerutaService.getRuta().subscribe(
      rutas => {
        this.rutas = rutas;
      },
      error => {
        console.error('Error al cargar las rutas:', error);
        this.toastr.error('Hubo un error al cargar las rutas', 'Error');
      }
    );
  }

  crearEncomienda(): void {
    if (this.editMode && this.encomiendaId !== null) {
      this.encomiendaService.updateEncomienda(this.encomiendaId, this.nuevaEncomienda).subscribe(
        encomiendaActualizada => {
          this.toastr.success('La encomienda se ha actualizado exitosamente', 'Éxito');
          this.router.navigate(['/page/listaEncomienda']);
          console.log('Encomienda actualizada:', encomiendaActualizada);
        },
        error => {
          console.error('Error al actualizar la encomienda:', error);
          this.toastr.error('Hubo un error al actualizar la encomienda', 'Error');
        }
      );
    } else {
      this.encomiendaService.createEncomienda(this.nuevaEncomienda).subscribe(
        encomiendaCreada => {
          this.toastr.success('Se registró la encomienda correctamente', 'Registrado');
          this.nuevaEncomienda = new Encomienda(null, '', '', '', '', '', null, null, '', null, 0);
          this.router.navigate(['/page/listaEncomienda']);
          console.log('Encomienda creada:', encomiendaCreada);
        },
        error => {
          console.error('Error al crear encomienda:', error);
          this.toastr.error('Hubo un error al registrar la encomienda', 'Error');
        }
      );
    }
  }
}
